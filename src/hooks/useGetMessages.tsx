import { useEffect, useState } from 'react';
import getMessages from 'services/getMessages';
import { MessageType } from 'types';

export default function useGetMessages(contactId: number) {
  const [data, setData] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getMessages(1, contactId).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [contactId]);

  return { data, loading };
}
