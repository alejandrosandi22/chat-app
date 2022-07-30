import React from 'react';

export default function Button({
  play,
  isPlaying,
}: {
  play: () => void;
  isPlaying: boolean;
}) {
  return (
    <>
      <div className='audio-button-wrapper'>
        <button
          onClick={play}
          className={`${
            isPlaying ? 'fas fa-pause' : 'fas fa-play'
          } audio-button`}
        ></button>
      </div>
      <style jsx>{`
        .audio-button-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          .audio-button {
            background: none;
            border: none;
            outline: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: var(--primary-font-color);
            &:hover {
              color: var(--secondary-font-color);
            }
          }
        }
      `}</style>
    </>
  );
}
