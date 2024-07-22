import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Loader from '@Components/Loader';
import { RouteConfigMeme } from '@Config/routes';
import { useDuplicateOpenShowMutation } from '@Graphql/graphqlTypes.generated';
import { useRouteParams } from '@Hooks/useRouteParams';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { mutationErrorHandler } from '@Utils/graphql';
import { getCmsToken } from '@Utils/publicToken';

export const MemeGeneratorForkPage: React.FunctionComponent = () => {
  const history = useHistory();
  const { openShowId } = useRouteParams(RouteConfigMeme.MemeGeneratorFork);
  const cmsToken = getCmsToken();

  const [duplicateOpenShowMutation] = useDuplicateOpenShowMutation({
    context: { headers: { cmstoken: cmsToken } },
    onCompleted: (response) => {
      const id = response.duplicateOpenShow.openShow?.id;
      assertIsDefined(id);
      analytics.track('public_show_fork', {
        public_show_id: openShowId,
        event_location: 'public_show',
      });
      history.replace(RouteConfigMeme.MemeGeneratorEdit.buildLink({ openShowId: id }));
    },
    onError: (error) => {
      mutationErrorHandler('msg_error_title_duplicate_show')(error);
      history.goBack();
    },
  });

  useEffect(() => {
    duplicateOpenShowMutation({ variables: { input: { openShowId } } });
  }, [duplicateOpenShowMutation, openShowId]);

  return <Loader />;
};
