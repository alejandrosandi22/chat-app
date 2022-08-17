import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { getCookie } from 'cookies-next';

export const getAuth = () => {
  const token = getCookie('chat-app-user-session');
  return token ? `bearer ${token}` : null;
};

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      authorization: getAuth(),
    },
    uri: 'http://localhost:3000/api/graphql',
  }),
});

export default client;
