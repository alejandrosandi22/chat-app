import { useQuery } from '@apollo/client';
import { RECEIVE_REQUESTS } from 'graphql/queries';
import { getAuth } from 'services/apolloClient';

export default function useReceiveRequest<T>(contactId?: number) {
  const { data, loading } = useQuery(RECEIVE_REQUESTS, {
    onError(error) {
      console.error(error.message);
    },
    variables: {
      contactId,
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });

  return { requests: data?.receiveRequest as T, loading };
}
