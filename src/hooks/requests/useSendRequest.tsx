import { useMutation } from '@apollo/client';
import { SEND_REQUEST } from 'graphql/mutations';
import { getAuth } from 'services/apolloClient';

export default function useSendRequest(contactId: number, name: string) {
  const [sendRequest, { loading, data }] = useMutation(SEND_REQUEST, {
    onError(error) {
      console.error(error);
    },
    variables: {
      receiver: contactId,
      content: `New contact request from ${name}`,
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });

  return { sendRequest, loading, data };
}
