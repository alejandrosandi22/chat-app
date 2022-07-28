import AppLayout from 'common/appLayout';
import ContactProfile from 'components/contactProfile';
import Nav from 'components/nav';
import Message from 'components/message';
import { useEffect, useRef, useState } from 'react';
import { useFetch } from 'hooks';
import { MessageType } from 'types';
import moment from 'moment';

const contact = {
  id: 2,
  name: 'John Doe',
  email: 'jondoe@gmail.com',
  username: 'johndoe',
  avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
};

export default function Chat() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const chatRef = useRef<HTMLElement>(null);

  const handleToggle = () => setToggle(!toggle);

  const { data, loading, error } = useFetch<MessageType[]>(
    `http://localhost:3000/api/test/${contact.id}?limit=25&offset=5`
  );

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  if (loading || error || !messages) return null;

  return (
    <>
      <AppLayout title='Chat App | Messages'>
        <div
          className={`chat-container ${toggle ? 'chat-container-active' : ''}`}
        >
          <Nav />
          <div className='contacts-wrapper'></div>
          <div className='chat-wrapper'>
            <header className='chat-header'>
              <div></div>
              <button
                onClick={handleToggle}
                className={`chat-header-toggle-button ${
                  toggle ? 'chat-header-toggle-button-active' : ''
                }`}
              >
                <i className='fal fa-angle-double-left' />
              </button>
            </header>
            <main ref={chatRef} className='chat-messages-wrapper'>
              {messages.map((message: MessageType) => {
                return (
                  <div key={message.id} className='chat-message-list-wrapper'>
                    {message.date && (
                      <h3 className='chat-message-date'>
                        {moment(message.date).format('L') ===
                        moment().format('L')
                          ? 'Today'
                          : moment(message.date).format('ll')}
                      </h3>
                    )}
                    <Message message={message} contact={contact} />
                  </div>
                );
              })}
            </main>
            <section className='chat-send-message'></section>
          </div>
          <div className='contact-profile-container'>
            <ContactProfile />
          </div>
        </div>
      </AppLayout>
      <style jsx>{`
        .chat-container {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          background: blue;
          transition: 0.5s;
          .contacts-wrapper {
            width: 25%;
            height: 100%;
            background: var(--background);
            transition: 0.5s;
          }
          .chat-wrapper {
            width: 70%;
            background: var(--background);
            transition: 0.5s;

            .chat-header {
              width: 100%;
              height: 70px;
              background: var(--primary);
              display: flex;
              align-items: center;
              justify-content: space-between;
              .chat-header-toggle-button {
                width: 50px;
                height: 50px;
                background: transparent;
                border: none;
                outline: none;
                color: var(--secondary-font-color);
                font-size: 1.5rem;
                transition: 0.25s;
                &:hover {
                  color: var(--primary-font-color);
                }
              }
              .chat-header-toggle-button-active {
                transform: rotateY(180deg);
              }
            }
            .chat-messages-wrapper {
              display: flex;
              flex-direction: column;
              padding: 20px 0;
              width: 100%;
              height: calc(100vh - 150px);
              margin: 0 0 10px 0;
              overflow-y: auto;
              overflow-x: hidden;
              .chat-message-list-wrapper {
                width: 100%;
                display: flex;
                flex-direction: column;
              }
              .chat-message-date {
                width: 180px;
                background: var(--secondary);
                color: var(--primary-font-color);
                text-align: center;
                font-weight: 400;
                padding: 10px 0;
                margin: 30px auto;
                border-radius: 20px;
              }
            }
            .chat-send-message {
              width: 100%;
              height: 70px;
              background: var(--primary);
            }
          }
          .contact-profile-container {
            width: 0%;
            transition: 0.5s;
          }
        }
        .chat-container-active {
          transition: 0.5s;
          .contacts-wrapper {
            width: 15%;
          }
          .chat-wrapper {
            width: 60%;
          }
          .contact-profile-container {
            width: 15%;
          }
        }
      `}</style>
    </>
  );
}
