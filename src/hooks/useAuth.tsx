import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from 'graphql/queries';
import { useRouter } from 'next/router';
import { getAuth } from 'services/apolloClient';

export default function useAuth() {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    onCompleted(data) {
      if (!data.getCurrentUser) {
        router.push('/signin');
      }
    },
    onError(error) {
      console.error(error);
      router.push('/signin');
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });

  return { loading, error, currentUser: data?.getCurrentUser, refetch };
}
