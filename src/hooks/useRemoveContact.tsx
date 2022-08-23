import { useMutation } from '@apollo/client';
import { REMOVE_CONTACT } from 'graphql/queries';
import { getAuth } from 'services/apolloClient';

export default function useRemoveContact() {
  const [removeContact, { data, loading }] = useMutation(REMOVE_CONTACT, {
    onError(error) {
      console.error(error);
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });

  return {
    removeContact,
    loading,
    data,
  };
}
