import { uploadFile } from '../../../firebase/client';
import { useAppSelector } from 'hooks';
import useSendMessage from 'hooks/messages/useSendMessage';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface MediaProps {
  setIsLoading: (isLoading: boolean) => void;
  setProgress: (progress: number) => void;
}

export default function Media({ setIsLoading, setProgress }: MediaProps) {
  const [media, setMedia] = useState<boolean>(false);
  const { contact } = useAppSelector((state) => state.selectContact);
  const { sendMessage } = useSendMessage();

  const handleSendImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setIsLoading(true);
    setMedia(false);

    const file: File = e.target.files[0];

    if (file.size > 1000000) {
      alert('File is too big');
      return;
    }

    await uploadFile({
      setProgress,
      file,
      fileName: `/images/${uuidv4()}`,
    }).then((res) => {
      sendMessage({
        onCompleted: () => {
          setIsLoading(false);
        },
        variables: {
          receiver: contact?.id,
          content: res?.url,
          type: 'image',
        },
      });
    });
  };

  const handleSendVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setIsLoading(true);
    setMedia(false);

    const file: File = e.target.files[0];

    if (file.size > 6000000) {
      alert('File is too big');
      return;
    }

    await uploadFile({
      setProgress,
      file,
      fileName: `/video/${uuidv4()}`,
    }).then((res) => {
      sendMessage({
        onCompleted: () => {
          setIsLoading(false);
        },
        variables: {
          receiver: contact?.id,
          content: res?.url,
          type: 'video',
        },
      });
    });
  };

  return (
    <>
      <div className='media-list-item'>
        <button
          className='media-list-item-toggle'
          onClick={() => setMedia(!media)}
        >
          <i className='fal fa-photo-video' />
        </button>
        {media && (
          <ul className='media-options-list'>
            <li className='media-options-list-item'>
              <button className='media-options-list-item-button'>
                <input
                  type='file'
                  id='images'
                  hidden
                  accept='image/*'
                  onChange={handleSendImage}
                />
                <label htmlFor='images'>
                  <i className='fal fa-camera' />
                </label>
              </button>
              <button className='media-options-list-item-button'>
                <input
                  type='file'
                  id='video'
                  hidden
                  accept='video/*'
                  onChange={handleSendVideo}
                />
                <label htmlFor='video'>
                  <i className='fal fa-video' />
                </label>
              </button>
            </li>
          </ul>
        )}
      </div>
      <style jsx>{`
        .media-list-item {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          transition: 0.25s;
          .media-list-item-toggle {
            background: transparent;
            border: none;
            width: 100%;
            height: 100%;
            cursor: pointer;
            &:hover {
              i {
                color: var(--primary-font-color);
              }
            }
            i {
              font-size: 22px;

              color: var(--secondary-font-color);
            }
          }
          .media-options-list {
            position: absolute;
            top: -100%;
            width: 100px;
            height: 35px;
            background: var(--primary);
            list-style: none;
            border-radius: 8px;
            padding: 5px;
            &::before {
              content: '';
              position: absolute;
              background: var(--primary);
              width: 80%;
              height: 10px;
              top: 100%;
              right: 0;
              left: 0;
              margin: 0 auto;
              -webkit-clip-path: polygon(0 0, 50% 100%, 100% 0);
              clip-path: polygon(0 0, 50% 100%, 100% 0);
            }
            .media-options-list-item {
              width: 100%;
              height: 100%;
              display: flex;
              .media-options-list-item-button {
                width: 50%;
                height: 100%;
                background: transparent;
                border: none;
                cursor: pointer;
                &:hover {
                  i {
                    color: var(--primary-font-color);
                  }
                }
                i {
                  cursor: pointer;
                  font-size: 20px;
                  color: var(--secondary-font-color);
                }
              }
            }
          }
        }
      `}</style>
    </>
  );
}
