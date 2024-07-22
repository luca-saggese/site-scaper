import classnames from 'classnames';
import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { FieldArrayRenderProps } from 'react-final-form-arrays';
import { useHistory } from 'react-router-dom';

import DropDown from '@Components/DropDown';
import DropDownItem from '@Components/DropDown/DropDownItem';
import Icon, { IconType } from '@Components/Icon';
import ShowPreview, { Mode } from '@Components/ShowPreview';
import Typography, { TextType } from '@Components/Typography';
import { RouteConfig } from '@Config/routes';
import { ChannelShowFragment, useDuplicateShowMutation } from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { mutationErrorHandler } from '@Utils/graphql';
import { formatTime, gqlIdToUuid } from '@Utils/helpers';
import { useTranslation } from '@Utils/i18n';

import styles from './ChannelShowList.module.scss';

export interface ChannelShowListProps extends FieldArrayRenderProps<ChannelShowFragment, HTMLDivElement> {
  channelId?: string;
}

const ChannelShowList: React.FunctionComponent<ChannelShowListProps> = ({ fields, channelId = '' }) => {
  const t = useTranslation();
  const history = useHistory();

  const [duplicateShowMutation] = useDuplicateShowMutation({
    onError: mutationErrorHandler('msg_error_title_unexpected_error'),
  });

  if (!fields.length) {
    return (
      <Typography className={styles.noShowsMessage} WrapperElement="div">
        {t('msg_label_channel_edit_page_no_shows_message')}
      </Typography>
    );
  }

  const handleDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    analytics.track('channel_shows_reorder', {
      channel_id: gqlIdToUuid(channelId),
      event_location: 'channel_editor',
    });
    fields.move(result.source.index, result.destination.index);
  };

  const handleDuplicateOptionClick = async (showId: string, index: number) => {
    analytics.track('channel_shows_duplicate', {
      channel_id: gqlIdToUuid(channelId),
      show_id: gqlIdToUuid(showId),
      event_location: 'channel_editor',
    });
    const response = await duplicateShowMutation({
      variables: {
        input: {
          showId,
        },
      },
    });
    const showCopy = response.data?.duplicateShow.show;

    if (!showCopy) {
      return;
    }

    fields.insert(index + 1, showCopy);
  };

  const handleEditShow = (id: string) => {
    assertIsDefined(channelId);
    history.push(RouteConfig.ChannelShowEditor.buildLink({ channelId, id }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(droppableProvided) => (
          <div ref={droppableProvided.innerRef}>
            {fields.map((key, index) => {
              const show = fields.value[index];

              return (
                <Draggable key={key} draggableId={key} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={draggableProvided.draggableProps.style}
                      className={classnames(styles.show, draggableSnapshot.isDragging && styles.showDragged)}
                    >
                      <ShowPreview item={show} mode={Mode.Small} onClick={() => handleEditShow(show.id)} />
                      <Typography
                        WrapperElement="div"
                        styleType={TextType.MediumHeadline}
                        onClick={() => handleEditShow(show.id)}
                      >
                        {show.name}
                      </Typography>
                      <Typography className={styles.showDuration} title={t('msg_show_duration_title')}>
                        {formatTime(show.duration)}
                      </Typography>
                      <DropDown
                        className={styles.dropdown}
                        component={<Icon title="Show options" icon={IconType.More} />}
                      >
                        <DropDownItem
                          onClick={() => {
                            analytics.track('channel_shows_remove', {
                              channel_id: gqlIdToUuid(channelId),
                              show_id: gqlIdToUuid(show.id),
                              event_location: 'channel_editor',
                            });
                            fields.remove(index);
                          }}
                        >
                          {t('msg_label_channel_edit_page_remove_show_from_channel_option')}
                        </DropDownItem>
                        <DropDownItem
                          onClick={() => {
                            handleDuplicateOptionClick(show.id, index);
                          }}
                        >
                          {t('msg_label_channel_edit_page_duplicate_show_option')}
                        </DropDownItem>
                      </DropDown>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChannelShowList;
