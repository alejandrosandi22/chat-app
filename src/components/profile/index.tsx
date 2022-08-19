import { UserType } from 'types';
import Header from './header';
import Main from './main';

interface ProfileProps {
  user: UserType;
  currentUser: UserType;
}

export default function Profile({ currentUser, user }: ProfileProps) {
  return (
    <>
      <div>
        <Header currentUser={currentUser} user={user} />
        <Main currentUser={currentUser} user={user} />
      </div>
      <style jsx>{`
        div {
          position: relative;
          width: 100%;
          height: 100%;
          background: var(--background);
          overflow-y: auto;
        }
      `}</style>
    </>
  );
}
