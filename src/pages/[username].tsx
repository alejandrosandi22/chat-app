import AppLayout from 'common/appLayout';
import Card from 'components/card';
import Loading from 'components/loading';
import Nav from 'components/nav';
import { GET_USER } from 'graphql/queries';
import useAuth from 'hooks/useAuth';
import useUpdateUser from 'hooks/useUpdateUser';
import { uploadFile } from '../firebase/client';
import { GetServerSideProps } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import client from 'services/apolloClient';
import { UserType } from 'types';

export default function UsersProfile({ user }: { user: UserType }) {
  const profilePhotoRef = useRef<HTMLImageElement>(null);
  const { currentUser, loading } = useAuth();
  const [progress, setProgress] = useState<number>(0);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const { updateUser } = useUpdateUser();

  useEffect(() => {
    if (!currentUser || loading || !profilePhotoRef.current) return;

    if (user.show_profile_photo === 'only-contacts') {
      if (!user.contacts.includes(currentUser.id))
        profilePhotoRef.current.src = 'static/images/user.png';
    }

    if (user.show_profile_photo === 'just-me') {
      if (user.id !== currentUser.id)
        profilePhotoRef.current.src = 'static/images/user.png';
    }
  }, [currentUser]);

  const imageOnError = () => {
    if (profilePhotoRef.current) {
      profilePhotoRef.current.src = 'static/images/user.png';
    }
  };

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

  if (loading && !currentUser) return <Loading />;

  return (
    <>
      <AppLayout title={`Chat App | ${user.name}`}>
        <div className='profile'>
          <Nav user={currentUser} />
          <div className='profile-wrapper'>
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
            <main className='profile-main'>
              <section className='profile-main-info'>
                <h2 className='profile-main-info-title'>Information</h2>
                <div className='profile-main-info-wrapper'>
                  <div className='profile-main-info-user-wrapper'>
                    <h3 className='profile-main-info-subtitle'>Name:</h3>
                    <p className='profile-main-info-text'>{user.name}</p>
                  </div>
                  <div className='profile-main-info-user-wrapper'>
                    <h3 className='profile-main-info-subtitle'>Username:</h3>
                    <p className='profile-main-info-text'>@{user.username}</p>
                  </div>
                  <div className='profile-main-info-user-wrapper'>
                    <h3 className='profile-main-info-subtitle'>Email:</h3>
                    <p className='profile-main-info-text'>{user.email}</p>
                  </div>
                  <div className='profile-main-info-user-wrapper'>
                    <h3 className='profile-main-info-subtitle'>Web:</h3>
                    <p className='profile-main-info-text'>
                      <a
                        className='profile-main-info-text-link'
                        href={user.website}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {user.website ?? '-'}
                      </a>
                    </p>
                  </div>
                </div>
              </section>
              <section className='profile-main-contacts'>
                <h2 className='profile-main-contacts-title'>Contacts</h2>
                <div className='profile-main-contacts-wrapper'>
                  <Card />
                </div>
              </section>
            </main>
          </div>
        </div>
      </AppLayout>
      <style jsx>{`
        .profile {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--primary);
          display: flex;
          .profile-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            background: var(--background);
            overflow-y: auto;
            .profile-header {
              position: relative;
              width: 100%;
              aspect-ratio: 19 / 6;
              background: var(--background);
              margin: 0 auto;
              .profile-header-cover-photo-wrapper {
                position: relative;
                top: 0;
                left: 0;
                width: 100%;
                aspect-ratio: 19 / 6;
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
                  background: linear-gradient(
                    rgba(0, 0, 0, 0),
                    var(--background)
                  );
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
            .profile-main {
              background: var(--primary);
              width: 1000px;
              margin: 175px auto 50px auto;
              border-radius: 5px;
              display: flex;
              .profile-main-info,
              .profile-main-contacts {
                width: 50%;
                .profile-main-info-title,
                .profile-main-contacts-title {
                  padding: 18px 32px;
                  display: flex;
                  align-items: center;
                  font-size: 20px;
                  font-weight: normal;
                  color: var(--primary-font-color);
                }
              }
              .profile-main-info {
                border-right: 1px solid var(--secondary);
                .profile-main-info-wrapper {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  height: calc(100% - 150px);
                  margin: 32px 0 0 0;
                  .profile-main-info-user-wrapper {
                    display: flex;
                    margin: 0 32px;
                    .profile-main-info-subtitle {
                      width: 100px;
                      font-size: 15px;
                      font-weight: normal;
                      color: var(--primary-font-color);
                    }
                    .profile-main-info-text {
                      font-size: 15px;
                      font-weight: normal;
                      color: var(--primary-font-color);
                      .profile-main-info-text-link {
                        color: var(--primary-font-color);
                        &:hover {
                          color: var(--secondary-font-color);
                        }
                      }
                    }
                  }
                }
              }
              .profile-main-contacts {
                .profile-main-contacts-wrapper {
                  display: flex;
                  align-items: center;
                  margin: 0 auto;
                  width: 90%;
                  height: 300px;
                  background: var(--background);
                  margin: 0 auto 30px auto;
                  overflow-x: auto;
                  overflow-y: hidden;
                  gap: 20px;
                  padding: 0 14px;
                }
              }
            }
          }
        }
      `}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;

  const { data } = await client.query({
    query: GET_USER,
    variables: {
      username,
    },
  });

  if (!data.getUser) {
    context.res.writeHead(302, {
      Location: '/signin',
    });
    context.res.end();
  }

  const user: UserType = data.getUser;

  return {
    props: {
      user,
    },
  };
};
