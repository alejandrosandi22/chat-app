import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from 'graphql/queries';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { getAuth } from 'services/apolloClient';
import { setMessages } from 'store/reducers/messages';

export function useGetMessages() {
  const { contact } = useAppSelector((state) => state.selectContact);
  const { messages } = useAppSelector((state) => state.messagesReducer);
  const [contactId, setContactId] = useState<number | undefined>(contact?.id);
  const [page, setPage] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { loading, error, fetchMore } = useQuery(GET_MESSAGES, {
    onCompleted({ getMessages }) {
      dispatch(setMessages(getMessages));
      setPage(0);
    },
    onError(error) {
      console.error(error.message);
    },
    variables: {
      contactId,
      limit: 10,
      offset: 0,
    },
    context: {
      headers: {
        authorization: getAuth(),
      },
    },
  });

  const loadMoreMessages = () => {
    setLoadingMore(true);
    setPage((prev) => prev + 1);
    setLoadMore(true);
  };

  useEffect(() => {
    (async () => {
      await fetchMore({
        variables: {
          contactId,
          limit: 10,
          offset: page,
        },
        context: {
          headers: {
            authorization: getAuth(),
          },
        },
      }).then((res) => {
        if (loadMore) {
          dispatch(setMessages(res.data.getMessages.concat(messages)));
          setLoadMore(false);
          setLoadingMore(false);
        }
      });
    })();
  }, [page]);

  useEffect(() => {
    setContactId(contact?.id);
    if (contact?.id !== contactId) dispatch(setMessages([]));
  }, [contact]);

  return {
    messages,
    loading,
    error,
    loadMore,
    loadingMore,
    loadMoreMessages,
  };
}
