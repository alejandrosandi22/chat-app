import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getCookie } from 'cookies-next';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

export const getAuth = () => {
  const token = getCookie('chat-app-user-session');
  return token ? `bearer ${token}` : null;
};

const httpLink = new HttpLink({
  headers: {
    authorization: getAuth(),
  },
  uri: 'http://localhost:4000/graphql',
});

const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: 'ws://localhost:4000/graphql',
        })
      )
    : null;

const link =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === 'OperationDefinition' &&
            def.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink;

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
