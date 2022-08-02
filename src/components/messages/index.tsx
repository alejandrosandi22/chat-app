import CurrentContact from './currentContact';
import MessagesView from './messagesView';
import SendMessagePanel from './sendMessagePanel';

export default function Messages() {
  return (
    <>
      <div className='messages-container'>
        <CurrentContact />
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
