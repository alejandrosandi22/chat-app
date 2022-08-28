import { useQuery } from '@apollo/client';
import { RECEIVE_REQUESTS } from 'graphql/queries';
import { getAuth } from 'services/apolloClient';

export default function useReceiveRequest<T>() {
  const { data, loading } = useQuery(RECEIVE_REQUESTS, {
    onError(error) {
      console.error(error);
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });

  return { requests: data?.receiveRequest as T, loading };
}
