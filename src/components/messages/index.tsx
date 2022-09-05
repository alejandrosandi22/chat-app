import { useAppSelector } from 'hooks';
import Link from 'next/link';
import CurrentContact from './currentContact';
import MessagesView from './messagesView';
import SendMessagePanel from './sendMessagePanel';

export default function Messages() {
  const { contact } = useAppSelector((state) => state.selectContact);

  if (!contact)
    return (
      <>
        <header></header>
        <div>
          <Link href='/explore'>
            <a>Explore more contacts</a>
          </Link>
        </div>
        <style jsx>{`
          header {
            width: 100%;
            height: 70px;
            background: var(--primary);
          }
          div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: calc(100% - 70px);
            background: var(--background);
            overflow: hidden;
            a {
              min-width: 186px;
              background: none;
              border: 1px solid var(--primary-font-color);
              color: var(--primary-font-color);
              text-decoration: none;
              padding: 12px;
              border-radius: 5px;
              transition: 0.25s;
              &:hover {
                background: var(--primary-font-color);
                color: var(--background);
              }
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

  return (
    <>
      <div className='messages-container'>
        <CurrentContact contact={contact} />
        <div className='messages-view-wrapper'>
          <MessagesView />
        </div>
        <div className='send-messages-panel-wrapper'>
          <SendMessagePanel />
        </div>
      </div>
      <style jsx>{`
        .messages-container {
          background: var(--background);
          width: 100%;
          height: 100%;
          .messages-view-wrapper {
            height: calc(100% - 140px);
          }
          .send-messages-panel-wrapper {
            height: 70px;
          }
        }
      `}</style>
    </>
  );
}
