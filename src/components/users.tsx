import useGetAllUsers from 'hooks/useGetAllUsers';
import { useEffect, useState } from 'react';
import { UserType } from 'types';
import Card from './card';

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([]);
  const { data, setPage, refetch } = useGetAllUsers();

  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  return (
    <>
      <div>
        {users.map((user) => (
          <Card key={`${user.id}-explore`} contact={user} refetch={refetch} />
        ))}
      </div>
      <style jsx>{`
        div {
          padding: 20px 25px;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
}
