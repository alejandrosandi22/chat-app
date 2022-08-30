import { useMutation } from '@apollo/client';
import { FORGET_PASSWORD } from 'graphql/mutations';

export default function useForgetPassword() {
  const [forgetPassword, { loading, error }] = useMutation(FORGET_PASSWORD, {
    onError(error) {
      console.error(error.message);
    },
  });

  return {
    forgetPassword,
    loading,
    error,
  };
}
