import React from 'react';
import { useHistory } from 'react-router-dom';

import { RouteConfig } from '@Config/routes';
import { useRouteParams } from '@Hooks/useRouteParams';
import ShowPreviewView from '@Routes/show/pages/editor/ShowPreviewView';

const ShowPreviewPage: React.FunctionComponent = () => {
  const { id } = useRouteParams(RouteConfig.ShowPreview);
  const history = useHistory();

  return (
    <ShowPreviewView
      id={id}
      eventLocation="show_overview"
      onClose={() => {
        history.push(RouteConfig.Shows.buildLink());
      }}
    />
  );
};

export default ShowPreviewPage;
