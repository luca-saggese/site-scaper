import React, { useEffect, useMemo } from 'react';

import SlidesPreviewPageView from '@Components/SlidesPreviewPageView';
import { useShowEditorPreviewQuery } from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { gqlIdToUuid } from '@Utils/helpers';

interface ShowPreviewViewProps {
  id: string;
  eventLocation: 'show_overview' | 'show_editor';
  onClose: () => void;
}

const ShowPreviewView: React.FunctionComponent<ShowPreviewViewProps> = ({ id, eventLocation, onClose }) => {
  const { loading, data } = useShowEditorPreviewQuery({
    variables: { id },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    analytics.track('show_preview', {
      show_id: gqlIdToUuid(id),
      event_location: eventLocation,
    });
  }, [eventLocation, id]);

  const slides = useMemo(() => data?.show?.slides || [], [data]);

  if (loading) {
    return null;
  }

  const onRotationChange = (isHorizontal: boolean) => {
    analytics.track('show_preview_rotate', {
      show_id: gqlIdToUuid(id),
      mode: isHorizontal ? 'horizontal' : 'vertical',
      event_location: eventLocation,
    });
  };

  return <SlidesPreviewPageView slides={slides} onClose={onClose} onRotationChange={onRotationChange} />;
};

export default ShowPreviewView;
