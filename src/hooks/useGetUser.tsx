import { useQuery } from '@apollo/client';
import { GET_USER } from 'graphql/queries';
import { useState } from 'react';
import { UserType } from 'types';

interface GetUserProps {
  id?: number;
  username?: string;
}

type UserState = UserType | null | undefined;

export default function useGetUser({ id, username }: GetUserProps) {
  const [user, setUser] = useState<UserState>(undefined);
  const { loading, error } = useQuery(GET_USER, {
    onCompleted({ getUser }) {
      setUser(getUser);
    },
    onError(error) {
      console.error(error.message);
    },
    variables: {
      id,
      username,
    },
    fetchPolicy: 'no-cache',
  });

  return { user, loading, error };
}
