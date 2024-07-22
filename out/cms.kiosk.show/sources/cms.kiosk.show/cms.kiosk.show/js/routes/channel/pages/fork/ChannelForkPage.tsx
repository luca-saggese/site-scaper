import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Loader from '@Components/Loader';
import { RouteConfig } from '@Config/routes';
import { useDuplicatePublicChannelMutation } from '@Graphql/graphqlTypes.generated';
import { useRouteParams } from '@Hooks/useRouteParams';
import analytics from '@Utils/analytics';
import { assertIsDefined } from '@Utils/assert';
import { mutationErrorHandler } from '@Utils/graphql';

const ChannelForkPage: React.FunctionComponent = () => {
  const history = useHistory();
  const { publicId } = useRouteParams(RouteConfig.PublicChannelFork);

  const [duplicatePublicChannelMutation] = useDuplicatePublicChannelMutation({
    onCompleted: (response) => {
      const id = response.duplicatePublicChannel.channel?.id;
      assertIsDefined(id);
      analytics.track('public_channel_fork', {
        public_channel_id: publicId,
        event_location: 'public_channel',
      });
      history.push(RouteConfig.ChannelEdit.buildLink({ id }));
    },
    onError: (error) => {
      mutationErrorHandler('msg_error_title_saving_channel')(error);
      history.push(RouteConfig.Channels.buildLink());
    },
  });

  useEffect(() => {
    duplicatePublicChannelMutation({ variables: { input: { publicId } } });
  }, [duplicatePublicChannelMutation, publicId]);

  return <Loader />;
};

export default ChannelForkPage;
