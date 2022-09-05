import { useEffect, useRef } from 'react';
import { MessageType } from 'types';
import Message from './message';
import moment from 'moment';
import { useGetMessages } from 'hooks/messages/useGetMessages';

export function MessagesList({ messages }: { messages: MessageType[] }) {
  return (
    <>
      {messages.length > 0 &&
        messages.map((message: MessageType) => {
          return (
            <div key={message.id} className='chat-message-list-wrapper'>
              {message?.date && (
                <h3 className='chat-message-date'>
                  {moment(message.date).calendar(null, {
                    sameDay: '[Today]',
                    lastDay: '[Yesterday]',
                    lastWeek: 'll',
                    sameElse: 'll',
                  })}
                </h3>
              )}
              <Message message={message} />
            </div>
          );
        })}
      <style jsx>{`
        div {
          width: 100%;
          display: flex;
          flex-direction: column;
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

export default function MessagesView() {
  const chatRef = useRef<HTMLElement>(null);
  const { messages, loadMore, loadMoreMessages, loadingMore, loading } =
    useGetMessages();

  useEffect(() => {
    if (!chatRef.current) return;

    if (!loadMore) {
      chatRef.current.scrollTo({
        left: 0,
        top: chatRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <>
      <main ref={chatRef} className='chat-messages-wrapper'>
        <div className='chat-loading-more-wrapper'>
          {loadingMore || loading ? (
            <i className='fal fa-spinner-third' />
          ) : (
            <>
              {messages.length > 9 && (
                <button onClick={loadMoreMessages}>Load More</button>
              )}
            </>
          )}
        </div>
        <MessagesList messages={messages} />
      </main>
      <style jsx>{`
        .chat-messages-wrapper {
          padding: 0 0 20px 0;
          width: 100%;
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          background: var(--background);
          .chat-loading-more-wrapper {
            width: 100%;
            max-height: 70px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              font-size: 1.5rem;
              color: var(--primary-font-color);
              animation: spin 0.5s infinite;
            }
            button {
              background: transparent;
              border: 1px solid var(--primary-font-color);
              padding: 8px 12px;
              text-decoration: none;
              border-radius: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: var(--primary-font-color);
              font-size: 1rem;
              transition: 0.25s;
              &:hover {
                background: var(--primary-font-color);
                color: var(--background);
              }
            }
          }
        }

        @media (max-width: 768px) {
          .chat-messages-wrapper {
            height: 100%;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
