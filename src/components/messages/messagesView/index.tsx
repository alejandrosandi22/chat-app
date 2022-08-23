import { useEffect, useRef, useState } from 'react';
import { MessageType } from 'types';
import Message from './message';
import moment from 'moment';
import { useGetMessages } from 'hooks/useGetMessages';
import { useAppSelector } from 'hooks';

export default function MessagesView() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const chatRef = useRef<HTMLElement>(null);
  const { contact } = useAppSelector((state) => state.selectContact);

  const { data, loading } = useGetMessages(contact ? contact.id : 0);

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    if (data) setMessages(data);
  }, [data]);

  if (loading || !messages || !contact) return null;

  return (
    <>
      <main ref={chatRef} className='chat-messages-wrapper'>
        {messages.length > 0 &&
          messages.map((message: MessageType) => {
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
      <style jsx>{`
        .chat-messages-wrapper {
          display: flex;
          flex-direction: column;
          padding: 20px 0;
          width: 100%;
          height: calc(100vh - 150px);
          margin: 0 0 10px 0;
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--background);
          .chat-message-list-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .chat-message-date {
            width: 180px;
            background: var(--primary);
            color: var(--primary-font-color);
            text-align: center;
            font-weight: 400;
            font-size: 16px;
            padding: 10px 0;
            margin: 30px auto;
            border-radius: 20px;
          }
        }
      `}</style>
    </>
  );
}
