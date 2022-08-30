import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from 'graphql/mutations';

export default function useChangePassword() {
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    onCompleted(data) {
      console.log(data);
    },
  });

  return {
    changePassword,
    loading,
  };
}
