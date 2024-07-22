import React, { useEffect, useMemo } from 'react';

import SlidesPreviewPageView from '@Components/SlidesPreviewPageView';
import { useChannelPreviewQuery } from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { gqlIdToUuid } from '@Utils/helpers';

interface ChannelPreviewViewProps {
  id: string;
  eventLocation: 'channel_overview' | 'channel_editor';
  onClose: () => void;
}

const ChannelPreviewView: React.FunctionComponent<ChannelPreviewViewProps> = ({ id, eventLocation, onClose }) => {
  const { loading, data } = useChannelPreviewQuery({
    variables: { id },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    analytics.track('channel_preview', {
      channel_id: gqlIdToUuid(id),
      event_location: eventLocation,
    });
  }, [eventLocation, id]);

  const slides = useMemo(() => data?.channel?.shows.flatMap((showNode) => showNode.show.slides) || [], [data]);

  if (loading) {
    return null;
  }

  const onRotationChange = (isHorizontal: boolean) => {
    analytics.track('channel_preview_rotate', {
      channel_id: gqlIdToUuid(id),
      mode: isHorizontal ? 'horizontal' : 'vertical',
      event_location: eventLocation,
    });
  };

  return <SlidesPreviewPageView slides={slides} onClose={onClose} onRotationChange={onRotationChange} />;
};

export default ChannelPreviewView;
