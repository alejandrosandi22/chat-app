import { ToggleContactProfileContext } from 'context/toggleContactProfile';
import useGetCurrentUser from 'hooks/user/useGetCurrentUser';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { UserType } from 'types';

export default function CurrentContact({ contact }: { contact: UserType }) {
  const { toggle, handleToggle } = useContext(ToggleContactProfileContext);
  const [avatar, setAvatar] = useState<string>('/static/images/user.png');
  const { currentUser } = useGetCurrentUser();

  useEffect(() => {
    if (contact.show_profile_photo === 'public') setAvatar(contact.avatar);
    if (contact.show_profile_photo === 'only-contacts') {
      if (contact.contacts.includes(currentUser.id)) setAvatar(contact.avatar);
    }
  }, [contact]);

  return (
    <>
      <header className='chat-header'>
        <div className='chat-header-wrapper'>
          <div className='chat-header-avatar'>
            <Image src={avatar} layout='fill' alt='avatar' />
          </div>
          <h3 className='chat-header-name'>{contact.name}</h3>
        </div>
        <button
          onClick={handleToggle}
          className={`chat-header-toggle-button ${
            toggle ? 'chat-header-toggle-button-active' : ''
          }`}
        >
          <i className='fal fa-angle-double-left' />
        </button>
      </header>
      <style jsx>{`
        .chat-header {
          width: 100%;
          height: 70px;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: space-between;
          .chat-header-wrapper {
            display: flex;
            align-items: center;
            .chat-header-avatar {
              position: relative;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              overflow: hidden;
              margin: 0 20px;
            }
            .chat-header-name {
              font-size: 1.4rem;
              color: var(--primary-font-color);
            }
          }
          .chat-header-toggle-button {
            width: 50px;
            height: 50px;
            background: transparent;
            border: none;
            outline: none;
            color: var(--secondary-font-color);
            font-size: 1.5rem;
            transition: 0.25s;
            cursor: pointer;
            &:hover {
              color: var(--primary-font-color);
            }
          }
          .chat-header-toggle-button-active {
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </>
  );
}
