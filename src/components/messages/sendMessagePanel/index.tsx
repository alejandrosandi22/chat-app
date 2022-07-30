import { useState } from 'react';
import EmojiPicker from './emojiPicker';
import SendMessage from './sendMessage';

export default function SendMessagePanel() {
  const [message, setMessage] = useState('');
  const [openEmojisView, setOpenEmojisView] = useState<boolean>(false);

  const toggleEmojisView = () => setOpenEmojisView(!openEmojisView);

  return (
    <>
      <div className='send-message-panel'>
        <section className='send-message-wrapper'>
          <ul className='send-message-list'>
            <li className='send-message-list-item'>
              <button className='send-message-list-item-button'>
                <i className='fal fa-paperclip' />
              </button>
            </li>
            <li className='send-message-list-item'>
              <div></div>
            </li>
            <li className='send-message-list-item'>
              <button className='send-message-list-item-button'>
                <i className='fal fa-camera' />
              </button>
            </li>
            <li className='send-message-list-item'>
              <div
                className={
                  openEmojisView ? 'emojis-wrapper-active' : 'emojis-wrapper'
                }
              >
                <EmojiPicker setMessage={setMessage} />
              </div>
              <button
                onClick={toggleEmojisView}
                className='send-message-list-item-button'
              >
                {openEmojisView ? (
                  <i className='fal fa-times-circle' />
                ) : (
                  <i className='fal fa-smile' />
                )}
              </button>
            </li>
            <li className='send-message-list-item'>
              <button className='send-message-list-item-button'>
                <i className='far fa-sticky-note' />
              </button>
            </li>
            <li className='send-message-list-item'>
              <button className='send-message-list-item-button send-message-list-item-audio'>
                <i className='fal fa-microphone' />
              </button>
            </li>
          </ul>
          <SendMessage message={message} setMessage={setMessage} />
        </section>
      </div>
      <style jsx>{`
        .emojis-wrapper,
        .emojis-wrapper-active {
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
        .emojis-wrapper-active {
          animation: show 0.15s both;
        }
        .send-message-panel {
          background: var(--background);
          .send-message-wrapper {
            width: 90%;
            height: 60px;
            background: var(--primary);
            border-radius: 15px;
            display: flex;
            margin: 10px auto;
            padding: 0 20px;
            .send-message-list {
              display: flex;
              align-items: center;
              list-style: none;
              .send-message-list-item {
                position: relative;
                .emojis-wrapper,
                .emojis-wrapper-active {
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
                .emojis-wrapper-active {
                  animation: show 0.15s both;
                }
                .send-message-list-item-button {
                  width: 50px;
                  height: 50px;
                  background: transparent;
                  border: none;
                  outline: none;
                  color: var(--secondary-font-color);
                  font-size: 22px;
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
