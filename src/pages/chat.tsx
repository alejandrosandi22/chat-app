import AppLayout from 'common/appLayout';
import ContactProfile from 'components/contactProfile';
import Nav from 'components/nav';
import Message from 'components/message';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const chatRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, []);

  return (
    <>
      <AppLayout title='Chat App | Messages'>
        <div className='chat-container'>
          <Nav />
          <div className='contacts-wrapper'></div>
          <div className='chat-wrapper'>
            <header className='chat-header'></header>
            <main ref={chatRef} className='chat-messages-wrapper'>
              <h3 className='chat-message-date'>Today</h3>
              <Message
                message={{
                  id: '1',
                  sender: '1',
                  receiver: '2',
                  type: 'text',
                  content: 'Hello',
                  created_at: '2022-07-20 15:35:01.48249',
                }}
                contact={{
                  id: 2,
                  name: 'John Doe',
                  email: 'jondoe@gmail.com',
                  username: 'johndoe',
                  avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
                }}
              />
              <Message
                message={{
                  id: '1',
                  sender: '2',
                  receiver: '1',
                  type: 'text',
                  content: 'Hello',
                  created_at: '2022-07-20 15:40:01.48249',
                }}
                contact={{
                  id: 2,
                  name: 'John Doe',
                  email: 'jondoe@gmail.com',
                  username: 'johndoe',
                  avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
                }}
              />

              <Message
                message={{
                  id: '1',
                  sender: '2',
                  receiver: '1',
                  type: 'sticker',
                  content:
                    'https://i.pinimg.com/originals/20/6c/7e/206c7e5bf9d5d1a97a51cb2fbe174050.png',
                  created_at: '2022-07-20 15:41:01.48249',
                }}
                contact={{
                  id: 2,
                  name: 'John Doe',
                  email: 'jondoe@gmail.com',
                  username: 'johndoe',
                  avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
                }}
              />
              <Message
                message={{
                  id: '1',
                  sender: '1',
                  receiver: '2',
                  type: 'video',
                  content:
                    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                  created_at: '2022-07-20 15:50:01.48249',
                }}
                contact={{
                  id: 2,
                  name: 'John Doe',
                  email: 'jondoe@gmail.com',
                  username: 'johndoe',
                  avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
                }}
              />
              <Message
                message={{
                  id: '1',
                  sender: '2',
                  receiver: '1',
                  type: 'image',
                  content: '/office_illustration.png',
                  created_at: '2022-07-20 16:00:01.48249',
                }}
                contact={{
                  id: 2,
                  name: 'John Doe',
                  email: 'jondoe@gmail.com',
                  username: 'johndoe',
                  avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
                }}
              />
              <Message
                message={{
                  id: '1',
                  sender: '2',
                  receiver: '1',
                  type: 'audio',
                  content:
                    'http://www.sonidosmp3gratis.com/sounds/kendo-kadoni-ringtones-prueba-sonido-de.mp3',
                  created_at: '2022-07-20 16:01:01.48249',
                }}
                contact={{
                  id: 2,
                  name: 'John Doe',
                  email: 'jondoe@gmail.com',
                  username: 'johndoe',
                  avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
                }}
              />
              <Message
                message={{
                  id: '1',
                  sender: '1',
                  receiver: '2',
                  type: 'audio',
                  content:
                    'http://www.sonidosmp3gratis.com/sounds/kendo-kadoni-ringtones-prueba-sonido-de.mp3',
                  created_at: '2022-07-20 16:01:01.48249',
                }}
                contact={{
                  id: 2,
                  name: 'John Doe',
                  email: 'jondoe@gmail.com',
                  username: 'johndoe',
                  avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
                }}
              />
            </main>
            <section className='chat-send-message'></section>
          </div>
          <ContactProfile />
        </div>
      </AppLayout>
      <style jsx>{`
        .chat-container {
          position: absolute;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 5% 25% 70% 0%;
          grid-template-rows: 1fr;
          .contacts-wrapper {
            background: var(--background);
          }
          .chat-wrapper {
            background: var(--background);
            .chat-header {
              width: 100%;
              height: 70px;
              background: var(--primary);
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
              .chat-message-date {
                width: 95%;
                background: var(--secondary);
                color: var(--primary-font-color);
                text-align: center;
                font-weight: 400;
                padding: 10px 0;
                margin: 0 auto 30px auto;
                border-radius: 20px;
              }
            }
            .chat-send-message {
              width: 100%;
              height: 70px;
              background: var(--primary);
            }
          }
        }
      `}</style>
    </>
  );
}
