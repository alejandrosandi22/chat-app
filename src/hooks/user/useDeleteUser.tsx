import { useMutation } from '@apollo/client';
import { deleteCookie } from 'cookies-next';
import { DELETE_USER } from 'graphql/mutations';
import { useAppSelector } from 'hooks';
import { useRouter } from 'next/router';

export default function useDeleteUser() {
  const router = useRouter();

  const { user } = useAppSelector((state) => state.userReducer);

  const [deleteUser, { loading }] = useMutation(DELETE_USER, {
    onCompleted() {
      deleteCookie('chat-app-user-session');
      router.push('/');
    },
    onError(error) {
      console.error(error.message);
    },
    variables: {
      email: user?.email,
    },
  });

  return { deleteUser, loading };
}
