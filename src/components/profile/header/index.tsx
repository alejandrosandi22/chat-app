import { uploadFile } from '../../../firebase/client';
import useErrorImage from 'hooks/useErrorImage';
import useUpdateUser from 'hooks/useUpdateUser';
import { useEffect, useRef, useState } from 'react';
import { UserType } from 'types';

interface HeaderProps {
  user: UserType;
  currentUser: UserType;
}

export default function Header({ currentUser, user }: HeaderProps) {
  const profilePhotoRef = useRef<HTMLImageElement>(null);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [progress, setProgress] = useState<number>(0);

  const { imageOnError } = useErrorImage();
  const { updateUser } = useUpdateUser();

  useEffect(() => {
    if (!profilePhotoRef.current) return;

    if (user.show_profile_photo === 'only-contacts') {
      if (!user.contacts.includes(currentUser.id))
        profilePhotoRef.current.src = 'static/images/user.png';
    }

    if (user.show_profile_photo === 'just-me') {
      if (user.id !== currentUser.id)
        profilePhotoRef.current.src = 'static/images/user.png';
    }
  }, [currentUser]);

  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
    }
  }, [progress]);

  const handleUpdateAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file: File = e.target.files[0];

    if (file.size > 1000000) {
      alert('File is too big');
      return;
    }
    uploadFile({
      file,
      setProgress,
      username: `${currentUser.username}-avatar`,
    }).then((res) => {
      updateUser({
        onCompleted: () => {
          setAvatar(res?.url);
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
              <button className='profile-header-cover-photo-change-button'>
                <i className='fal fa-upload' />
              </button>
              <button className='profile-header-cover-photo-change-button'>
                <i className='fal fa-trash' />
              </button>
            </span>
          )}
          {!user.cover_photo ? (
            <div className='profile-header-cover-photo'></div>
          ) : (
            <img
              className='profile-header-cover-photo'
              src={user.cover_photo}
              alt='cover-photo'
            />
          )}
        </div>
        <div className='profile-header-user-wrapper'>
          <div className='profile-header-avatar'>
            <img
              ref={profilePhotoRef}
              className='profile-header-avatar-image'
              src={avatar ?? user.avatar}
              onError={imageOnError}
              alt='avatar'
            />
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
                />
                <i className='fal fa-upload' />
              </label>
            )}
          </div>
          <div className='profile-header-user-name-wrapper'>
            <h1 className='profile-header-user-name'>{user.name}</h1>
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
                background: var(--primary);
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
              margin: 0 20px;
              display: flex;
              flex-direction: column;
              justify-content: flex-end;
              .profile-header-user-name {
                font-size: 50px;
                font-weight: normal;
                color: var(--primary-font-color);
              }
              .profile-header-user-contacts {
                font-size: 25px;
                font-weight: normal;
                color: var(--primary-font-color);
              }
            }
          }
        }
      `}</style>
    </>
  );
}
