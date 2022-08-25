import { useApolloClient, useSubscription } from '@apollo/client';
import { GET_CONTACTS, GET_MESSAGES } from 'graphql/queries';
import { MESSAGE_SENDED } from 'graphql/subscriptions';

export default function useSubscriptions() {
  const client = useApolloClient();

  useSubscription(MESSAGE_SENDED, {
    onSubscriptionData: async () => {
      await client.refetchQueries({
        include: [GET_MESSAGES, GET_CONTACTS],
      });
    },
  });
}
