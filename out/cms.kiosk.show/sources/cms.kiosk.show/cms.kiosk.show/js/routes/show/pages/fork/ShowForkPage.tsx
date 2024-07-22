import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Loader from '@Components/Loader';
import { RouteConfig } from '@Config/routes';
import { useDuplicatePublicShowMutation } from '@Graphql/graphqlTypes.generated';
import { useRouteParams } from '@Hooks/useRouteParams';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { mutationErrorHandler } from '@Utils/graphql';

const ShowForkPage: React.FunctionComponent = () => {
  const history = useHistory();
  const { publicId } = useRouteParams(RouteConfig.PublicShowFork);

  const [duplicatePublicShowMutation] = useDuplicatePublicShowMutation({
    onCompleted: (response) => {
      const id = response.duplicatePublicShow.show?.id;
      assertIsDefined(id);
      analytics.track('public_show_fork', {
        public_show_id: publicId,
        event_location: 'public_show',
      });
      history.push(RouteConfig.ShowEditor.buildLink({ id }));
    },
    onError: (error) => {
      mutationErrorHandler('msg_error_title_duplicate_show')(error);
      history.push(RouteConfig.Shows.buildLink());
    },
  });

  useEffect(() => {
    duplicatePublicShowMutation({ variables: { input: { publicId } } });
  }, [duplicatePublicShowMutation, publicId]);

  return <Loader />;
};

export default ShowForkPage;
