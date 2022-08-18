import { useQuery } from '@apollo/client';
import { GET_CONTACTS } from 'graphql/queries';
import { getAuth } from 'services/apolloClient';

export default function getContacts() {
  const { data, loading } = useQuery(GET_CONTACTS, {
    onError(error) {
      console.error(error);
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });

  return {
    contacts: data?.getContacts,
    loading,
  };
}
