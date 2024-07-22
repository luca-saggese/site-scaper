import React from 'react';
import { useHistory } from 'react-router-dom';

import { RouteConfig } from '@Config/routes';
import { useRouteParams } from '@Hooks/useRouteParams';
import ChannelPreviewView from '@Routes/channel/pages/edit/ChannelPreviewView';

const ChannelPreviewPage: React.FunctionComponent = () => {
  const { id } = useRouteParams(RouteConfig.ChannelPreview);
  const history = useHistory();

  return (
    <ChannelPreviewView
      id={id}
      eventLocation="channel_overview"
      onClose={() => {
        history.push(RouteConfig.Channels.buildLink());
      }}
    />
  );
};

export default ChannelPreviewPage;
