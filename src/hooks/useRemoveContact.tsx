import { useMutation } from '@apollo/client';
import { REMOVE_CONTACT } from 'graphql/mutations';
import { GET_CURRENT_USER } from 'graphql/queries';
import { getAuth } from 'services/apolloClient';

export default function useRemoveContact() {
  const [removeContact, { data, loading }] = useMutation(REMOVE_CONTACT, {
    onError(error) {
      console.error(error.message);
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
    refetchQueries: [{ query: GET_CURRENT_USER }],
  });

  return {
    removeContact,
    loading,
    data,
  };
}
