import { useContext, useEffect, useState } from 'react';
import { ToggleContactProfileContext } from 'context/toggleContactProfile';
import AppLayout from 'common/appLayout';
import Nav from 'components/nav';
import Contacts from 'components/contacts';
import Messages from 'components/messages';
import ContactProfile from 'components/contactProfile';
import useAuth from 'hooks/auth/useAuth';
import Loading from 'components/loading';
import { UserType } from 'types';
import { useRouter } from 'next/router';

export function ChatEvents({ currentUser }: { currentUser: UserType }) {
  const { toggle } = useContext(ToggleContactProfileContext);
  const [contactsToggle, setContactsToggle] = useState<boolean>(false);
  const handleContactsToggle = () => setContactsToggle(!contactsToggle);

  return (
    <>
      <div className='chat-container'>
        <section className='chat-nav-wrapper'>
          <Nav
            toggle={contactsToggle}
            handleToggle={handleContactsToggle}
            user={currentUser}
          />
        </section>
        <section className='chat-main-wrapper'>
          <div className='chat-contacts-wrapper'>
            <Contacts />
          </div>
          <div className='chat-messages-wrapper'>
            <Messages />
          </div>
          <div className='contact-profile-container'>
            <ContactProfile />
          </div>
        </section>
      </div>

      <style jsx>{`
        .chat-container {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          overflow: hidden;
          transition: 0.5s;
          .chat-nav-wrapper {
            width: 5%;
            height: 100%;
          }
          .chat-main-wrapper {
            display: flex;
            width: 95%;
            height: 100%;
            .chat-contacts-wrapper {
              width: ${!contactsToggle ? '25%' : '0'};
              transition: 0.5s;
            }
            .chat-messages-wrapper {
              width: ${!contactsToggle || toggle ? '80%' : '100%'};
              height: 100%;
              transition: 0.5s;
            }
            .contact-profile-container {
              width: ${toggle ? '25%' : '0%'};
              background: var(--primary);
              transition: 0.5s;
            }
          }
        }

        @media (max-width: 768px) {
          .chat-container {
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: calc(100% - 70px) 70px;
            grid-template-areas:
              'main'
              'nav';
            .chat-nav-wrapper {
              grid-area: nav;
              width: 100%;
              height: 100%;
              min-height: 70px;
            }
            .chat-main-wrapper {
              grid-area: main;
              width: 100%;
              .chat-contacts-wrapper {
                width: ${!contactsToggle ? '0%' : '100%'};
              }
              .chat-messages-wrapper {
                width: ${!contactsToggle ? '100%' : '0%'};
              }
              .contact-profile-container {
                width: ${!toggle ? '0%' : '0%'};
              }
            }
          }
        }
      `}</style>
    </>
  );
}

export default function Chat() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  useEffect(() => {
    if (!currentUser) router.push('/signin');
  }, [currentUser]);

  if (!currentUser || loading) return <Loading />;

  return (
    <AppLayout title='Chat App | Messages'>
      <ChatEvents currentUser={currentUser} />
    </AppLayout>
  );
}
