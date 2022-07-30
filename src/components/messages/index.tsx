import CurrentContact from './currentContact';
import MessagesView from './messagesView';
import SendMessagePanel from './sendMessagePanel';

export default function Messages() {
  return (
    <>
      <div className='messages-container'>
        <CurrentContact />
        <div className='messages-wrapper'>
          <MessagesView />
        </div>
        <SendMessagePanel />
      </div>
      <style jsx>{`
        .messages-container {
          background: var(--background);
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
}
