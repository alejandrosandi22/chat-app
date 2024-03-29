import AppLayout from 'common/appLayout';
import InputSettings from 'components/inputSettings';
import Loading from 'components/loading';
import Modal from 'components/modal';
import Nav from 'components/nav';
import { ThemeContext } from 'context/theme';
import useAuth from 'hooks/auth/useAuth';
import useUpdateUser from 'hooks/user/useUpdateUser';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserType } from 'types';

const INTIAL_VALUE = {
  name: '',
  username: '',
  description: '',
  website: '',
};

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState<UserType>(INTIAL_VALUE as UserType);
  const { currentUser, loading } = useAuth();
  const [modalState, setModalState] = useState<boolean>(false);
  const router = useRouter();
  const { updateUser } = useUpdateUser();

  useEffect(() => {
    if (!currentUser) router.push('/signin');
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  if (loading || !currentUser) return <Loading />;
  return (
    <>
      {modalState && <Modal setModalState={setModalState} />}
      <AppLayout title='Chat App | Settings'>
        <div className='settings'>
          <section className='settings-nav-wrapper'>
            <Nav user={user} />
          </section>
          <div className='settings-container'>
            <div className='settings-wrapper'>
              <div className='settings-header'>
                <h1 className='settings-header-title'>Profile information</h1>
              </div>
              <div className='settings-content'>
                <InputSettings user={user} setUser={setUser} type='name' />
                <InputSettings user={user} setUser={setUser} type='username' />
                <InputSettings
                  user={user}
                  setUser={setUser}
                  type='description'
                />
                <InputSettings user={user} setUser={setUser} type='website' />
              </div>
              <div className='settings-header'>
                <h1 className='settings-header-title'>Display</h1>
              </div>
              <div className='settings-content'>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title'>Dark Mode</span>
                    <p className='settings-content-subtitle'>
                      Choose to use your device settings or select between dark
                      or light mode.
                    </p>
                  </div>
                  <select
                    className='settings-content-select'
                    placeholder='mode'
                    name='theme'
                    id='theme'
                    value={theme}
                    onChange={(e) => toggleTheme(e.target.value)}
                  >
                    <option value='light'>light</option>
                    <option value='dark'>dark</option>
                  </select>
                </div>
              </div>
              <div className='settings-header'>
                <h1 className='settings-header-title'>Data privacy</h1>
              </div>
              <div className='settings-content'>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title'>
                      Show profile photo
                    </span>
                    <p className='settings-content-subtitle'>
                      Choose whether to show or hide other members&apos; profile
                      photo.
                    </p>
                  </div>
                  <select
                    className='settings-content-select'
                    name='show-profile-photo'
                    id='show-profile-photo'
                    defaultValue={currentUser.show_profile_photo}
                    onChange={(e) =>
                      updateUser({
                        variables: {
                          showProfilePhoto: e.target.value,
                        },
                      })
                    }
                  >
                    <option value='public'>Public</option>
                    <option value='contacts'>Only Contacts</option>
                    <option value='just-me'>Just Me</option>
                  </select>
                </div>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title'>Show email</span>
                    <p className='settings-content-subtitle'>
                      Choose who you want to see your email
                    </p>
                  </div>
                  <select
                    className='settings-content-select'
                    name='show_email'
                    id='show_email'
                    defaultValue={currentUser.show_email}
                    onChange={(e) =>
                      updateUser({
                        variables: {
                          showEmail: e.target.value,
                        },
                      })
                    }
                  >
                    <option value='everybody'>Everybody</option>
                    <option value='contacts'>Contacts</option>
                  </select>
                </div>
              </div>
              <div className='settings-header'>
                <h1 className='settings-header-title'>Account Management</h1>
              </div>
              <div className='settings-content'>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title'>
                      Close Account
                    </span>
                    <p className='settings-content-subtitle'>
                      Close your account if you want, it cannot be recovered
                    </p>
                  </div>
                  <button
                    onClick={() => setModalState(!modalState)}
                    className='settings-content-button'
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
      <style jsx>{`
        .settings {
          position: absolute;
          height: 100%;
          width: 100%;
          display: flex;
          overflow: hidden;
          .settings-nav-wrapper {
            width: 5%;
            height: 100%;
          }
          .settings-container {
            background: var(--background);
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow-y: auto;
            .settings-wrapper {
              width: 80%;
              background: var(--primary);
              border: 1px solid var(--secondary);
              border-radius: 5px;
              .settings-header {
                width: 100%;
                height: 65px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 32px;
                border-bottom: 1px solid var(--secondary);
                cursor: default;
                .settings-header-title {
                  font-size: 24px;
                  font-weight: normal;
                  color: var(--primary-font-color);
                  pointer-events: none;
                }
                .settings-header-icon {
                  font-size: 24px;
                  color: var(--primary-font-color);
                  pointer-events: none;
                  transition: 0.25s;
                }
              }
              .settings-content {
                width: 100%;
                height: auto;
                overflow: hidden;
                transition: 0.25s;
                .settings-content-wrapper {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 32px;
                  height: 50px;
                  border-bottom: 1px solid var(--primary);
                  .settings-content-text {
                    .settings-content-title {
                      font-size: 16px;
                      font-weight: normal;
                      color: var(--primary-font-color);
                    }
                    .settings-content-profile-information-title {
                      display: block;
                      width: 100px;
                    }
                    .settings-content-subtitle {
                      font-size: 12px;
                      font-weight: normal;
                      color: var(--secondary-font-color);
                    }
                  }
                  .settings-content-select {
                    background: var(--primary);
                    color: var(--primary-font-color);
                    border: none;
                    font-size: 16px;
                    padding: 4px 5px;
                    border: 1px solid var(--secondary);
                  }
                  .settings-content-button {
                    background: var(--primary);
                    color: var(--primary-font-color);
                    border: none;
                    font-size: 16px;
                    width: 80px;
                    height: 30px;
                    border: 1px solid var(--secondary);
                    font-weight: normal;
                    &:hover {
                      background: var(--secondary);
                    }
                  }
                }
              }
            }
          }
        }

        @media (max-width: 768px) {
          .settings {
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: calc(100% - 70px) 70px;
            grid-template-areas:
              'main'
              'nav';
            .settings-nav-wrapper {
              grid-area: nav;
              width: 100%;
              height: 100%;
            }
            .settings-container {
              grid-area: main;
              overflow: hidden;
              .settings-wrapper {
                margin: 0 0 10px 0;
                background: var(--background);
                width: 100%;
                height: 100%;
                overflow-y: auto;
                border: none;
                .settings-header {
                  padding: 0 10px;
                }
                .settings-content {
                  .settings-content-wrapper {
                    padding: 0 10px;
                  }
                }
                .settings-content-subtitle {
                  display: none;
                }
              }
            }
          }
        }
      `}</style>
    </>
  );
}
