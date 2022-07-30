import { useEffect, useState } from 'react';
import getContacts from 'services/getContacts';
import { UserType } from 'types';

export default function useGetContacts(userId: number) {
  const [data, setData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getContacts(userId).then((data) => {
      setData(data);
    });
  }, [userId]);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  return { data, loading };
}
