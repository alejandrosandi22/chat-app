import AppLayout from 'common/appLayout';
import Loading from 'components/loading';
import Nav from 'components/nav';
import { ThemeContext } from 'context/theme';
import useAuth from 'hooks/auth/useAuth';
import useUpdateUser from 'hooks/user/useUpdateUser';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { UserType } from 'types';
import handleUpdate from 'services/update';

export default function Settings() {
  const [disabledInput, setDisabledInput] = useState({
    name: true,
    username: true,
    description: true,
    web: true,
  });
  const [currentData, setCurrentData] = useState<UserType>({
    name: '',
    username: '',
    description: '',
    website: '',
  } as UserType);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [user, setUser] = useState<UserType>({
    name: '',
    username: '',
    description: '',
    website: '',
  } as UserType);
  const { currentUser, loading } = useAuth();

  const { updateUser, loading: loadingUpdate } = useUpdateUser();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdate({
      user,
      currentData,
      updateUser,
      key: e.currentTarget.id,
    });
    setDisabledInput({
      ...disabledInput,
      name: true,
    });
  };

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setCurrentData(currentUser);
    }
  }, [currentUser]);

  if (loading || !currentUser) return <Loading />;
  return (
    <>
      <AppLayout title='Chat App | Settings'>
        <div className='settings'>
          <Nav user={user} />
          <div className='settings-container'>
            <div className='settings-wrapper'>
              <div className='settings-header'>
                <h1 className='settings-header-title'>Profile information</h1>
              </div>
              <div className='settings-content'>
                <form
                  id='name'
                  onSubmit={handleSubmit}
                  className='settings-content-wrapper'
                >
                  <div className='settings-content-text'>
                    <span className='settings-content-title settings-content-profile-information-title'>
                      Name
                    </span>
                  </div>
                  {loadingUpdate ? (
                    <i className='fal fa-spinner-third' />
                  ) : (
                    <input
                      type='text'
                      disabled={disabledInput.name}
                      className='settings-content-input'
                      value={user.name}
                      onChange={(e) => {
                        setUser({ ...user, name: e.target.value });
                      }}
                    />
                  )}
                  {disabledInput.name ? (
                    <button
                      type='button'
                      onClick={() => {
                        setDisabledInput({
                          ...disabledInput,
                          name: false,
                        });
                      }}
                      className='settings-content-button'
                    >
                      change
                    </button>
                  ) : (
                    <div className='settings-content-button-action-wrapper'>
                      <button
                        type='submit'
                        className='settings-content-button-action'
                      >
                        <i className='fal fa-check' />
                      </button>
                      <button
                        type='button'
                        onClick={() => {
                          setDisabledInput({
                            ...disabledInput,
                            name: true,
                          });
                          setUser({ ...user, name: currentData.name });
                        }}
                        className='settings-content-button-action'
                      >
                        <i className='fal fa-times' />
                      </button>
                    </div>
                  )}
                </form>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title settings-content-profile-information-title'>
                      Username
                    </span>
                  </div>
                  <input
                    disabled={disabledInput.username}
                    className='settings-content-input'
                    defaultValue={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                  <button className='settings-content-button'>change</button>
                </div>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title settings-content-profile-information-title'>
                      Description
                    </span>
                  </div>
                  <input
                    disabled={disabledInput.description}
                    className='settings-content-input'
                    value={user.description ?? '-'}
                    onChange={(e) => {
                      setUser({ ...user, description: e.target.value });
                    }}
                  />
                  <button
                    onClick={() =>
                      setDisabledInput({
                        ...disabledInput,
                        description: !disabledInput.description,
                      })
                    }
                    className='settings-content-button'
                  >
                    change
                  </button>
                </div>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title settings-content-profile-information-title'>
                      web
                    </span>
                  </div>
                  <input
                    disabled={disabledInput.web}
                    className='settings-content-input'
                    value={user.website ?? '-'}
                    onChange={(e) =>
                      setUser({ ...user, website: e.target.value })
                    }
                  />
                  <button className='settings-content-button'>change</button>
                </div>
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
                      Show profile picture
                    </span>
                    <p className='settings-content-subtitle'>
                      Choose whether to show or hide other members&apos; profile
                      photos.
                    </p>
                  </div>
                  <select
                    className='settings-content-select'
                    name='showProfilePicture'
                    id='showProfilePicture'
                  >
                    <option value='public'>Public</option>
                    <option value='contacts'>Only Contacts</option>
                    <option value='me'>Just Me</option>
                  </select>
                </div>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title'>
                      Contact requests
                    </span>
                    <p className='settings-content-subtitle'>
                      Choose who you want to send you contact requests
                    </p>
                  </div>
                  <select
                    className='settings-content-select'
                    name='showProfilePicture'
                    id='showProfilePicture'
                  >
                    <option value='public'>Everybody</option>
                    <option value='contacts'>Contacts of contacts</option>
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
                  <button className='settings-content-button'>close</button>
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
                  .settings-content-input {
                    border: none;
                    width: 300px;
                    height: 30px;
                    padding: 0 8px;
                    font-size: 16px;
                    font-weight: normal;
                    color: var(--primary-font-color);
                    background: transparent;
                    outline: none;
                    transition: 0.25s;
                    text-align: center;
                    text-overflow: ellipsis;
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
                    &:hover {
                      background: var(--secondary);
                    }
                  }
                  .settings-content-button-action-wrapper {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 80px;
                    .settings-content-button-action {
                      background: var(--primary);
                      color: var(--primary-font-color);
                      border: none;
                      font-size: 16px;
                      width: 35px;
                      height: 30px;
                      border: 1px solid var(--secondary);
                      &:hover {
                        background: var(--secondary);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}</style>
    </>
  );
}
