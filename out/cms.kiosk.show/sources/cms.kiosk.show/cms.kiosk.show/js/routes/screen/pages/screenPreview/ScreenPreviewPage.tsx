import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import SlidesPreviewPageView from '@Components/SlidesPreviewPageView';
import { RouteConfig } from '@Config/routes';
import { useScreenPreviewQuery } from '@Graphql/graphqlTypes.generated';
import { useRouteParams } from '@Hooks/useRouteParams';
import analytics from '@Utils/analytics';
import { gqlIdToUuid } from '@Utils/helpers';

const ScreenPreviewPage: React.FunctionComponent = () => {
  const { id } = useRouteParams(RouteConfig.ScreenPreview);
  const history = useHistory();

  const { loading, data } = useScreenPreviewQuery({
    variables: { id },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    analytics.track('screen_preview', {
      screen_id: gqlIdToUuid(id),
      event_location: 'screen_overview',
    });
  }, [id]);

  const slides = useMemo(() => {
    if (!data?.screen) {
      return [];
    }

    const { subscribedChannel, subscribedShow } = data.screen;

    if (subscribedChannel) {
      return subscribedChannel?.shows.flatMap((showNode) => showNode.show.slides);
    }

    if (subscribedShow) {
      return subscribedShow.slides;
    }

    return [];
  }, [data]);

  if (loading) {
    return null;
  }

  const onRotationChange = (isHorizontal: boolean) => {
    analytics.track('screen_preview_rotate', {
      screen_id: gqlIdToUuid(id),
      mode: isHorizontal ? 'horizontal' : 'vertical',
      event_location: 'screen_overview',
    });
  };

  return (
    <SlidesPreviewPageView
      defaultRotation={data?.screen?.rotation}
      slides={slides}
      onClose={() => {
        history.push(RouteConfig.Screens.buildLink());
      }}
      onRotationChange={onRotationChange}
    />
  );
};

export default ScreenPreviewPage;
