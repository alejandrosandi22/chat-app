import useReceiveRequest from 'hooks/requests/useReceiveRequests';
import useRequestsSubscription from 'hooks/requests/useRequestsSubscription';
import useUpdateRequest from 'hooks/requests/useUpdateRequest';
import { useState } from 'react';
import { RequestType } from 'types';
import RequestsCard from './requestsCard';

export default function Requests() {
  useRequestsSubscription();
  const [toggle, setToggle] = useState<boolean>(false);
  const { requests, loading } = useReceiveRequest<RequestType[]>();
  const { updateState } = useUpdateRequest();

  const handleUpdate = async () => {
    if (!toggle) {
      await updateState(requests, true);
    }
  };

  if (loading || !requests) return null;

  return (
    <>
      <li>
        <span
          onClick={() => {
            setToggle(!toggle);
            handleUpdate();
          }}
          className='nav-links-list-link'
        >
          {requests.find((request) => request.state === false) ? (
            <span className='new-request'></span>
          ) : null}
          <i className='fal fa-bell'></i>
        </span>
        {toggle && (
          <ul>
            {!requests.filter((request) => !request.response).length && (
              <p>No requests yet</p>
            )}
            {requests.map((request) => {
              if (request.response === null) {
                return <RequestsCard key={request.id} request={request} />;
              }
              return null;
            })}
          </ul>
        )}
      </li>
      <style jsx>{`
        li {
          position: relative;
          height: 40px;
          width: 95%;
          margin: 10px 0;
          display: flex;
          justify-content: center;
          .nav-links-list-link {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            cursor: pointer;
            &:hover {
              i {
                color: var(--primary-font-color);
              }
            }
            .new-request {
              position: absolute;
              top: 5px;
              right: 30%;
              background: var(--red);
              width: 7px;
              height: 7px;
              border-radius: 50%;
            }
            i {
              font-size: 18px;
              color: var(--secondary-font-color);
            }
          }
          ul {
            min-height: 60px;
            width: 350px;
            background: var(--primary);
            left: 100%;
            position: absolute;
            display: flex;
            flex-direction: column;
            border: 1px solid var(--secondary);
            p {
              width: 100%;
              height: 60px;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1rem;
              color: var(--primary-font-color);
            }
          }
        }
      `}</style>
    </>
  );
}
