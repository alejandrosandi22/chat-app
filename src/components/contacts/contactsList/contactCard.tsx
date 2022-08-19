import useErrorImage from 'hooks/useErrorImage';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserType } from 'types';

interface ContactCardProps {
  contact: UserType;
  currentUser: UserType;
}

export default function ContactCard({
  contact,
  currentUser,
}: ContactCardProps) {
  const { imageOnError } = useErrorImage();

  const [avatar, setAvatar] = useState<string | undefined>();

  useEffect(() => {
    if (contact.show_profile_photo === 'only-contacts') {
      if (!contact.contacts.includes(currentUser.id))
        setAvatar('static/images/user.png');
    }

    if (contact.show_profile_photo === 'just-me') {
      if (contact.id !== currentUser.id) setAvatar('static/images/user.png');
    }
  }, [contact]);

  return (
    <>
      <div className='contact-card'>
        <Link href={`/[username]`} as={`/${contact.username}`}>
          <a className='contact-card-avatar'>
            <img
              src={avatar ? avatar : contact.avatar}
              alt='avatar'
              onError={imageOnError}
            />
          </a>
        </Link>
        <div className='contact-card-info'>
          <div className='contact-card-info-name'>{contact.name}</div>
          <div className='contact-card-info-last-message'>
            {contact.lastMessage?.type !== 'text'
              ? contact.lastMessage?.type
              : contact.lastMessage?.content}
          </div>
        </div>
        <div className='contact-card-chat'>
          <div className='contact-card-chat-time'>
            {moment(contact.lastMessage?.created_at).calendar(null, {
              sameDay: 'h:mm A',
              lastDay: '[Yesterday]',
              lastWeek: 'l',
              sameElse: 'l',
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .contact-card {
          padding: 10px;
          display: flex;
          align-items: center;
          background: var(--primary);
          height: 60px;
          width: 95%;
          cursor: default;
          &:hover {
            background: var(--secondary);
            .contact-card-info {
              .contact-card-info-last-message {
                color: var(--primary-font-color);
              }
            }
            .contact-card-chat {
              color: var(--primary-font-color);
            }
          }
          .contact-card-avatar {
            position: relative;
            width: 40px;
            height: 40px;
            aspect-ratio: 1 / 1;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .contact-card-info {
            width: calc(100% - 110px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 5px;
            padding: 0 10px;
            overflow: hidden;
            .contact-card-info-name {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 16px;
              color: var(--primary-font-color);
            }
            .contact-card-info-last-message {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 12px;
              color: var(--secondary-font-color);
            }
          }
          .contact-card-chat {
            width: 70px;
            color: var(--secondary-font-color);
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
