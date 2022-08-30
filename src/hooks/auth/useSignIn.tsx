import { useMutation } from '@apollo/client';
import { setCookie } from 'cookies-next';
import { SIGN_IN } from 'graphql/mutations';
import { useRouter } from 'next/router';

export default function useSignIn() {
  const router = useRouter();

  const [signIn, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted: ({ signIn }) => {
      setCookie('chat-app-user-session', signIn.token);
      router.reload();
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return {
    signIn,
    loading,
    error,
  };
}
