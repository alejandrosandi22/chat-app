import Avatar from 'components/avatar';
import useGetUser from 'hooks/useGetUser';
import moment from 'moment';
import Link from 'next/link';
import { RequestType } from 'types';
import ResponseRequest from './responseRequest';

export default function RequestsCard({ request }: { request: RequestType }) {
  const { user, loading } = useGetUser({ id: request.sender });

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
        <ResponseRequest request={request} />
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
        }
      `}</style>
    </>
  );
}
