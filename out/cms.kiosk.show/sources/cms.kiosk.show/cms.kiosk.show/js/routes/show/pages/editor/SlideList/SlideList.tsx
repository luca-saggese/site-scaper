import classnames from 'classnames';
import React, { useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-final-form';
import { FieldArrayRenderProps } from 'react-final-form-arrays';

import { ActionBlocker } from '@Components/ActionBlocker/ActionBlocker';
import DropDown, { DropDownAlign, DropDownPosition, SubDropdown } from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import FormField from '@Components/Form/FormField';
import TextInput, { TextInputProps } from '@Components/Form/TextInput';
import Icon, { IconType } from '@Components/Icon';
import ContentBox from '@Components/Layout/ContentBox/ContentBox';
import Typography from '@Components/Typography';
import { CANVAS_TEMPLATE_ID } from '@Config/constants';
import { SlideFormModel } from '@Routes/show/pages/editor';
import CanvasPreview from '@Routes/show/pages/editor/CanvasPreview';
import SchemaFields from '@Routes/show/pages/editor/SchemaFields';
import analytics from '@Utils/analytics';
import { composeValidators, minimumDuration, required } from '@Utils/form';
import { formatTime, gqlIdToUuid, parseTime } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import ShowEditPreview from '../ShowEditPreview';

import styles from './SlideList.module.scss';

interface SlideListProps extends FieldArrayRenderProps<SlideFormModel, HTMLDivElement> {
  activeSlideId: string | undefined;
  slideEditVisible: boolean;
  isEditable?: boolean;
  showId: string;
  onSlideClick: (slide: SlideFormModel) => void;
  onSlideThumbnailClick: (slide: SlideFormModel) => void;
  onDuplicateSlideOptionClick: (slide: SlideFormModel) => void;
  onDeleteSlideOptionClick: (slide: SlideFormModel) => void;
  onSlideInfoChange: (index: number) => void;
}

const SlideList: React.FunctionComponent<SlideListProps> = ({
  fields,
  activeSlideId,
  slideEditVisible,
  isEditable = true,
  showId,
  onSlideClick,
  onSlideThumbnailClick,
  onDuplicateSlideOptionClick,
  onDeleteSlideOptionClick,
  onSlideInfoChange,
}) => {
  const t = useTranslation();
  const form = useForm();

  useEffect(() => {
    const activeElem = document.querySelector(`.${styles.activeSlide}`);
    if (activeElem) {
      activeElem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSlideId]);

  // fields.move does not correctly copy different structure field change/blur/focus handlers
  // https://github.com/final-form/final-form-arrays/pull/
  const move = (sourceIndex: number, destinationIndex: number) => {
    const copy = [...fields.value];
    copy.splice(destinationIndex, 0, copy.splice(sourceIndex, 1)[0]);
    form.change('slides', copy);
    analytics.track('show_slides_reorder', {
      show_id: gqlIdToUuid(showId),
      event_location: 'show_editor',
    });
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }

        move(result.source.index, result.destination.index);
      }}
    >
      <Droppable droppableId="droppable" isDropDisabled={!isEditable}>
        {(droppableProvided) => (
          <ol ref={droppableProvided.innerRef}>
            {fields.map((key, index) => {
              const slidesCount = fields.value.length;
              const slide = fields.value[index];
              const isFirst = index === 0;
              const isLast = index === slidesCount - 1;
              return (
                <Draggable key={slide.id} draggableId={slide.id} index={index} isDragDisabled={!isEditable}>
                  {(draggableProvided) => (
                    <li
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={draggableProvided.draggableProps.style}
                      className={classnames(styles.slideContainer, {
                        [styles.activeSlide]: activeSlideId === slide.id,
                        [styles.slideEditVisible]: slideEditVisible,
                      })}
                      onMouseDown={(event) => {
                        const activeElem = document.activeElement as HTMLElement | null;
                        if (
                          activeElem &&
                          activeElem !== event.target &&
                          !(event.target as HTMLElement).closest('.Select')
                        ) {
                          activeElem.blur();
                        }
                      }}
                      onClick={() => onSlideClick(slide)}
                    >
                      {!isEditable && <ActionBlocker message={t('msg_meme_generator_action_blocker')} />}
                      <div className={styles.slidePreview} onClick={() => onSlideThumbnailClick(slide)}>
                        {slide.templateId === CANVAS_TEMPLATE_ID ? (
                          <CanvasPreview data={slide.data.data} id={`Slide-${slide.id}`} width={240} />
                        ) : (
                          <ShowEditPreview showId={showId} activeSlide={slide} forceAutoplayOff={true} />
                        )}
                      </div>

                      <div className={styles.slideHeader}>
                        <Typography>{slide.templateName}</Typography>
                        <DropDown
                          position={DropDownPosition.Right}
                          align={DropDownAlign.Start}
                          component={<Icon icon={IconType.More} title="Edit slide" />}
                        >
                          {slidesCount > 1 && (
                            <SubDropdown
                              component={<DropDownItem closeOnClick={false}>{t('msg_common_move')}</DropDownItem>}
                            >
                              {!isFirst && (
                                <DropDownItem
                                  onClick={() => {
                                    move(index, index - 1);
                                  }}
                                >
                                  {t('msg_common_up')}
                                </DropDownItem>
                              )}
                              {!isLast && (
                                <DropDownItem
                                  onClick={() => {
                                    move(index, index + 1);
                                  }}
                                >
                                  {t('msg_common_down')}
                                </DropDownItem>
                              )}
                              {!isFirst && (
                                <DropDownItem
                                  onClick={() => {
                                    move(index, 0);
                                  }}
                                >
                                  {t('msg_common_to_the_top')}
                                </DropDownItem>
                              )}
                              {!isLast && (
                                <DropDownItem
                                  onClick={() => {
                                    move(index, slidesCount - 1);
                                  }}
                                >
                                  {t('msg_common_to_the_bottom')}
                                </DropDownItem>
                              )}
                            </SubDropdown>
                          )}

                          <DropDownItem onClick={() => onDuplicateSlideOptionClick(slide)}>
                            {t('msg_label_edit_show_page_duplicate_option')}
                          </DropDownItem>
                          <DropDownItem onClick={() => onDeleteSlideOptionClick(slide)}>
                            {t('msg_label_edit_show_page_delete_option')}
                          </DropDownItem>
                        </DropDown>
                      </div>
                      <ContentBox className={styles.contentBox}>
                        {slide.templateId !== CANVAS_TEMPLATE_ID && (
                          <SchemaFields
                            path={key}
                            index={index}
                            schema={slide.templateSchema}
                            onSlideInfoChange={() => {
                              onSlideInfoChange(index);
                            }}
                          />
                        )}

                        <FormField<TextInputProps<string>>
                          name={`${key}.duration`}
                          label={t('msg_field_label_show_duration')}
                          component={TextInput}
                          className={styles.field}
                          validate={composeValidators(required(), minimumDuration)}
                          format={(value) => formatTime(parseTime(value))}
                          formatOnBlur={true}
                          title={t('msg_slide_duration_field_title')}
                        />
                      </ContentBox>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {droppableProvided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SlideList;
