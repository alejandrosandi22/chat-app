import { uploadFile } from '../../../firebase/client';
import useUpdateUser from 'hooks/user/useUpdateUser';
import { useState } from 'react';
import { RequestType, UserType } from 'types';
import useGetCurrentUser from 'hooks/user/useGetCurrentUser';
import useSendRequest from 'hooks/requests/useSendRequest';
import refetchQueries from 'services/refetchQueries';
import Avatar from 'components/avatar';
import useReceiveRequest from 'hooks/requests/useReceiveRequests';

interface HeaderProps {
  user: UserType;
}

export default function Header({ user }: HeaderProps) {
  const [avatar, setAvatar] = useState<string>(user.avatar);
  const [coverPhoto, setCoverPhoto] = useState<string | null>(user.cover_photo);
  const { currentUser } = useGetCurrentUser();
  const { updateUser } = useUpdateUser();
  const { sendRequest } = useSendRequest(user.id, currentUser.name);
  const { requests } = useReceiveRequest<RequestType[]>(user.id);

  const handleDeleteCoverPhoto = async () => {
    await updateUser({
      onCompleted: async ({ updateUser }) => {
        await refetchQueries();
        setCoverPhoto(updateUser.cover_photo);
      },
      variables: {
        coverPhoto: null,
      },
    });
  };

  const handleUpdateCoverPhoto = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const file: File = e.target.files[0];

    if (file.size > 5000000) {
      alert('File is too big');
      return;
    }
    await uploadFile({
      file,
      fileName: `/cover-photo/${currentUser.username}-cover-photo`,
    }).then(async (res) => {
      await updateUser({
        onCompleted({ updateUser }) {
          setCoverPhoto(updateUser.cover_photo);
        },
        variables: {
          coverPhoto: res?.url,
        },
      });
    });
  };

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
      <header className='profile-header'>
        <div className='profile-header-cover-photo-wrapper'>
          {currentUser && currentUser.id === user.id && (
            <span className='profile-header-cover-photo-change'>
              <input
                type='file'
                id='coverPhoto'
                onChange={handleUpdateCoverPhoto}
                hidden
                accept='image/*'
              />
              <label
                htmlFor='coverPhoto'
                className='profile-header-cover-photo-change-button'
              >
                <i className='fal fa-upload' />
              </label>
              <button
                onClick={handleDeleteCoverPhoto}
                className='profile-header-cover-photo-change-button'
              >
                <i className='fal fa-trash' />
              </button>
            </span>
          )}
          {!coverPhoto ? (
            <div className='profile-header-cover-photo'></div>
          ) : (
            <img
              className='profile-header-cover-photo'
              src={coverPhoto}
              alt='cover-photo'
            />
          )}
        </div>
        <div className='profile-header-user-wrapper'>
          <div className='profile-header-avatar'>
            <span className='profile-header-avatar-image'>
              <Avatar user={{ ...user, avatar }} />
            </span>
            {currentUser && currentUser.id === user.id && (
              <label
                htmlFor='update-avatar'
                className='profile-header-avatar-image-change'
              >
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
          <div className='profile-header-user-data-wrapper'>
            <div className='profile-header-user-name-wrapper'>
              <h1 className='profile-header-user-name'>{user.name}</h1>
              {currentUser.id !== user.id &&
              !user.contacts.includes(currentUser.id) &&
              requests &&
              !requests.filter((request) => request.response === null)
                .length ? (
                <>
                  <button
                    className='profile-send-request'
                    onClick={() => sendRequest()}
                  >
                    <i className='fal fa-plus' />
                  </button>
                  <p className='profile-send-request-text'>
                    <i className='fal fa-info-circle' />
                    Send request
                  </p>
                </>
              ) : null}
            </div>
            <h2 className='profile-header-user-contacts'>
              {user.description ?? '-'}
            </h2>
          </div>
        </div>
      </header>
      <style jsx>{`
        .profile-header {
          position: relative;
          width: 100%;
          background: var(--background);
          margin: 0 auto;
          .profile-header-cover-photo-wrapper {
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            background: var(--background);
            border-bottom: 1px solid var(--primary);
            &:hover {
              .profile-header-cover-photo-change {
                opacity: 1;
              }
            }
            .profile-header-cover-photo-change {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 30px;
              background: linear-gradient(rgba(0, 0, 0, 0), var(--background));
              display: flex;
              align-items: center;
              justify-content: flex-end;
              opacity: 0;
              transition: 0.5s;
              &:hover {
                opacity: 1;
              }
              .profile-header-cover-photo-change-button {
                border: none;
                background: transparent;
                cursor: pointer;
                outline: none;
                margin: 0 10px;
                i {
                  color: var(--primary-font-color);
                  font-size: 1.25rem;
                }
              }
            }
            .profile-header-cover-photo {
              width: 100%;
              aspect-ratio: 41 / 15;
              object-fit: cover;
            }
          }
          .profile-header-user-wrapper {
            position: absolute;
            pointer-events: none;
            width: 1000px;
            left: 0;
            right: 0;
            margin: 0 auto;
            height: 175px;
            top: 80%;
            z-index: var(--z-10);
            display: flex;
            .profile-header-avatar {
              position: relative;
              height: 175px;
              border-radius: 50%;
              border: 5px solid var(--primary);
              aspect-ratio: 1 / 1;
              box-sizing: unset;
              .profile-header-avatar-image {
                position: relative;
                display: block;
                pointer-events: all;
                background: var(--primary);
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
              .profile-header-avatar-image-change {
                pointer-events: all;
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
            .profile-header-user-data-wrapper {
              margin: 0 20px;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              .profile-header-user-name-wrapper {
                display: flex;
                gap: 10px;
                align-items: center;
                .profile-header-user-name {
                  font-size: 50px;
                  font-weight: normal;
                  color: var(--primary-font-color);
                  pointer-events: all;
                }
                .profile-send-request {
                  pointer-events: all;
                  background: var(--primary);
                  color: var(--primary-font-color);
                  border: none;
                  font-size: 16px;
                  border-radius: 50%;
                  width: 40px;
                  height: 40px;
                  border: 1px solid var(--secondary);
                  font-weight: normal;
                  &:hover {
                    background: var(--secondary);
                  }
                }
                .profile-send-request-text {
                  display: flex;
                  color: var(--secondary-font-color);
                  font-size: 16px;
                  font-weight: normal;
                  gap: 5px;
                }
              }
              .profile-header-user-contacts {
                font-size: 25px;
                font-weight: normal;
                color: var(--primary-font-color);
                pointer-events: all;
              }
            }
          }
        }
      `}</style>
    </>
  );
}
