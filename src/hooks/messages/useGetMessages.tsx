import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from 'graphql/queries';
import { getAuth } from 'services/apolloClient';

export function useGetMessages(contactId: number, offset: number) {
  const { data, loading, error } = useQuery(GET_MESSAGES, {
    onError(error) {
      console.error(error);
    },
    variables: {
      contactId,
      offset,
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });

  return { data: data?.getMessages, loading, error };
}
