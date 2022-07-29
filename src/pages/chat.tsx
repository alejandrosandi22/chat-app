import AppLayout from 'common/appLayout';
import ContactProfile from 'components/contactProfile';
import Nav from 'components/nav';
import Message from 'components/message';
import { useEffect, useRef, useState } from 'react';
import { useFetch } from 'hooks';
import { MessageType } from 'types';
import moment from 'moment';
import ContactCard from 'components/contactCard';
import Search from 'components/search';
import SendMessage from 'components/sendMessage';
import EmojiPicker from 'components/emojiPicker';

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
  const [text, setText] = useState<string>('');
  const [openEmojis, setOpenEmojis] = useState<boolean>(false);
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

  const xyz = (
    <ContactCard
      contact={contact}
      lastMessage={messages?.at(-1)?.content}
      lastMessageDate={messages?.at(-1)?.date}
    />
  );

  return (
    <>
      <AppLayout title='Chat App | Messages'>
        <div
          className={`chat-container ${toggle ? 'chat-container-active' : ''}`}
        >
          <Nav />
          <div className='contacts-wrapper'>
            <div className='contacts-search-wrapper'>
              <Search />
            </div>
            <div className='contacts-list'>
              <ContactCard
                contact={contact}
                lastMessage={messages?.at(-1)?.content}
                lastMessageDate={messages?.at(-1)?.date}
              />
              {xyz}
              {xyz}
              {xyz}
              {xyz}
              {xyz}
              {xyz}
              {xyz}
              {xyz}
              {xyz}
              {xyz}
            </div>
          </div>
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
                        {moment(message.date).calendar(null, {
                          sameDay: '[Today]',
                          lastDay: '[Yesterday]',
                          lastWeek: 'll',
                          sameElse: 'll',
                        })}
                      </h3>
                    )}
                    <Message message={message} contact={contact} />
                  </div>
                );
              })}
            </main>
            <section className='chat-send-message'>
              <ul className='chat-send-message-list'>
                <li className='chat-send-message-list-item'>
                  <button className='chat-send-message-list-item-button'>
                    <i className='fal fa-paperclip' />
                  </button>
                </li>
                <li className='chat-send-message-list-item'>
                  <div
                    className={
                      openEmojis
                        ? 'chat-emojis-wrapper-active'
                        : 'chat-emojis-wrapper'
                    }
                  >
                    <EmojiPicker setText={setText} />
                  </div>
                  <button
                    onClick={() => setOpenEmojis(!openEmojis)}
                    className='chat-send-message-list-item-button'
                  >
                    {openEmojis ? (
                      <i className='fal fa-times-circle' />
                    ) : (
                      <i className='fal fa-smile' />
                    )}
                  </button>
                </li>
                <li className='chat-send-message-list-item'>
                  <button className='chat-send-message-list-item-button'>
                    <i className='fal fa-camera' />
                  </button>
                </li>
                <li className='chat-send-message-list-item'>
                  <button className='chat-send-message-list-item-button'>
                    <i className='far fa-sticky-note' />
                  </button>
                </li>
                <li className='chat-send-message-list-item'>
                  <button className='chat-send-message-list-item-button chat-send-message-list-item-audio'>
                    <i className='fal fa-microphone' />
                  </button>
                </li>
              </ul>
              <SendMessage text={text} setText={setText} />
            </section>
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
          transition: 0.5s;
          .contacts-wrapper {
            width: 25%;
            height: 100%;
            background: var(--background);
            transition: 0.5s;
            .contacts-search-wrapper {
              width: 100%;
              height: 70px;
              background: var(--primary);
            }
            .contacts-list {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px 0;
              width: 100%;
              height: calc(100% - 70px);
              overflow-y: auto;
              gap: 10px;
            }
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
                font-size: 16px;
                padding: 10px 0;
                margin: 30px auto;
                border-radius: 20px;
              }
            }
            .chat-send-message {
              width: 90%;
              height: 60px;
              background: var(--primary);
              border-radius: 15px;
              display: flex;
              margin: 10px auto;
              padding: 0 20px;
              .chat-send-message-list {
                display: flex;
                align-items: center;
                list-style: none;
                .chat-send-message-list-item {
                  position: relative;
                  .chat-emojis-wrapper,
                  .chat-emojis-wrapper-active {
                    position: absolute;
                    bottom: 100%;
                    left: 0;
                    width: 300px;
                    height: 400px;
                    border-radius: 15px;
                    background: var(--background);
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    z-index: 1;
                    transform-origin: left bottom;
                    animation: hidden 0.15s both;
                  }
                  .chat-emojis-wrapper-active {
                    animation: show 0.15s both;
                  }
                  .chat-send-message-list-item-button {
                    width: 50px;
                    height: 50px;
                    background: transparent;
                    border: none;
                    outline: none;
                    color: var(--secondary-font-color);
                    font-size: 1.5rem;
                    transition: 0.25s;
                    cursor: pointer;
                    &:hover {
                      color: var(--primary-font-color);
                    }
                  }
                }
              }
            }
          }
          .contact-profile-container {
            width: 0%;
            transition: 0.5s;
            background: var(--primary);
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
            width: 20%;
          }
        }

        @keyframes hidden {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
        @keyframes show {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
