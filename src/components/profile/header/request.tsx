import useSendRequest from 'hooks/requests/useSendRequest';

export default function Request({ id, name }: { id: number; name: string }) {
  const { sendRequest } = useSendRequest(id, name);

  return (
    <>
      <div>
        <button onClick={() => sendRequest()}>Send contact request</button>
      </div>
      <style jsx>{`
        div {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            padding: 10px 12px;
            font-size: 16px;
            border: 1px solid var(--secondary);
            background: transparent;
            color: var(--primary-font-color);
            &:hover {
              background: var(--secondary);
            }
          }
        }
      `}</style>
    </>
  );
}
