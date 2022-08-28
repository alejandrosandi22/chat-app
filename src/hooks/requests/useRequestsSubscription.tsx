import { useApolloClient, useSubscription } from '@apollo/client';
import { RECEIVE_REQUESTS } from 'graphql/queries';
import { REQUEST_SENDED } from 'graphql/subscriptions';

export default function useRequestsSubscription() {
  const client = useApolloClient();

  useSubscription(REQUEST_SENDED, {
    onSubscriptionData: async () => {
      await client.refetchQueries({
        include: [RECEIVE_REQUESTS],
      });
    },
  });
}
