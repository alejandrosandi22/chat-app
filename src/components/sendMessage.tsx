interface SendMessageProps {
  text: string;
  setText: (message: string) => void;
}

export default function SendMessage({ text, setText }: SendMessageProps) {
  return (
    <>
      <form>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type='text'
          id='search'
          name='search'
          placeholder='Search'
        />
        <button>
          <i className='fal fa-paper-plane send-message-icon' />
        </button>
      </form>
      <style jsx>{`
        form {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          button {
            margin: 0 20px;
            border: none;
            outline: none;
            background: var(--secondary);
            padding: 10px;
            border-radius: 50%;
            &:hover {
              background: var(--secondary-font-color);
            }
            .send-message-icon {
              font-size: 18px;
              color: var(--primary-font-color);
            }
          }
          input {
            width: 90%;
            height: 75%;
            border: none;
            outline: none;
            border: 1px solid var(--secondary);
            background: transparent;
            color: var(--secondary-font-color);
            font-size: 1rem;
            padding: 0 50px 0 1rem;
            &::placeholder {
              color: var(--secondary-font-color);
            }
            &:focus,
            &:active,
            &:focus-within {
              border: 1px solid var(--secondary-font-color);
            }
          }
        }
      `}</style>
    </>
  );
}
