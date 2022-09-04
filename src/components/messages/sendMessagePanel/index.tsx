import { useAppSelector } from 'hooks';
import useSendMessage from 'hooks/messages/useSendMessage';
import useGetCurrentUser from 'hooks/user/useGetCurrentUser';
import { useState } from 'react';
import { uploadFile } from '../../../firebase/client';
import Emoji from './emoji';
import Media from './media';
import SendMessage from './sendMessage';

export default function SendMessagePanel() {
  const [progress, setProgress] = useState<number>();
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sendMessage } = useSendMessage();
  const { contact } = useAppSelector((state) => state.selectContact);
  const { currentUser } = useGetCurrentUser();

  const handleSendAttachedFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    setIsLoading(true);

    const file: File = e.target.files[0];

    if (file.size > 1000000) {
      alert('File is too big');
      return;
    }

    await uploadFile({
      setProgress,
      file,
      fileName: `/file/${currentUser.username}-${file.name}`,
    }).then((res) => {
      sendMessage({
        onCompleted: () => {
          setIsLoading(false);
        },
        variables: {
          receiver: contact?.id,
          content: res?.url,
          filename: file.name,
          type: 'file',
        },
      });
    });
  };

  const handleSendAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setIsLoading(true);

    const file: File = e.target.files[0];

    if (file.size > 1000000) {
      alert('File is too big');
      return;
    }

    await uploadFile({
      setProgress,
      file,
      fileName: `/audio/${currentUser.username}-${file.name}`,
    }).then((res) => {
      sendMessage({
        onCompleted: () => {
          setIsLoading(false);
        },
        variables: {
          receiver: contact?.id,
          content: res?.url,
          type: 'audio',
        },
      });
    });
  };

  return (
    <>
      <div className='send-message-panel'>
        {isLoading && <div className='send-message-panel-loader'></div>}
        <section className='send-message-wrapper'>
          <ul className='send-message-list'>
            <li className='send-message-list-item'>
              <button className='send-message-list-item-button'>
                <input
                  type='file'
                  id='attach'
                  hidden
                  onChange={handleSendAttachedFile}
                />
                <label htmlFor='attach'>
                  <i className='fal fa-paperclip' />
                </label>
              </button>
            </li>
            <li className='send-message-list-item'>
              <div></div>
            </li>
            <Media setIsLoading={setIsLoading} setProgress={setProgress} />
            <Emoji setMessage={setMessage} />
            <li className='send-message-list-item'>
              <button className='send-message-list-item-button'>
                <i className='far fa-sticky-note' />
              </button>
            </li>
            <li className='send-message-list-item'>
              <button className='send-message-list-item-button send-message-list-item-audio'>
                <input
                  type='file'
                  id='audio'
                  hidden
                  accept='audio/*'
                  onChange={handleSendAudio}
                />
                <label htmlFor='audio'>
                  <i className='fal fa-microphone' />
                </label>
              </button>
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
                  position: relative;
                  width: 50px;
                  height: 50px;
                  background: transparent;
                  border: none;
                  outline: none;
                  color: var(--secondary-font-color);
                  font-size: 22px;
                  transition: 0.25s;
                  i {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                  }
                  &:hover {
                    color: var(--primary-font-color);
                  }
                  .send-message-list-item-options-wrapper {
                    position: absolute;
                    top: -100%;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    width: 100px;
                    height: 30px;
                    padding: 2px 10px;
                    border-radius: 5px;
                    background: var(--primary);
                    .send-message-list-item-options {
                      width: 50%;
                      height: 100%;
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
