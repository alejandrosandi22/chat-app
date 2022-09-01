import { useMutation } from '@apollo/client';
import { UPDATE_USER } from 'graphql/mutations';
import { getAuth } from 'services/apolloClient';
import refetchQueries from 'services/refetchQueries';

export default function useUpdateUser() {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: async () => {
      await refetchQueries();
    },
    onError(error) {
      console.error(error.message);
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });

  return { updateUser, loading, error };
}
