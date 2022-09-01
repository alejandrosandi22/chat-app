import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from 'graphql/queries';
import { useState } from 'react';

export default function useGetAllUsers() {
  const [page, setPage] = useState<number>(0);
  const { data, loading, refetch } = useQuery(GET_ALL_USERS, {
    variables: {
      limit: 20,
      offset: page,
    },
  });

  const handleSetPage = () => {
    setPage((prev) => prev + 1);
  };

  return { data: data?.getAllUsers, loading, setPage: handleSetPage, refetch };
}
