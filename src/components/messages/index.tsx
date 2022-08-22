import { useAppSelector } from 'hooks';
import CurrentContact from './currentContact';
import MessagesView from './messagesView';
import SendMessagePanel from './sendMessagePanel';

export default function Messages() {
  const { contact } = useAppSelector((state) => state.selectContact);

  if (!contact) {
    return (
      <>
        <section>
          <header></header>
          <main>
            <h1>Select a contact</h1>
          </main>
        </section>
        <style jsx>
          {`
            section {
              height: 100%;
              header {
                width: 100%;
                height: 70px;
                background: var(--primary);
              }
              main {
                width: 100%;
                height: calc(100% - 70px);
                display: grid;
                place-items: center;
                h1 {
                  font-size: 2rem;
                  font-weight: normal;
                  color: var(--primary-font-color);
                }
              }
            }
          `}
        </style>
      </>
    );
  }

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
