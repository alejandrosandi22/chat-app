import { useAppSelector } from 'hooks';
import useSendMessage from 'hooks/messages/useSendMessage';
import { FormEvent } from 'react';

interface SendMessageProps {
  message: string;
  setMessage: (message: string) => void;
}

export default function SendMessage({ message, setMessage }: SendMessageProps) {
  const { sendMessage } = useSendMessage();
  const { contact } = useAppSelector((state) => state.selectContact);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage({
      onCompleted: () => {
        setMessage('');
      },
      variables: {
        receiver: contact?.id,
        content: message,
        type: 'text',
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type='text'
          id='search'
          name='search'
          placeholder='Search'
          autoComplete='off'
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
            cursor: pointer;
            &:hover {
              filter: brightness(0.8);
            }
            .send-message-icon {
              font-size: 16px;
              color: var(--primary-font-color);
            }
          }
          input {
            width: 90%;
            height: 75%;
            border: none;
            outline: none;
            border: 1px solid var(--secondary);
            border: none;
            border-radius: 15px;
            background: var(--background);
            color: var(--secondary-font-color);
            font-size: 1rem;
            padding: 0 50px 0 1rem;
            &::placeholder {
              color: var(--secondary-font-color);
            }
            &:focus,
            &:active,
            &:focus-within {
              border: 1px solid var(--secondary);
            }
          }
        }
      `}</style>
    </>
  );
}
