import useUpdateRequest from 'hooks/requests/useUpdateRequest';
import { RequestType } from 'types';

export default function ResponseRequest({ request }: { request: RequestType }) {
  const { updateResponse } = useUpdateRequest();

  return (
    <>
      <section>
        <button onClick={async () => await updateResponse(request, true)}>
          <i className='fal fa-check' />
        </button>
        <button onClick={async () => await updateResponse(request, false)}>
          <i className='fal fa-times' />
        </button>
      </section>
      <style jsx>{`
        section {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          button {
            width: 35px;
            height: 35px;
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
