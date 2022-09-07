import React from 'react';
import { MessageType } from 'types';
import moment from 'moment';
import Audio from './audio';
import Video from './video';
import useGetCurrentUser from 'hooks/user/useGetCurrentUser';
import { useAppSelector } from 'hooks';
import Avatar from 'components/avatar';

export default function Message({
  message,
  handleScroll,
}: {
  message: MessageType;
  handleScroll: () => void;
}) {
  const { contact } = useAppSelector((state) => state.selectContact);
  const { currentUser } = useGetCurrentUser();

  return (
    <>
      <div
        className={`message ${
          message.sender === currentUser.id ? 'receiver' : 'sender'
        }`}
      >
        <div className='message-avatar-wrapper'>
          {message.sender === currentUser.id ? (
            <Avatar user={currentUser} />
          ) : (
            <>{contact && <Avatar user={contact} />}</>
          )}
        </div>

        {message.type === 'text' && (
          <div className='message-content message-text-content'>
            <p className='message-content-text'>{message.content}</p>
          </div>
        )}
        {message.type === 'image' && (
          <div className='message-content message-image-content'>
            <img
              className='message-image'
              src={message.content}
              onLoad={() => handleScroll()}
              alt='message'
            />
          </div>
        )}
        {message.type === 'video' && (
          <div className='message-content message-video-content'>
            <Video src={message.content} handleScroll={handleScroll} />
          </div>
        )}
        {message.type === 'audio' && (
          <div className='message-content message-audio-content'>
            <Audio src={message.content} handleScroll={handleScroll} />
          </div>
        )}
        {message.type === 'file' && (
          <div className='message-content message-file-content'>
            <a href={message.content} download>
              <i className='fa fa-download' />
            </a>
          </div>
        )}
        {message.type === 'sticker' && (
          <div className='message-content message-sticker-content'>
            <img
              className='message-sticker'
              src={message.content}
              alt='sticker'
            />
          </div>
        )}
        <div className='message-time-wrapper'>
          <span className='message-time'>
            {moment(message.created_at).format('LT')}
          </span>
        </div>
      </div>
      <style jsx>{`
        .message {
          width: 45%;
          margin: 10px 0;
          gap: 10px;
          display: grid;
          animation: show 1s both;
          .message-avatar-wrapper {
            grid-area: avatar;
            position: relative;
            width: 50px;
            height: 50px;
            justify-self: center;
          }
          .message-content {
            position: relative;
            z-index: 0;
            grid-area: content;
            padding: 10px;
          }
          .message-video-content {
            .message-video {
              width: 100%;
            }
          }
          .message-time-wrapper {
            grid-area: time;
            .message-time {
              color: var(--primary-font-color);
            }
          }
        }
        .sender {
          align-self: flex-end;
          grid-template-columns: 80% 20%;
          grid-template-rows: minmax(min-content, auto) 20%;
          grid-template-areas:
            'content avatar'
            'time avatar';
          .message-text-content {
            background: var(--secondary);
            border-radius: 15px 0px 15px 15px;
            .message-content-text {
              color: var(--primary-font-color);
            }
          }
          .message-sticker-content {
            display: grid;
            place-items: center;
            .message-sticker {
              width: 200px;
              aspect-ratio: 1 / 1;
            }
          }
          .message-image-content {
            position: relative;
            background: var(--secondary);
            border-radius: 15px 0 15px 15px;
            .message-image {
              width: 100%;
            }
          }
          .message-video-content {
            background: var(--secondary);
            border-radius: 15px 0 15px 15px;
            width: 100%;
          }
          .message-audio-content {
            background: var(--secondary);
            border-radius: 15px 0 15px 15px;
          }
          .message-file-content {
            background: var(--secondary);
            border-radius: 15px 0 15px 15px;
          }
        }
        .receiver {
          grid-template-columns: 20% 80%;
          grid-template-rows: minmax(min-content, auto) 20%;
          grid-template-areas:
            'avatar content'
            'avatar time';
          .message-content {
            border-radius: 0px 15px 15px 15px;
          }
          .message-text-content {
            background: var(--third);
            border-radius: 0px 15px 15px 15px;
            .message-content-text {
              color: var(--primary-font-color);
            }
          }
          .message-image-content {
            position: relative;
            background: var(--third);
            border-radius: 0 15px 15px 15px;
            .message-image {
              width: 100%;
            }
          }
          .message-video-content {
            background: var(--third);
            border-radius: 0px 15px 15px 15px;
          }
          .message-audio-content {
            background: var(--third);
            border-radius: 0px 15px 15px 15px;
          }
          .message-time-wrapper {
            display: flex;
            justify-content: flex-end;
          }
        }

        @media (max-width: 768px) {
          .message {
            width: 90%;
          }
        }

        @keyframes show {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
