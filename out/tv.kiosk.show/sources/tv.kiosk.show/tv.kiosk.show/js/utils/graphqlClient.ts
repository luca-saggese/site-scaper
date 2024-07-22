import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import logger from './logger';
import history from './history';
import { APP_CONFIG } from './globalKiosk';
import { Links } from '../config/constants';
import { SentryLink } from 'apollo-link-sentry';

const sentryLink = new SentryLink({
  breadcrumb: {
    includeError: true,
    includeVariables: true,
    includeResponse: true,
  },
});

const httpLink = new HttpLink({ uri: APP_CONFIG.apiGraphqlUrl });

const errorLink = onError(({ graphQLErrors = [], networkError, response, operation }) => {
  if (networkError && 'statusCode' in networkError && networkError.statusCode === 503) {
    history.push(Links.Maintenance);
    return;
  }

  if (networkError?.message) {
    logger.error(networkError.message);
  }

  graphQLErrors.forEach((error) => {
    logger.error(`[GRAPHQL error]: ${JSON.stringify(error)}`);
  });
});

const client = new ApolloClient({
  uri: APP_CONFIG.apiGraphqlUrl,
  cache: new InMemoryCache(),
  link: ApolloLink.from([sentryLink, errorLink, httpLink]),
});

export default client;
