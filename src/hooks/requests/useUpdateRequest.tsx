import { useMutation } from '@apollo/client';
import { UPDATE_REQUEST } from 'graphql/mutations';
import { RECEIVE_REQUESTS } from 'graphql/queries';
import useUpdateUser from 'hooks/user/useUpdateUser';
import { RequestType } from 'types';

export default function useUpdateRequest() {
  const { updateUser } = useUpdateUser();
  const [update, { data, loading }] = useMutation(UPDATE_REQUEST, {
    onError(error) {
      console.error(error.message);
    },
  });

  const updateState = async (requests: RequestType[], state: boolean) => {
    const trueRequests = requests.filter((request) => request.state === false);
    if (!trueRequests.length) return;

    await Promise.resolve(
      trueRequests.map(async (request) => {
        return await update({
          variables: {
            id: request.id,
            state,
          },
          refetchQueries: [{ query: RECEIVE_REQUESTS }],
        });
      })
    );
  };

  const updateResponse = async (request: RequestType, response: boolean) => {
    await update({
      onCompleted: async ({ updateRequest }) => {
        if (updateRequest.value) {
          await updateUser({
            onError(error) {
              console.error(error.message);
            },
            variables: {
              userId: request.sender,
              contacts: request.receiver,
            },
          });
          await updateUser({
            variables: {
              userId: request.receiver,
              contacts: request.sender,
            },
          });
        }
      },
      variables: {
        id: request.id,
        response,
      },
      refetchQueries: [{ query: RECEIVE_REQUESTS }],
    });
  };

  return {
    updateState,
    updateResponse,
    data,
    loading,
  };
}
