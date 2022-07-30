import { ToggleContactProfileContext } from 'context/toggleContactProfile';
import Image from 'next/image';
import { useContext } from 'react';

export default function CurrentContact() {
  const { toggle, handleToggle } = useContext(ToggleContactProfileContext);
  return (
    <>
      <header className='chat-header'>
        <div className='chat-header-wrapper'>
          <div className='chat-header-avatar'>
            <Image
              src='https://i.ibb.co/vv2yvRz/denon.png'
              layout='fill'
              alt='avatar'
            />
          </div>
          <h3 className='chat-header-name'>Denon</h3>
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
