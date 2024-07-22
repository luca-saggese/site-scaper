import { AppConfigDocument, AppConfigViewNode } from '@Graphql/graphqlTypes.generated';
import graphqlClient from '@Utils/graphqlClient';
import { logError } from '@Utils/helpers';

export const fetchAppConfig = (): Promise<AppConfigViewNode> => {
  return graphqlClient
    .query<{ appConfig: AppConfigViewNode }>({
      query: AppConfigDocument,
      fetchPolicy: 'network-only',
    })
    .then((response) => {
      return response.data.appConfig;
    })
    .catch((error) => {
      logError(error);
      throw error;
    });
};
