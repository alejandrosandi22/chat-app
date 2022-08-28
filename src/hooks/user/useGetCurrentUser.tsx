import { useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { UserType } from 'types';

export default function useGetCurrentUser() {
  const [currentUser, setCurrentUser] = useState<UserType>({} as UserType);
  const { user } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (user) setCurrentUser(user);
  }, [user]);

  return {
    currentUser,
  };
}
