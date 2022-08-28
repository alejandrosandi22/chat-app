import { useMutation } from '@apollo/client';
import { UPDATE_USER } from 'graphql/mutations';
import { GET_CONTACTS, GET_CURRENT_USER } from 'graphql/queries';
import client, { getAuth } from 'services/apolloClient';

export default function useUpdateUser() {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER, {
    onCompleted: async () => {
      await client.refetchQueries({
        include: [GET_CURRENT_USER, GET_CONTACTS],
      });
    },
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
