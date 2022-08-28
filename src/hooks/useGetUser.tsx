import { useQuery } from '@apollo/client';
import { GET_USER } from 'graphql/queries';
import { useState } from 'react';
import { UserType } from 'types';

export default function useGetUser(id: number) {
  const [user, setUser] = useState<UserType>({} as UserType);
  const { loading } = useQuery(GET_USER, {
    onCompleted({ getUser }) {
      setUser(getUser);
    },
    onError(error) {
      console.error(error);
    },
    variables: {
      id,
    },
  });

  return { user, loading };
}
