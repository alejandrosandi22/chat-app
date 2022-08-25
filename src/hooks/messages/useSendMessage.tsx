import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from 'graphql/mutations';
import { getAuth } from 'services/apolloClient';

export default function useSendMessage() {
  const [sendMessage, { data, loading }] = useMutation(SEND_MESSAGE, {
    onError(error) {
      console.error(error);
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });
  return { sendMessage, data, loading };
}
