import useSendRequest from 'hooks/requests/useSendRequest';
import { UserType } from 'types';
import Header from './header';
import Main from './main';

interface ProfileProps {
  user: UserType;
  currentUser: UserType;
}

export default function Profile({ user, currentUser }: ProfileProps) {
  const { sendRequest } = useSendRequest(user.id, currentUser.name);

  return (
    <>
      <div>
        <Header user={user} />
        <Main user={user} />
        <section>
          {currentUser.id !== user.id &&
          !user.contacts.includes(currentUser.id) ? (
            <button onClick={() => sendRequest()}>send Request</button>
          ) : null}
        </section>
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
