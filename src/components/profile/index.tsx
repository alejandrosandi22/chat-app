import { UserType } from 'types';
import Header from './header';
import Main from './main';

interface ProfileProps {
  user: UserType;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <>
      <div>
        <Header user={user} />
        <Main user={user} />
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
