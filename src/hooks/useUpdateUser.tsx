import { useMutation } from '@apollo/client';
import { UPDATE_USER } from 'graphql/queries';
import { getAuth } from 'services/apolloClient';

export default function useUpdateUser() {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onError(error) {
      console.error(error);
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });

  return { updateUser, loading, error };
}
