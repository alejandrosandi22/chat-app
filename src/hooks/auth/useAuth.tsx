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
    onCompleted({ getCurrentUser }) {
      dispatch(setUser(getCurrentUser));
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
