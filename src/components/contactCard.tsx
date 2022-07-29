import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { UserType } from 'types';

interface ContactCardProps {
  contact: UserType;
  lastMessage?: string;
  lastMessageDate?: string;
}

export default function ContactCard({
  contact,
  lastMessage,
  lastMessageDate,
}: ContactCardProps) {
  return (
    <>
      <div className='contact-card'>
        <Link href={`/[username]`} as={`/${contact.username}`}>
          <a className='contact-card-avatar'>
            <Image src={contact.avatar} layout='fill' alt='avatar' />
          </a>
        </Link>
        <div className='contact-card-info'>
          <div className='contact-card-info-name'>{contact.name}</div>
          <div className='contact-card-info-last-message'>{lastMessage}</div>
        </div>
        <div className='contact-card-chat'>
          <div className='contact-card-chat-time'>
            {moment(lastMessageDate).format('h:mm A')}
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
          &:hover {
            background: var(--secondary);
          }
          .contact-card-avatar {
            position: relative;
            width: 40px;
            height: 40px;
            aspect-ratio: 1 / 1;
          }
          .contact-card-info {
            width: calc(100% - 100px);
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
            width: 60px;
            color: var(--secondary-font-color);
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
