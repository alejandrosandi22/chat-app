import { useState } from 'react';
import AtachedFile from './atachedFile';
import Emoji from './emoji';
import Media from './media';
import SendAudio from './sendAudio';
import SendMessage from './sendMessage';
import Sticker from './sticker';

export default function SendMessagePanel() {
  const [toggle, setToggle] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className='send-message-panel'>
        {isLoading && <div className='send-message-panel-loader'></div>}
        <section className='send-message-wrapper'>
          <ul className='send-message-list'>
            <li className='send-message-list-item'>
              <button
                className='send-message-list-item-button'
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? (
                  <i className='fal fa-times send-message-list-item-icon' />
                ) : (
                  <i className='fal fa-bars send-message-list-item-icon' />
                )}
              </button>
              <ul className='send-message-panel-options'>
                <li className='send-message-panel-options-item'>
                  <AtachedFile
                    setIsLoading={setIsLoading}
                    setProgress={setProgress}
                  />
                </li>
                <li className='send-message-panel-options-item'>
                  <Media
                    setIsLoading={setIsLoading}
                    setProgress={setProgress}
                  />
                </li>
                <li className='send-message-panel-options-item'>
                  <Emoji setMessage={setMessage} />
                </li>
                <li className='send-message-panel-options-item'>
                  <Sticker />
                </li>
                <li className='send-message-panel-options-item'>
                  <SendAudio
                    setIsLoading={setIsLoading}
                    setProgress={setProgress}
                  />
                </li>
              </ul>
            </li>
          </ul>
          <SendMessage message={message} setMessage={setMessage} />
        </section>
      </div>
      <style jsx>{`
        .send-message-panel {
          background: var(--background);
          height: 100%;
          .send-message-panel-loader {
            position: relative;
            width: 90%;
            margin: 0 auto;
            height: 5px;
            background: var(--secondary-font-color);
            &::before {
              content: '';
              position: absolute;
              width: ${progress}%;
              height: 100%;
              background: var(--secondary);
            }
          }
          .send-message-wrapper {
            position: relative;
            width: 90%;
            height: 80%;
            background: var(--primary);
            border-radius: 15px;
            display: flex;
            margin: 10px auto;
            padding: 0 20px;
            .send-message-list {
              display: flex;
              align-items: center;
              list-style: none;
              .send-message-list-item-button {
                display: none;
              }
              .send-message-panel-options {
                list-style: none;
                display: flex;
                height: 100%;
                .send-message-panel-options-item {
                  position: relative;
                }
              }
            }
          }
        }

        @media (max-width: 768px) {
          .send-message-panel {
            .send-message-wrapper {
              padding: 0 5px;
              .send-message-list {
                .send-message-list-item {
                  position: relative;
                  .send-message-list-item-button {
                    display: block;
                    position: relative;
                    z-index: 10;
                    background: var(--primary);
                    border: none;
                    width: 50px;
                    height: 50px;
                    .send-message-list-item-icon {
                      font-size: 1rem;
                      color: var(--primary-font-color);
                    }
                  }
                  .send-message-panel-options {
                    position: absolute;
                    list-style: none;
                    top: 0;
                    right: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .send-message-panel-options-item {
                      position: absolute;
                      transition: 0.5s;
                      &:nth-child(1) {
                        transform: translateY(${toggle ? '-60px' : '0'});
                      }
                      &:nth-child(2) {
                        transform: translateY(${toggle ? '-120px' : '0'});
                      }
                      &:nth-child(3) {
                        display: none;
                      }
                      &:nth-child(4) {
                        transform: translateY(${toggle ? '-180px' : '0'});
                      }
                      &:nth-child(5) {
                        transform: translateY(${toggle ? '-240px' : '0'});
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}</style>
    </>
  );
}
