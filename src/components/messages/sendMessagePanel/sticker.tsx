export default function Sticker() {
  return (
    <>
      <li className='send-message-list-item'>
        <button className='send-message-list-item-button'>
          <i className='far fa-sticky-note' />
        </button>
      </li>
      <style jsx>{`
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
      `}</style>
    </>
  );
}
