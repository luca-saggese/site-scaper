import classNames from 'classnames';
import * as DateFns from 'date-fns';
import equal from 'fast-deep-equal';
import arrayMutators from 'final-form-arrays';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { BooleanParam, StringParam, useQueryParam, withDefault } from 'use-query-params';

import AutosaveBadge from '@Components/AutosaveBadge';
import Badge from '@Components/Badge';
import Button, { ButtonColor, ButtonStyle, ButtonType } from '@Components/Button';
import DropDown from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import AutosizeTextInput from '@Components/Form/AutosizeTextInput';
import FormField from '@Components/Form/FormField';
import Icon, { IconStyle, IconType } from '@Components/Icon';
import MainPageLayout from '@Components/Layout/MainPageLayout';
import NavigationBarClose from '@Components/Layout/NavigationBar/components/NavigationBarClose';
import FormNavigationBar from '@Components/Layout/NavigationBar/FormNavigationBar';
import { useModal } from '@Components/Modal';
import ConfirmationModalBody from '@Components/Modal/ConfirmationModalBody';
import ShareShowModalBody from '@Components/Modal/ShareShowModalBody';
import { toastError, toastUndo } from '@Components/Toastify';
import Typography, { TextColor, TextType } from '@Components/Typography';
import { CANVAS_TEMPLATE_ID, TITLE_MAX_LENGTH } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import {
  ShowDetailsFragment,
  SlideTemplateFragment,
  useCreateShowSlideMutation,
  useDeleteShowMutation,
  useDeleteShowSlideMutation,
  useDuplicateShowMutation,
  useDuplicateShowSlideMutation,
  useOrderShowSlidesMutation,
  useShowDetailsQuery,
  useUpdateShowMutation,
  useUpdateShowSlideMutation,
} from '@Graphql/graphqlTypes.generated';
import useLatest from '@Hooks/useLatest';
import usePrevious from '@Hooks/usePrevious';
import { useRouteParams } from '@Hooks/useRouteParams';
import { ReactComponent as EyeImage } from '@Images/eye.svg';
import ShowEditPreview from '@Routes/show/pages/editor/ShowEditPreview';
import ShowHistoryPanel from '@Routes/show/pages/editor/ShowHistoryPanel';
import ShowPreviewView from '@Routes/show/pages/editor/ShowPreviewView';
import SlideList from '@Routes/show/pages/editor/SlideList';
import SlideTemplateSelectionPanel from '@Routes/show/pages/editor/SlideTemplateSelectionPanel';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { limitLength } from '@Utils/form';
import { mutationErrorHandler } from '@Utils/graphql';
import { formatTime, gqlIdToUuid, noop, parseTime } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import AddToDropdown from './AddToDropdown';
import CanvasEditor from './CanvasEditor';
import styles from './ShowEditorPage.module.scss';

export interface SlideFormModel {
  id: string;
  duration: string;
  data: Record<string, any>;
  templateId: string;
  templateName: string;
  templateSchema: string;
  templateHtml: string;
}

export interface FormModel {
  name: string;
  slides: SlideFormModel[];
}

enum View {
  Main = 'MAIN',
  Preview = 'PREVIEW',
}

interface ShowEditorPageFormInterface {
  formProps: FormRenderProps<FormModel>;
  show: ShowDetailsFragment;
  redirectLink: string;
}

const ShowEditorPageForm: React.FunctionComponent<ShowEditorPageFormInterface> = ({
  show,
  redirectLink,
  formProps,
}) => {
  const t = useTranslation();
  const history = useHistory();
  const { showModal } = useModal();

  const [activeSlideId, setActiveSlideId] = useState(show.slides.length ? show.slides[0].id : undefined);
  const [slideEditVisible, setSlideEditVisible] = useState(false);
  const [historyShown, setHistoryShown] = useState(false);
  const [templateSelectionShown, setTemplateSelectionShown] = useState(false);

  const [showCreated] = useQueryParam('showCreated', withDefault(BooleanParam, false));
  const [viewQueryString, setViewQueryString] = useQueryParam('view', withDefault(StringParam, View.Main));

  const [updateShowMutation, updateShowMutationResult] = useUpdateShowMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
  });

  const [deleteShowMutation] = useDeleteShowMutation({
    onCompleted: () => {
      analytics.track('show_delete', {
        show_id: gqlIdToUuid(show.id),
        event_location: 'show_editor',
      });
      history.replace(redirectLink);
    },
    onError: mutationErrorHandler('msg_error_title_delete_show'),
  });

  const [duplicateShowMutation, duplicateShowMutationResult] = useDuplicateShowMutation({
    onCompleted: (response) => {
      const id = response.duplicateShow.show?.id;
      assertIsDefined(id);
      analytics.track('show_duplicate', {
        show_id: gqlIdToUuid(show.id),
        event_location: 'show_editor',
      });
      history.push(RouteConfig.ShowEditor.buildLink({ id }));
    },
  });

  const [orderShowSlidesMutation, orderShowSlidesMutationResult] = useOrderShowSlidesMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
  });

  const [createShowSlideMutation, createShowSlideMutationResult] = useCreateShowSlideMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
  });

  const [updateShowSlideMutation, updateShowSlideMutationResult] = useUpdateShowSlideMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
  });

  const [deleteShowSlideMutation, deleteShowSlideMutationResult] = useDeleteShowSlideMutation({
    onError: mutationErrorHandler('msg_error_title_delete_show'),
  });

  const [duplicateShowSlideMutation, duplicateShowSlideMutationResult] = useDuplicateShowSlideMutation({
    onError: mutationErrorHandler('msg_error_title_update_show'),
  });

  const duplicateShow = () => {
    duplicateShowMutation({ variables: { input: { showId: show.id } } });
  };

  const handleDeleteShowOptionClick = async (formProps: FormRenderProps<FormModel>) => {
    const { action } = await showModal({
      component: ConfirmationModalBody,
      props: {
        confirmButton: {
          color: ButtonColor.Red,
          label: t('msg_common_delete'),
        },
        cancelButton: {
          color: ButtonColor.Black,
          label: t('msg_common_cancel'),
        },
        content: (
          <Typography>
            {t('msg_label_edit_show_page_delete_show_modal_text', { name: formProps.values.name })}
          </Typography>
        ),
      },
    });

    if (action === 'CONFIRM') {
      deleteShowMutation({ variables: { input: { id: show.id } } });
    }
  };

  const handleDuplicateSlideOptionClick = async (slide: SlideFormModel, formProps: FormRenderProps<FormModel>) => {
    if (activeSlide?.templateId === CANVAS_TEMPLATE_ID) {
      await updateSlide(activeSlide);
    }

    analytics.track('show_slides_duplicate', {
      show_id: gqlIdToUuid(show.id),
      slide_id: gqlIdToUuid(slide.id),
      event_location: 'show_editor',
    });

    const response = await duplicateShowSlideMutation({
      variables: { input: { slideId: slide.id } },
    });

    const newSlide = response.data?.duplicateShowSlide.showSlide;
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
    setSlideEditVisible(true);
    //Trigger validation
    formProps.form.submit();
  };

  const handleDeleteSlideOptionClick = async (slide: SlideFormModel, formProps: FormRenderProps<FormModel>) => {
    analytics.track('show_slides_delete', {
      show_id: gqlIdToUuid(show.id),
      slide_id: gqlIdToUuid(slide.id),
      event_location: 'show_editor',
    });
    await deleteShowSlideMutation({ variables: { input: { id: slide.id } } });
    const index = formProps.values.slides.findIndex((item) => item.id === slide.id);
    formProps.form.mutators.remove('slides', index);

    toastUndo({
      text: 'msg_label_edit_show_page_slide_deleted_text',
      onUndoClick: async () => {
        const response = await createShowSlideMutation({
          variables: {
            input: { show: show.id, templateId: slide.templateId, sortOrder: formProps.values.slides.length },
          },
        });

        const newSlide = response.data?.createShowSlide.showSlide;
        assertIsDefined(newSlide);

        formProps.form.mutators.insert('slides', index, {
          ...slide,
          id: newSlide.id,
        } as SlideFormModel);
        setActiveSlideId(newSlide.id);
        setSlideEditVisible(true);
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

  const handleSlideSelectionClick = async (template: SlideTemplateFragment, formProps: FormRenderProps<FormModel>) => {
    if (activeSlide?.templateId === CANVAS_TEMPLATE_ID) {
      await updateSlide(activeSlide);
    }

    const response = await createShowSlideMutation({
      variables: {
        input: { show: show.id, templateId: template.id, sortOrder: formProps.values.slides.length },
      },
    });

    const newSlide = response.data?.createShowSlide.showSlide;
    assertIsDefined(newSlide);

    analytics.track('show_slides_create', {
      show_id: gqlIdToUuid(show.id),
      slide_id: gqlIdToUuid(newSlide.id),
      template_id: template.id,
      event_location: 'show_editor',
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
    setSlideEditVisible(true);
    setTemplateSelectionShown(false);
    //Trigger validation
    formProps.form.submit();
  };

  const onAddSlideClick = () => {
    setTemplateSelectionShown(true);
  };

  const onShowPreviewClick = () => {
    setViewQueryString(View.Preview);
  };

  const onShareButtonClick = () => {
    showModal({
      component: ShareShowModalBody,
      props: {
        show,
      },
    });
  };

  const updateSlide = useCallback(
    (slide: SlideFormModel) => {
      return updateShowSlideMutation({
        variables: {
          input: {
            id: slide.id,
            duration: parseTime(slide.duration),
            data: JSON.stringify(slide.data || {}),
          },
        },
      });
    },
    [updateShowSlideMutation]
  );

  const updateShow = useCallback(
    (values: FormModel) => {
      updateShowMutation({
        variables: {
          input: {
            id: show.id,
            name: values.name,
          },
        },
      });
    },
    [show.id, updateShowMutation]
  );

  const updateSlidesOrder = useCallback(
    (slides: string[]) => {
      if (!slides.length) {
        return;
      }

      orderShowSlidesMutation({
        variables: {
          input: { showId: show.id, slides },
        },
      });
    },
    [orderShowSlidesMutation, show.id]
  );

  const isSaving = [
    updateShowMutationResult,
    duplicateShowMutationResult,
    orderShowSlidesMutationResult,
    createShowSlideMutationResult,
    updateShowSlideMutationResult,
    deleteShowSlideMutationResult,
    duplicateShowSlideMutationResult,
  ].some((result) => result.loading);

  const { handleSubmit, values, form, active, errors } = formProps;

  const activeSlideIndex = values.slides.findIndex((slide) => slide.id === activeSlideId);
  const activeSlide = values.slides.find((slide) => slide.id === activeSlideId);

  const previousActive = usePrevious(active);
  const slidesOrders = values.slides.map((slide) => slide.id);
  const previousSlidesOrder = usePrevious(slidesOrders);
  const oldValues = useRef(values);

  // Ref used to avoid useEffect retriggering
  const activeSlideRef = useLatest(activeSlide);

  // Autosave canvas when navigating to other route
  useEffect(
    () => () => {
      if (activeSlideRef.current?.templateId === CANVAS_TEMPLATE_ID) {
        updateSlide(activeSlideRef.current);
      }
    },
    [activeSlideRef, updateSlide]
  );

  useEffect(() => {
    if (active || !previousActive || equal(values, oldValues.current)) {
      return;
    }

    oldValues.current = values;

    if (previousActive.startsWith('slides')) {
      const index = Number(previousActive.substring(previousActive.indexOf('[') + 1, previousActive.indexOf(']')));
      if (errors.slides?.[index]) {
        return;
      }

      updateSlide(values.slides[index]);
      return;
    }

    if (previousActive === 'name') {
      analytics.track('show_rename', {
        show_id: gqlIdToUuid(show.id),
        event_location: 'show_editor',
      });
    }

    updateShow(values);
  }, [active, errors, show.id, previousActive, updateShow, updateSlide, values]);

  useEffect(() => {
    if (previousSlidesOrder && String(slidesOrders) !== String(previousSlidesOrder)) {
      updateSlidesOrder(slidesOrders);
    }
  }, [previousSlidesOrder, slidesOrders, updateSlidesOrder]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {viewQueryString === View.Main && (
        <MainPageLayout
          gridClassName={styles.grid}
          NavigationBarComponent={
            <FormNavigationBar>
              <div className={styles.navigationFields}>
                <div className={styles.leftNavigationSection}>
                  <FormField
                    name="name"
                    className={styles.nameField}
                    component={AutosizeTextInput}
                    parse={limitLength(TITLE_MAX_LENGTH)}
                    autoFocus={showCreated}
                    onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.select()}
                    format={(value) => value || show.name}
                    formatOnBlur={true}
                  />
                  <DropDown
                    component={<Icon icon={IconType.More} iconStyle={IconStyle.None} title="Edit show" />}
                    className={styles.showOptionsDropdown}
                  >
                    <DropDownItem onClick={() => handleDeleteShowOptionClick(formProps)}>
                      {t('msg_label_edit_show_page_delete_option')}
                    </DropDownItem>
                    <DropDownItem onClick={duplicateShow}>
                      {t('msg_label_edit_show_page_duplicate_option')}
                    </DropDownItem>
                  </DropDown>
                  <AutosaveBadge isSaving={isSaving} />
                </div>
                <div className={styles.rightNavigationSection}>
                  <Typography
                    color={TextColor.LightFadedBlue}
                    className={styles.updateHistoryAvatars}
                    title={t('msg_view_show_history')}
                    WrapperElement="div"
                    onClick={() => {
                      analytics.track(historyShown ? 'show_history_hide' : 'show_history_show', {
                        show_id: gqlIdToUuid(show.id),
                        event_location: 'show_editor',
                      });
                      setHistoryShown(!historyShown);
                    }}
                  >
                    {t('msg_show_editor_updated_on', {
                      date: DateFns.format(DateFns.parseISO(show.updatedAt || show.createdAt), 'HH:mm do MMMM'),
                    })}
                  </Typography>
                  <Button
                    buttonType={ButtonType.Button}
                    buttonStyle={ButtonStyle.Text}
                    buttonColor={ButtonColor.White}
                    onClick={onShowPreviewClick}
                  >
                    <Icon icon={IconType.Eye} className={styles.previewIcon} iconStyle={IconStyle.None} />
                    <span>{t('msg_nav_text_preview')}</span>
                  </Button>
                  <Button
                    buttonType={ButtonType.Button}
                    buttonStyle={ButtonStyle.Text}
                    buttonColor={ButtonColor.White}
                    onClick={onShareButtonClick}
                  >
                    <Icon icon={IconType.Share} className={styles.shareIcon} iconStyle={IconStyle.None} />
                    {show.isPublic ? <Badge>{t('msg_common_public')}</Badge> : <span>{t('msg_common_share')}</span>}
                  </Button>
                  <AddToDropdown
                    showId={show.id}
                    eventLocation="show_editor"
                    title={t('msg_show_editor_add_to_tooltip')}
                  />
                  <NavigationBarClose
                    title={t('msg_close_show_editor_title')}
                    onClose={() => history.push(redirectLink)}
                  />
                </div>
              </div>
            </FormNavigationBar>
          }
          FooterComponent={
            <div className={styles.bottomContainer}>
              <div className={styles.showDuration}>
                <Typography styleType={TextType.TinyHeadline} color={TextColor.LightFadedBlue}>
                  {t('msg_label_show_duration')}
                </Typography>
                <Typography>
                  {formatTime(values.slides.reduce((sum, slide) => sum + parseTime(slide.duration), 0))}
                </Typography>
              </div>
            </div>
          }
        >
          <aside className={styles.leftSideContainer}>
            <FieldArray name="slides">
              {(props) => (
                <SlideList
                  {...props}
                  showId={show.id}
                  activeSlideId={activeSlideId}
                  slideEditVisible={slideEditVisible}
                  onSlideClick={(slide: SlideFormModel) => {
                    if (activeSlideId !== slide.id) {
                      if (activeSlide?.templateId === CANVAS_TEMPLATE_ID) {
                        updateSlide(activeSlide);
                      }
                      setActiveSlideId(slide.id);
                      setSlideEditVisible(true);
                    }
                  }}
                  onSlideThumbnailClick={(slide: SlideFormModel) => {
                    if (activeSlideId === slide.id) {
                      setSlideEditVisible(!slideEditVisible);
                    }
                  }}
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
              <button className={styles.addSlide} onClick={onAddSlideClick}>
                <Typography styleType={TextType.UpperCaseLink}>{t('msg_label_add_show_slide')}</Typography>
              </button>
            </div>
          </aside>
          <div
            className={classNames(styles.rightSideContainer, {
              [styles.canvasEditor]: activeSlide?.templateId === CANVAS_TEMPLATE_ID,
            })}
          >
            {activeSlide ? (
              <>
                {activeSlide.templateId === CANVAS_TEMPLATE_ID ? (
                  <CanvasEditor
                    key={activeSlideId}
                    slide={activeSlide}
                    onChange={(data) => {
                      form.change<any>(`slides[${activeSlideIndex}].data`, data);
                    }}
                    onSave={() => {
                      updateSlide(activeSlide);
                    }}
                  />
                ) : (
                  <ShowEditPreview activeSlide={activeSlide} showId={show.id} id="activeSlidePreview" />
                )}
              </>
            ) : (
              <button type="button" className={styles.noSlideButton} onClick={onAddSlideClick}>
                <EyeImage className={styles.eyeIcon} />
                <Typography WrapperElement="div">{t('msg_label_show_get_started')}</Typography>
              </button>
            )}

            {templateSelectionShown && (
              <SlideTemplateSelectionPanel
                onOutsideClick={() => {
                  setTemplateSelectionShown(false);
                }}
                onSelect={(template) => handleSlideSelectionClick(template, formProps)}
              />
            )}
          </div>
          <div className={classNames(styles.editHistoryOverlay, { [styles.expanded]: historyShown })}>
            {historyShown && <ShowHistoryPanel id={show.id} />}
          </div>
        </MainPageLayout>
      )}
      {viewQueryString === View.Preview && (
        <ShowPreviewView
          id={show.id}
          eventLocation="show_editor"
          onClose={() => {
            setViewQueryString(View.Main);
          }}
        />
      )}
    </form>
  );
};

interface ShowEditorPageInterface {
  show: ShowDetailsFragment;
  redirectLink: string;
}

const ShowEditorPage: React.FunctionComponent<ShowEditorPageInterface> = ({ show, redirectLink }) => {
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
      {(formProps) => <ShowEditorPageForm show={show} redirectLink={redirectLink} formProps={formProps} />}
    </Form>
  );
};

const ShowEditorPageContainer: React.FunctionComponent = () => {
  const { id, channelId } = useRouteParams(RouteConfig.ChannelShowEditor);
  const location = useLocation();

  const redirectLink = useMemo(
    () =>
      (channelId ? RouteConfig.ChannelEdit.buildLink({ id: channelId }) : RouteConfig.Shows.buildLink()) +
      location.search,
    [channelId, location]
  );

  const { data, loading, error } = useShowDetailsQuery({
    variables: {
      id,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  if (loading) {
    return null;
  }

  if (error || !data?.show) {
    toastError('msg_error_title_loading_show', 'msg_error_loading_show');
    return <Redirect to={redirectLink} />;
  }

  return <ShowEditorPage show={data.show} redirectLink={redirectLink} />;
};

export default ShowEditorPageContainer;
