import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { WebSocketLink } from '@apollo/client/link/ws';
import { relayStylePagination } from '@apollo/client/utilities';
import { SentryLink } from 'apollo-link-sentry';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';

import config, { NodeEnvEnum } from '@Config/config';
import { LocalStorage } from '@Config/constants';
import { RouteConfig } from '@Config/routes';
import { logError } from '@Utils/helpers';
import { history } from '@Utils/history';
import { deleteFromLocalStorage, getFromLocalStorage } from '@Utils/localStorage';

const httpLink = createUploadLink({
  uri: `${config.REACT_APP_API_BASE_URL}/graphql/`,
});

const wsLink = new WebSocketLink({
  uri: `${config.REACT_APP_API_BASE_URL.replace('https', 'wss').replace('http', 'ws')}/graphql/`,
  options: {
    reconnect: true,
    lazy: true,
  },
});

const sentryLink = new SentryLink({
  breadcrumb: {
    includeError: true,
    includeVariables: true,
    includeResponse: true,
  },
});

const authLink = setContext((_, { headers }) => {
  const token = getFromLocalStorage(LocalStorage.UserToken);
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : '',
    },
  };
});

const communicationLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors = [], networkError }) => {
  if (networkError && 'statusCode' in networkError && networkError.statusCode === 503) {
    history.push(RouteConfig.Maintenance.buildLink());
    return;
  }

  if (config.NODE_ENV !== NodeEnvEnum.Production) {
    if (networkError?.message) {
      logError(networkError.message);
    }

    graphQLErrors.forEach((error) => {
      logError(`[GRAPHQL error]: ${JSON.stringify(error)}`);
    });
  }

  if (graphQLErrors.some((error) => error.message === 'error_users_jwt_token_expire_or_invalid')) {
    deleteFromLocalStorage(LocalStorage.UserToken);
    window.location.replace(RouteConfig.Login.buildLink());
    return;
  }

  if (graphQLErrors.some((error) => error.message === 'error_invalid_permission')) {
    const token = getFromLocalStorage(LocalStorage.UserToken);

    if (!token) {
      deleteFromLocalStorage(LocalStorage.UserToken);
      window.location.replace(RouteConfig.Login.buildLink());
      return;
    }

    history.push(RouteConfig.ErrorNotPermitted.buildLink());
  }
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        screens: relayStylePagination(),
        shows: relayStylePagination(),
        channels: relayStylePagination(),
        mediaLibraryImages: relayStylePagination(),
      },
    },
  },
});

const link = ApolloLink.from([sentryLink, authLink, errorLink, communicationLink]);

const graphqlClient = new ApolloClient({ link, cache });

export default graphqlClient;
