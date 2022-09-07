import { uploadFile } from '../../../firebase/client';
import useUpdateUser from 'hooks/user/useUpdateUser';
import { useEffect, useState } from 'react';
import { RequestType, UserType } from 'types';
import useGetCurrentUser from 'hooks/user/useGetCurrentUser';
import Avatar from 'components/avatar';
import useReceiveRequest from 'hooks/requests/useReceiveRequests';
import CoverPhoto from './coverPhoto';
import Request from './request';
import ResponseRequest from 'components/requests/responseRequest';

interface HeaderProps {
  user: UserType;
}

export default function Header({ user }: HeaderProps) {
  const [avatar, setAvatar] = useState<string>(user.avatar);
  const [activeRequest, setActiveRequest] = useState<RequestType[]>([]);
  const { currentUser } = useGetCurrentUser();
  const { updateUser } = useUpdateUser();
  const { requests } = useReceiveRequest<RequestType[]>(user.id);

  useEffect(() => {
    if (!requests || !requests.length) return;
    const unansweredRequests = requests.filter(
      (request) => request.response === null
    );
    setActiveRequest(unansweredRequests);
  }, [requests]);

  const handleUpdateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file: File = e.target.files[0];

    if (file.size > 1000000) {
      alert('File is too big');
      return;
    }
    await uploadFile({
      file,
      fileName: `/avatar/${currentUser.username}-avatar`,
    }).then(async (res) => {
      await updateUser({
        onCompleted({ updateUser }) {
          setAvatar(updateUser.avatar);
        },
        variables: {
          avatar: res?.url,
        },
      });
    });
  };

  return (
    <>
      <header>
        {currentUser && user && (
          <CoverPhoto user={user} currentUser={currentUser} />
        )}
        <section>
          <div className='profile-header-avatar-wrapper'>
            <span>
              <Avatar user={{ ...user, avatar }} />
            </span>
            {currentUser && currentUser.id === user.id && (
              <label htmlFor='update-avatar'>
                <input
                  id='update-avatar'
                  type='file'
                  hidden
                  onChange={handleUpdateAvatar}
                  accept='image/*'
                />
                <i className='fal fa-upload' />
              </label>
            )}
          </div>
          <div className='profile-header-user-name-wrapper'>
            <h1>{user.name}</h1>
            <h2>{user.description}</h2>
          </div>
          <div className='profile-header-request-wrapper'>
            {currentUser.id !== user.id &&
              requests &&
              !user.contacts.includes(currentUser.id) && (
                <>
                  {!activeRequest.length ? (
                    <Request id={user.id} name={currentUser.name} />
                  ) : (
                    <div className='profile-header-sended-request'>
                      {requests.filter(
                        (request) => request.sender === currentUser.id
                      ).length ? (
                        <p>
                          Sended <i className='fal fa-check-circle' />
                        </p>
                      ) : (
                        <ResponseRequest request={activeRequest[0]} />
                      )}
                    </div>
                  )}
                </>
              )}
          </div>
        </section>
      </header>
      <style jsx>{`
        header {
          position: relative;
          width: 100%;
          background: var(--background);
          margin: 0 auto;
          section {
            position: relative;
            width: 80%;
            left: 0;
            right: 0;
            margin: 0 auto;
            height: 100px;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .profile-header-avatar-wrapper {
              position: relative;
              width: 175px;
              height: 175px;
              border-radius: 50%;
              border: 5px solid var(--primary);
              span {
                aspect-ratio: 1 / 1;
                box-sizing: unset;
                background: var(--primary);
                border-radius: 50%;
              }
              label {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: var(--black);
                opacity: 0;
                display: grid;
                place-items: center;
                transition: 0.5s ease;
                &:hover {
                  cursor: pointer;
                  opacity: 0.5;
                  i {
                    transform: translateY(0);
                  }
                }
                i {
                  font-size: 2.5rem;
                  color: var(--white);
                  transform: translateY(50px);
                  transition: 0.5s ease;
                }
              }
            }
            .profile-header-user-name-wrapper {
              width: calc(100% - 375px);
              padding: 0 20px;
              display: flex;
              flex-direction: column;
              h1 {
                font-size: 50px;
                font-weight: normal;
                white-space: nowrap;
                color: var(--primary-font-color);
              }
              h2 {
                font-size: 25px;
                font-weight: normal;
                color: var(--primary-font-color);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .profile-header-request-wrapper {
              width: 200px;
              height: 100%;
              .profile-header-sended-request {
                width: 100%;
                height: 100%;
                display: grid;
                place-items: center;
                p {
                  font-size: 18px;
                  color: var(--primary-font-color);
                }
              }
            }
          }
        }
        @media (max-width: 768px) {
          header {
            section {
              display: flex;
              flex-direction: column;
              height: unset;
              gap: 10px;
              width: 100%;
              margin: -50px 0 0 0;
              .profile-header-avatar-wrapper {
                width: 150px;
                height: 150px;
              }
              .profile-header-user-name-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                h1 {
                  width: 100%;
                  text-align: center;
                  font-size: 2.5rem;
                }
                h2 {
                  width: 98%;
                  text-align: center;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 1.5rem;
                }
              }
            }
          }
        }
      `}</style>
    </>
  );
}
