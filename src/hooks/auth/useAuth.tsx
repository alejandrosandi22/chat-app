import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from 'graphql/queries';
import { useAppDispatch } from 'hooks';
import { useRouter } from 'next/router';
import { getAuth } from 'services/apolloClient';
import { setUser } from 'store/reducers/user';

export default function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    onCompleted(data) {
      if (!data.getCurrentUser) {
        router.push('/signin');
      } else {
        dispatch(setUser(data.getCurrentUser));
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

  return { loading, error, currentUser: data?.getCurrentUser };
}
