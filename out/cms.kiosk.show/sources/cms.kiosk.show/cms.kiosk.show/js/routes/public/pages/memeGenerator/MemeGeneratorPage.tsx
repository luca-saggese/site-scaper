import arrayMutators from 'final-form-arrays';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useHistory } from 'react-router-dom';

import { ActionBlocker } from '@Components/ActionBlocker/ActionBlocker';
import AutosaveBadge from '@Components/AutosaveBadge';
import Button, { ButtonColor, ButtonStyle, ButtonType } from '@Components/Button';
import Icon, { IconStyle, IconType } from '@Components/Icon';
import Image from '@Components/Image';
import MainPageLayout from '@Components/Layout/MainPageLayout';
import FormNavigationBar from '@Components/Layout/NavigationBar/FormNavigationBar';
import { useModal } from '@Components/Modal';
import NotificationModalBody from '@Components/Modal/NotificationModalBody';
import { toastError, toastUndo } from '@Components/Toastify';
import Typography, { TextType } from '@Components/Typography';
import { CANVAS_TEMPLATE_ID } from '@Config/constants';
import { RouteConfigMeme } from '@Config/routes';
import {
  OpenShowDetailsFragment,
  OpenShowHtmlDocument,
  OpenShowHtmlQuery,
  OpenShowHtmlQueryVariables,
  useCreateOpenShowSlideMutation,
  useDeleteOpenShowSlideMutation,
  useDuplicateOpenShowSlideMutation,
  useOpenShowDetailsQuery,
  useOrderOpenShowSlidesMutation,
  useUpdateOpenShowSlideMutation,
} from '@Graphql/graphqlTypes.generated';
import useLatest from '@Hooks/useLatest';
import usePrevious from '@Hooks/usePrevious';
import { useRouteParams } from '@Hooks/useRouteParams';
import { ReactComponent as EyeImage } from '@Images/eye.svg';
import CanvasEditor from '@Routes/show/pages/editor/CanvasEditor';
import SlideList from '@Routes/show/pages/editor/SlideList';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { globalEvents } from '@Utils/globalEvents';
import { mutationErrorHandler } from '@Utils/graphql';
import graphqlClient from '@Utils/graphqlClient';
import { formatTime, gqlIdToUuid, noop, parseTime } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';
import { getCmsToken } from '@Utils/publicToken';
import { show2Gif, show2Mp4 } from '@Utils/share-media';

import MemeLogo from './MemeGeneratorLogo.png';
import styles from './MemeGeneratorPage.module.scss';

async function getShowHtml(id: string) {
  const result = await graphqlClient.query<OpenShowHtmlQuery, OpenShowHtmlQueryVariables>({
    query: OpenShowHtmlDocument,
    variables: { id },
    fetchPolicy: 'network-only',
  });

  return result.data;
}

interface SlideFormModel {
  id: string;
  duration: string;
  data: Record<string, any>;
  templateId: string;
  templateName: string;
  templateSchema: string;
  templateHtml: string;
}

interface FormModel {
  slides: SlideFormModel[];
}

interface MemeGeneratorPageFormInterface {
  show: OpenShowDetailsFragment;
  formProps: FormRenderProps<FormModel>;
}

const MemeGeneratorPageForm: React.FunctionComponent<MemeGeneratorPageFormInterface> = ({ show, formProps }) => {
  const t = useTranslation();
  const history = useHistory();
  const { showModal, closeModal } = useModal();

  const [activeSlideId, setActiveSlideId] = useState(show.slides.length ? show.slides[0].id : undefined);

  const cmsToken = getCmsToken();

  const context = useMemo(() => {
    return {
      headers: {
        cmstoken: cmsToken,
      },
    };
  }, [cmsToken]);

  const [orderOpenShowSlidesMutation, orderOpenShowSlidesMutationResult] = useOrderOpenShowSlidesMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
    context,
  });

  const [createOpenShowSlideMutation, createOpenShowSlideMutationResult] = useCreateOpenShowSlideMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
    context,
  });

  const [updateOpenShowSlideMutation, updateOpenShowSlideMutationResult] = useUpdateOpenShowSlideMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
    context,
  });

  const [deleteOpenShowSlideMutation, deleteOpenShowSlideMutationResult] = useDeleteOpenShowSlideMutation({
    onError: mutationErrorHandler('msg_error_title_delete_show'),
    context,
  });

  const [duplicateOpenShowSlideMutation, duplicateOpenShowSlideMutationResult] = useDuplicateOpenShowSlideMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
    context,
  });

  const handleDuplicateSlideOptionClick = async (slide: SlideFormModel, formProps: FormRenderProps<FormModel>) => {
    if (activeSlide?.templateId === CANVAS_TEMPLATE_ID) {
      await updateSlide(activeSlide);
    }

    analytics.track('show_slides_duplicate', {
      show_id: gqlIdToUuid(show.id),
      slide_id: gqlIdToUuid(slide.id),
      event_location: 'meme_generator',
    });

    const response = await duplicateOpenShowSlideMutation({
      variables: { input: { slideId: slide.id } },
      context,
    });

    const newSlide = response.data?.duplicateOpenShowSlide.openShowSlide;
    assertIsDefined(newSlide);

    const index = formProps.values.slides.findIndex((item) => item.id === slide.id);

    formProps.form.mutators.insert('slides', index + 1, {
      id: newSlide.id,
      templateId: newSlide.templateId,
      templateName: newSlide.templateName,
      templateSchema: newSlide.templateSchema,
      templateHtml: newSlide.templateHtml,
      duration: formatTime(newSlide.duration),
      data: newSlide.data ? JSON.parse(newSlide.data) : {},
    } as SlideFormModel);
    setActiveSlideId(newSlide.id);
    //Trigger validation
    formProps.form.submit();
  };

  const handleDeleteSlideOptionClick = async (slide: SlideFormModel, formProps: FormRenderProps<FormModel>) => {
    analytics.track('show_slides_delete', {
      show_id: gqlIdToUuid(show.id),
      slide_id: gqlIdToUuid(slide.id),
      event_location: 'meme_generator',
    });
    await deleteOpenShowSlideMutation({ variables: { input: { id: slide.id } } });
    const index = formProps.values.slides.findIndex((item) => item.id === slide.id);
    formProps.form.mutators.remove('slides', index);

    toastUndo({
      text: 'msg_label_edit_show_page_slide_deleted_text',
      onUndoClick: async () => {
        const response = await createOpenShowSlideMutation({
          variables: {
            input: { show: show.id, templateId: slide.templateId, sortOrder: formProps.values.slides.length },
          },
          context,
        });

        const newSlide = response.data?.createOpenShowSlide.openShowSlide;
        assertIsDefined(newSlide);

        formProps.form.mutators.insert('slides', index, {
          ...slide,
          id: newSlide.id,
        } as SlideFormModel);
        setActiveSlideId(newSlide.id);
        //Trigger validation
        formProps.form.submit();
      },
    });

    if (slide.id !== activeSlideId) {
      return;
    }

    const slideBefore: SlideFormModel | undefined = formProps.values.slides[index - 1];
    const slideAfter: SlideFormModel | undefined = formProps.values.slides[index + 1];

    setActiveSlideId(slideAfter?.id || slideBefore?.id);
  };

  const onAddSlideClick = async (formProps: FormRenderProps<FormModel>) => {
    if (activeSlide?.templateId === CANVAS_TEMPLATE_ID) {
      await updateSlide(activeSlide);
    }

    const response = await createOpenShowSlideMutation({
      variables: {
        input: { show: show.id, templateId: CANVAS_TEMPLATE_ID, sortOrder: formProps.values.slides.length },
      },
      context,
    });

    const newSlide = response.data?.createOpenShowSlide.openShowSlide;
    assertIsDefined(newSlide);

    analytics.track('show_slides_create', {
      show_id: gqlIdToUuid(show.id),
      slide_id: gqlIdToUuid(newSlide.id),
      template_id: CANVAS_TEMPLATE_ID,
      event_location: 'meme_generator',
    });

    formProps.form.mutators.push('slides', {
      id: newSlide.id,
      templateId: newSlide.templateId,
      templateName: newSlide.templateName,
      templateSchema: newSlide.templateSchema,
      templateHtml: newSlide.templateHtml,
      duration: formatTime(newSlide.duration),
      data: newSlide.data ? JSON.parse(newSlide.data) : {},
    } as SlideFormModel);
    setActiveSlideId(newSlide.id);
    //Trigger validation
    formProps.form.submit();
  };

  const updateSlide = useCallback(
    (slide: SlideFormModel) => {
      updateOpenShowSlideMutation({
        variables: {
          input: {
            id: slide.id,
            duration: parseTime(slide.duration),
            data: JSON.stringify(slide.data || {}),
          },
        },
        context,
      });
    },
    [updateOpenShowSlideMutation, context]
  );

  const updateSlidesOrder = useCallback(
    (slides: string[]) => {
      if (!slides.length) {
        return;
      }

      orderOpenShowSlidesMutation({
        variables: {
          input: { openShowId: show.id, slides },
        },
        context,
      });
    },
    [orderOpenShowSlidesMutation, show.id, context]
  );

  const downloadGif = async () => {
    showModal({
      component: NotificationModalBody,
      props: {
        text: t('msg_download_show_as_gif_loading'),
      },
      closeable: false,
    });

    try {
      const showData = await getShowHtml(show.id);
      await show2Gif(showData);
    } catch (error) {
      toastError('msg_download_show_as_gif_error_title', 'msg_download_show_as_gif_error_text');
    } finally {
      closeModal();
    }
  };

  const downloadMp4 = async () => {
    showModal({
      component: NotificationModalBody,
      props: {
        text: t('msg_download_show_as_video_loading'),
      },
      closeable: false,
    });

    try {
      const showData = await getShowHtml(show.id);
      await show2Mp4(showData);
    } catch (error) {
      toastError('msg_download_show_as_video_error_title', 'msg_download_show_as_video_error_text');
    } finally {
      closeModal();
    }
  };

  const onForkShowClick = () => {
    history.push(RouteConfigMeme.MemeGeneratorFork.buildLink({ openShowId: show.id }));
  };

  const isSaving = [
    orderOpenShowSlidesMutationResult,
    createOpenShowSlideMutationResult,
    updateOpenShowSlideMutationResult,
    deleteOpenShowSlideMutationResult,
    duplicateOpenShowSlideMutationResult,
  ].some((result) => result.loading);

  const { handleSubmit, values, form } = formProps;

  const activeSlideIndex = values.slides.findIndex((slide) => slide.id === activeSlideId);
  const activeSlide = values.slides.find((slide) => slide.id === activeSlideId);

  const slidesOrders = values.slides.map((slide) => slide.id);
  const previousSlidesOrder = usePrevious(slidesOrders);

  // Ref used to avoid useEffect retriggering
  const activeSlideRef = useLatest(activeSlide);

  const [animateForkButton, setAnimateForkButton] = useState(false);

  useEffect(() => {
    const listener = () => {
      setAnimateForkButton(true);
      setTimeout(() => {
        setAnimateForkButton(false);
      }, 3000);
    };
    globalEvents.addListener('actionBlocked', listener);
    return () => {
      globalEvents.removeListener('actionBlocked', listener);
    };
  }, []);

  // Autosave canvas when navigating to other route
  useEffect(
    () => () => {
      if (activeSlideRef.current?.templateId === CANVAS_TEMPLATE_ID && show.isEditable) {
        updateSlide(activeSlideRef.current);
      }
    },
    [activeSlideRef, updateSlide, show.isEditable]
  );

  useEffect(() => {
    if (show.isEditable && previousSlidesOrder && String(slidesOrders) !== String(previousSlidesOrder)) {
      updateSlidesOrder(slidesOrders);
    }
  }, [previousSlidesOrder, show.isEditable, slidesOrders, updateSlidesOrder]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <MainPageLayout
        gridClassName={styles.grid}
        NavigationBarComponent={
          <FormNavigationBar
            onLogoClick={() => {
              window.location.assign('https://www.kiosk.show/');
            }}
          >
            <div className={styles.navigationFields}>
              <div className={styles.leftNavigationSection}>
                <div>
                  <AutosaveBadge isSaving={isSaving} />
                </div>
              </div>
              <div className={styles.logoContainer}>
                <Image src={MemeLogo} className={styles.logo} />
              </div>
              <div className={styles.rightNavigationSection}>
                {!show.isEditable && (
                  <Button
                    className={animateForkButton ? styles.scaleAnimation : ''}
                    buttonType={ButtonType.Button}
                    buttonStyle={ButtonStyle.Text}
                    buttonColor={ButtonColor.White}
                    onClick={onForkShowClick}
                  >
                    <Icon className={styles.downloadIcon} icon={IconType.Fork} iconStyle={IconStyle.None} />
                    {t('msg_meme_generator_fork_button')}
                  </Button>
                )}
                <Button
                  buttonType={ButtonType.Button}
                  buttonStyle={ButtonStyle.Text}
                  buttonColor={ButtonColor.White}
                  onClick={downloadGif}
                >
                  <Icon icon={IconType.ArrowBottom} className={styles.downloadIcon} iconStyle={IconStyle.None} />
                  <span>{t('msg_meme_generator_download_gif')}</span>
                </Button>
                <Button
                  buttonType={ButtonType.Button}
                  buttonStyle={ButtonStyle.Text}
                  buttonColor={ButtonColor.White}
                  onClick={downloadMp4}
                >
                  <Icon icon={IconType.ArrowBottom} className={styles.downloadIcon} iconStyle={IconStyle.None} />
                  <span>{t('msg_meme_generator_download_video')}</span>
                </Button>
              </div>
            </div>
          </FormNavigationBar>
        }
      >
        <div className={styles.leftSideContainer}>
          <FieldArray name="slides">
            {(props) => (
              <SlideList
                {...props}
                showId={show.id}
                activeSlideId={activeSlideId}
                slideEditVisible={false}
                isEditable={show.isEditable}
                onSlideClick={(slide: SlideFormModel) => {
                  if (activeSlideId !== slide.id) {
                    if (activeSlide && show.isEditable) {
                      updateSlide(activeSlide);
                    }
                    setActiveSlideId(slide.id);
                  }
                }}
                onSlideThumbnailClick={noop}
                onDuplicateSlideOptionClick={(slide) => {
                  handleDuplicateSlideOptionClick(slide, formProps);
                }}
                onDeleteSlideOptionClick={(slide) => {
                  handleDeleteSlideOptionClick(slide, formProps);
                }}
                onSlideInfoChange={(index) => {
                  updateSlide(formProps.form.getState().values.slides[index]);
                }}
              />
            )}
          </FieldArray>
          <div className={styles.addSlideContainer}>
            {!show.isEditable && <ActionBlocker message={t('msg_meme_generator_action_blocker')} />}

            <button className={styles.addSlide} onClick={() => onAddSlideClick(formProps)}>
              <Typography styleType={TextType.UpperCaseLink}>{t('msg_label_add_show_slide')}</Typography>
            </button>
          </div>
        </div>
        <div className={styles.rightSideContainer}>
          {!show.isEditable && <ActionBlocker />}

          {activeSlide ? (
            <CanvasEditor
              isEditable={show.isEditable}
              key={activeSlideId}
              slide={activeSlide}
              isPublic
              onChange={(data) => {
                form.change<any>(`slides[${activeSlideIndex}].data`, data);
              }}
              onSave={() => {
                updateSlide(activeSlide);
              }}
              footerPresent={false}
            />
          ) : (
            <button type="button" className={styles.noSlideButton} onClick={() => onAddSlideClick(formProps)}>
              <EyeImage className={styles.eyeIcon} />
              <Typography WrapperElement="div">{t('msg_label_show_get_started')}</Typography>
            </button>
          )}
        </div>
      </MainPageLayout>
    </form>
  );
};

interface MemeGeneratorPageInterface {
  show: OpenShowDetailsFragment;
}

const MemeGeneratorPage: React.FunctionComponent<MemeGeneratorPageInterface> = ({ show }) => {
  const initialValues = useMemo(
    () => ({
      name: show.name,
      slides: show.slides.map((slide) => ({
        id: slide.id,
        templateId: slide.templateId,
        templateName: slide.templateName,
        templateSchema: slide.templateSchema,
        templateHtml: slide.templateHtml,
        duration: formatTime(slide.duration),
        data: slide.data ? JSON.parse(slide.data) : {},
      })),
    }),
    [show]
  );

  return (
    <Form<FormModel>
      mutators={{
        ...arrayMutators,
      }}
      onSubmit={noop}
      keepDirtyOnReinitialize
      initialValues={initialValues}
    >
      {(formProps) => <MemeGeneratorPageForm show={show} formProps={formProps} />}
    </Form>
  );
};

export const MemeGeneratorEditPageContainer = () => {
  const { openShowId: id } = useRouteParams(RouteConfigMeme.MemeGeneratorEdit);

  const cmsToken = getCmsToken();

  const { data, loading, error } = useOpenShowDetailsQuery({
    variables: {
      id,
    },
    fetchPolicy: 'network-only',
    context: {
      headers: {
        cmstoken: cmsToken,
      },
    },
  });

  if (loading) {
    return null;
  }

  if (error || !data?.openShow) {
    toastError('msg_error_title_loading_show', 'msg_error_loading_show');
    return null;
  }

  return <MemeGeneratorPage show={data.openShow} />;
};
