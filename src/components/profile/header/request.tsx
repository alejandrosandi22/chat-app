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
            pointer-events: all;
            background: var(--background);
            color: var(--primary-font-color);
            border: 1px solid var(--primary-font-color);
            font-size: 16px;
            border-radius: 5px;
            padding: 10px 12px;
            font-weight: normal;
            &:hover {
              color: var(--background);
              background: var(--primary-font-color);
            }
          }
        }
      `}</style>
    </>
  );
}
