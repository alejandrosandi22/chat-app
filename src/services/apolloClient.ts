import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { getCookie } from 'cookies-next';

export const getAuth = () => {
  const token = getCookie('chat-app-user-session');
  return token ? `bearer ${token}` : null;
};

const client = new ApolloClient({
  link: new HttpLink({
    headers: {
      authorization: getAuth(),
    },
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;
