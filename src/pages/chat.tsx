import { useContext, useState } from 'react';
import { ToggleContactProfileContext } from 'context/toggleContactProfile';
import AppLayout from 'common/appLayout';
import Nav from 'components/nav';
import Contacts from 'components/contacts';
import Messages from 'components/messages';
import ContactProfile from 'components/contactProfile';
import useAuth from 'hooks/auth/useAuth';
import Loading from 'components/loading';
import { UserType } from 'types';

export function ChatEvents({ currentUser }: { currentUser: UserType }) {
  const { toggle } = useContext(ToggleContactProfileContext);
  const [contactsToggle, setContactsToggle] = useState<boolean>(false);
  const handleContactsToggle = () => setContactsToggle(!contactsToggle);

  return (
    <>
      <div className='chat-container'>
        <Nav
          toggle={contactsToggle}
          handleToggle={handleContactsToggle}
          user={currentUser}
        />
        <div className='chat-contacts-wrapper'>
          <Contacts />
        </div>
        <div className='chat-messages-wrapper'>
          <Messages />
        </div>
        <div className='contact-profile-container'>
          <ContactProfile />
        </div>
      </div>

      <style jsx>{`
        .chat-container {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          transition: 0.5s;
          .chat-contacts-wrapper {
            width: ${!contactsToggle ? '25%' : '0'};
            transition: 0.5s;
          }
          .chat-messages-wrapper {
            width: ${!contactsToggle || toggle ? '70%' : '95%'};
            height: 100%;
            transition: 0.5s;
          }
          .contact-profile-container {
            width: ${toggle ? '25%' : '0%'};
            background: var(--primary);
            transition: 0.5s;
          }
        }
      `}</style>
    </>
  );
}

export default function Chat() {
  const { currentUser, loading } = useAuth();
  if (!currentUser || loading) return <Loading />;

  return (
    <AppLayout title='Chat App | Messages'>
      <ChatEvents currentUser={currentUser} />
    </AppLayout>
  );
}
