import Avatar from 'components/avatar';
import useUpdateRequest from 'hooks/requests/useUpdateRequest';
import useGetUser from 'hooks/useGetUser';
import moment from 'moment';
import Link from 'next/link';
import { RequestType } from 'types';

export default function RequestsCard({ request }: { request: RequestType }) {
  const { user, loading } = useGetUser({ id: request.sender });
  const { updateResponse } = useUpdateRequest();

  if (loading || !user) return null;
  return (
    <>
      <div className='requests-card'>
        <span>
          {(!loading || user) && (
            <Link href={`/${user.username}`}>
              <a>
                <Avatar user={user} />
              </a>
            </Link>
          )}
        </span>
        <p>
          {request.content} <em>{moment(request.created_at).fromNow()}</em>
        </p>
        <section>
          <button onClick={async () => await updateResponse(request, true)}>
            <i className='fal fa-check' />
          </button>
          <button onClick={async () => await updateResponse(request, false)}>
            <i className='fal fa-times' />
          </button>
        </section>
      </div>
      <style jsx>{`
        .requests-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 5px;
          padding: 5px;
          cursor: default;
          &:not(:last-child) {
            border-bottom: 1px solid var(--secondary);
          }
          &:hover {
            background: var(--background);
          }
          span {
            width: 50px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            a {
              position: relative;
              width: 50px;
              height: 50px;
            }
          }
          p {
            height: 100%;
            font-size: 1rem;
            font-weight: normal;
            color: var(--primary-font-color);
            em {
              font-size: 0.9rem;
              color: var(--secondary-font-color);
            }
          }
          section {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            button {
              width: 35px;
              height: 35px;
              border: 1px solid var(--secondary);
              background: var(--primary);
              color: var(--primary-font-color);
              &:hover {
                background: var(--secondary);
              }
            }
          }
        }
      `}</style>
    </>
  );
}
