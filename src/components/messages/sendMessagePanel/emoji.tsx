import { Dispatch, SetStateAction, useState } from 'react';
import EmojiPicker from './emojiPicker';

interface EmojiProps {
  setMessage: Dispatch<SetStateAction<string>>;
}

export default function Emoji({ setMessage }: EmojiProps) {
  const [openEmojisView, setOpenEmojisView] = useState<boolean>(false);
  const toggleEmojisView = () => setOpenEmojisView(!openEmojisView);

  return (
    <>
      <>
        <div
          className={
            openEmojisView ? 'emojis-wrapper-active' : 'emojis-wrapper'
          }
        >
          <EmojiPicker setMessage={setMessage} />
        </div>
        <button onClick={toggleEmojisView}>
          {openEmojisView ? (
            <i className='fal fa-times-circle' />
          ) : (
            <i className='fal fa-smile' />
          )}
        </button>
      </>
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
        button {
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
