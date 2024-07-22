import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Loader from '@Components/Loader';
import { RouteConfigMeme } from '@Config/routes';
import { useCreateOpenShowMutation } from '@Graphql/graphqlTypes.generated';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { gqlIdToUuid } from '@Utils/helpers';
import { getCmsToken } from '@Utils/publicToken';

export const MemeGeneratorCreatePage: React.FunctionComponent = () => {
  const history = useHistory();
  const cmsToken = getCmsToken();

  const [createShowMutation] = useCreateOpenShowMutation({
    onCompleted: (response) => {
      const showId = response.createOpenShow.openShow?.id;
      assertIsDefined(showId);
      analytics.track('show_create', {
        show_id: gqlIdToUuid(showId),
        event_location: 'meme_generator',
      });
      history.replace(RouteConfigMeme.MemeGeneratorEdit.buildLink({ openShowId: showId }));
    },
    context: {
      headers: {
        cmstoken: cmsToken,
      },
    },
  });

  useEffect(() => {
    createShowMutation({ variables: { input: { name: 'Untitled show' } } });
  }, [createShowMutation]);

  return <Loader />;
};
