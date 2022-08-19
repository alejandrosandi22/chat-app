import { useQuery } from '@apollo/client';
import { GET_CONTACTS } from 'graphql/queries';
import { getAuth } from 'services/apolloClient';
import { UserType } from 'types';

export default function useGetContacts(userId?: number) {
  const { data, loading, refetch } = useQuery(GET_CONTACTS, {
    variables: { userId },
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
    contacts: data?.getContacts as UserType[],
    loading,
    refetch,
  };
}
