import AppLayout from 'common/appLayout';
import Nav from 'components/nav';
import { ThemeContext } from 'context/theme';
import { useTheme } from 'hooks';
import { useContext, useState } from 'react';

export default function Settings() {
  const [disabledInput, setDisabledInput] = useState({
    name: true,
    username: true,
    descrption: true,
    web: true,
  });
  const { theme, toggleTheme } = useContext(ThemeContext);
  useTheme({ theme, toggleTheme });
  return (
    <>
      <AppLayout title='Chat App | Settings'>
        <div className='settings'>
          <Nav />
          <div className='settings-container'>
            <div className='settings-wrapper'>
              <div className='settings-header'>
                <h1 className='settings-header-title'>Profile information</h1>
              </div>
              <div className='settings-content'>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title settings-content-profile-information-title'>
                      Name
                    </span>
                  </div>
                  <input
                    type='text'
                    disabled={disabledInput.name}
                    className='settings-content-input'
                    v-model='user.name.text'
                  />
                  <button
                    onClick={() =>
                      setDisabledInput({ ...disabledInput, name: false })
                    }
                    className='settings-content-button'
                  >
                    change
                  </button>
                </div>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title settings-content-profile-information-title'>
                      Username
                    </span>
                  </div>
                  <input
                    disabled={disabledInput.username}
                    className='settings-content-input'
                    v-model='user.username.text'
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
                    disabled={disabledInput.descrption}
                    className='settings-content-input'
                    v-model='user.description.text'
                  />
                  <button className='settings-content-button'>change</button>
                </div>
                <div className='settings-content-wrapper'>
                  <div className='settings-content-text'>
                    <span className='settings-content-title settings-content-profile-information-title'>
                      Web
                    </span>
                  </div>
                  <input
                    disabled={disabledInput.web}
                    className='settings-content-input'
                    v-model='user.web.text'
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
                    onChange={(e) => toggleTheme(e.target.value)}
                    className='settings-content-select'
                    name='theme'
                    id='theme'
                  >
                    <option value='null'>mode</option>
                    <option
                      value='light'
                      selected={theme === 'light' ? true : false}
                    >
                      light
                    </option>
                    <option
                      value='dark'
                      selected={theme === 'dark' ? true : false}
                    >
                      dark
                    </option>
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
                  <button className='settings-content-button'>change</button>
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
                    background: var(--primary);
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
                    padding: 4px 10px;
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
      `}</style>
    </>
  );
}
