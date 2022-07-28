import Image from 'next/image';
import { MessageType, UserType } from 'types';
import moment from 'moment';
import Audio from './audio';
import Video from './video';

export default function Message({
  message,
  contact,
}: {
  message: MessageType;
  contact: UserType;
}) {
  const user = {
    id: '1',
    avatar: 'https://deno.land/favicon.ico',
  };

  return (
    <>
      <div
        className={`message ${
          message.sender === user.id ? 'receiver' : 'sender'
        }`}
      >
        <div className='message-avatar-wrapper'>
          {message.sender === user.id ? (
            <Image
              className='message-avatar'
              layout='fill'
              src={user.avatar}
              alt='user avatar'
            />
          ) : (
            <Image
              className='message-avatar'
              layout='fill'
              src={contact.avatar}
              alt='contact avatar'
            />
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
              alt='message'
            />
          </div>
        )}
        {message.type === 'video' && (
          <div className='message-content message-video-content'>
            <Video src={message.content} />
          </div>
        )}
        {message.type === 'audio' && (
          <div className='message-content message-audio-content'>
            <Audio src={message.content} />
          </div>
        )}
        {message.type === 'file' && (
          <a href={message.content} download>
            {message.content}
          </a>
        )}
        {message.type === 'location' && (
          <a href={message.content}>{message.content}</a>
        )}
        {message.type === 'contact' && (
          <a href={message.content}>{message.content}</a>
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
          .message-avatar-wrapper {
            grid-area: avatar;
            position: relative;
            width: 50px;
            height: 50px;
            justify-self: center;
          }
          .message-content {
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
            background: var(--primary);
            border-radius: 0px 15px 15px 15px;
            .message-content-text {
              color: var(--primary-font-color);
            }
          }
          .message-image-content {
            position: relative;
            background: var(--primary);
            border-radius: 0 15px 15px 15px;
            .message-image {
              width: 100%;
            }
          }
          .message-video-content {
            background: var(--primary);
            border-radius: 0px 15px 15px 15px;
          }
          .message-audio-content {
            background: var(--primary);
            border-radius: 0px 15px 15px 15px;
          }
          .message-time-wrapper {
            display: flex;
            justify-content: flex-end;
          }
        }
      `}</style>
    </>
  );
}
