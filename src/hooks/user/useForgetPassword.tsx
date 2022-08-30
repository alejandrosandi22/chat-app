import { useMutation } from '@apollo/client';
import { FORGET_PASSWORD } from 'graphql/mutations';

export default function useForgetPassword() {
  const [forgetPassword, { loading }] = useMutation(FORGET_PASSWORD);

  return {
    forgetPassword,
    loading,
  };
}
