import { useMutation } from '@apollo/client';
import { setCookie } from 'cookies-next';
import { SIGN_UP } from 'graphql/mutations';
import { useRouter } from 'next/router';

export default function useSignUp() {
  const router = useRouter();

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted: ({ signUp }) => {
      setCookie('chat-app-user-session', signUp.token);
      router.push('/chat');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { signUp, loading };
}
