import { GET_CONTACTS, GET_CURRENT_USER } from 'graphql/queries';
import client from './apolloClient';

export default async function refetchQueries() {
  await client.refetchQueries({
    include: [GET_CURRENT_USER, GET_CONTACTS],
  });
}
