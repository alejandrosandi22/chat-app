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

  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery(GET_MESSAGES, {
    onError(error) {
      console.error(error.message);
    },
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
  });

  const loadMoreMessages = () => {
    setPage((prev) => prev + 1);
    setLoadMore(true);
  };

  useEffect(() => {
    setContactId(contact?.id);
    if (contact?.id !== contactId) setMessages([]);
  }, [contact]);

  useEffect(() => {
    if (data) {
      if (loadMore) {
        dispatch(setMessages(data.getMessages.concat(messages)));
        setLoadMore(false);
      } else dispatch(setMessages(data.getMessages));
    }
  }, [data]);

  return {
    messages,
    loading,
    error,
    loadMoreMessages,
  };
}
