import { deleteCookie } from 'cookies-next';
import { useAppDispatch } from 'hooks';
import { useRouter } from 'next/router';
import client from 'services/apolloClient';
import { setSelectContact } from 'store/reducers/selectContact';
import { setUser } from 'store/reducers/user';

export default function useSignOut() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signOut = async () => {
    deleteCookie('chat-app-user-session');
    dispatch(setUser(null));
    dispatch(setSelectContact(null));
    await client.clearStore();
    router.push('/signin');
  };

  return {
    signOut,
  };
}
