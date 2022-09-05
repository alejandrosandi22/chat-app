import { UserType } from 'types';
import Header from './header';
import Main from './main';

interface ProfileProps {
  user: UserType;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <>
      <Header user={user} />
      <Main user={user} />
    </>
  );
}
