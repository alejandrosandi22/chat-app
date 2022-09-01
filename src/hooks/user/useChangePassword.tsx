import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from 'graphql/mutations';

export default function useChangePassword() {
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {});

  return {
    changePassword,
    loading,
  };
}
