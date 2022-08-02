import AppLayout from 'common/appLayout';
import Card from 'components/card';
import Nav from 'components/nav';
import { GetServerSideProps } from 'next';
import { UserType } from 'types';

function friendlyUrl(url: string) {
  return url.split('//')[1].split('/')[0];
}

export default function UsersProfile({ user }: { user: UserType }) {
  return (
    <>
      <AppLayout title={`Chat App | ${user.name}`}>
        <div className='profile'>
          <Nav />
          <div className='profile-wrapper'>
            <header className='profile-header'>
              <img
                className='profile-header-cover-photo'
                src={user.coverPhoto}
                alt='cover-photo'
              />
              <div className='profile-header-user-wrapper'>
                <img
                  className='profile-header-avatar'
                  src={user.avatar}
                  alt='avatar'
                />
                <div className='profile-header-user-name-wrapper'>
                  <h1 className='profile-header-user-name'>{user.name}</h1>
                  <h2 className='profile-header-user-contacts'>
                    {user.description}
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
                        {friendlyUrl(user.website)}
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
            background: var(--primary);
            overflow-y: auto;
            .profile-header {
              position: relative;
              width: 100%;
              aspect-ratio: 19 / 6;
              background: var(--primary);
              margin: 0 auto;
              .profile-header-cover-photo {
                position: relative;
                top: 0;
                left: 0;
                width: 100%;
                aspect-ratio: 19 / 6;
                object-fit: cover;
                background: var(--primary);
              }
              .profile-header-user-wrapper {
                position: absolute;
                width: 1000px;
                left: 0;
                right: 0;
                margin: 0 auto;
                height: 175px;
                top: 80%;
                z-index: var(--z-10);
                display: flex;
                .profile-header-avatar {
                  height: 175px;
                  border-radius: 50%;
                  border: 5px solid var(--primary);
                  aspect-ratio: 1 / 1;
                  box-sizing: unset;
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
              background: var(--background);
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
                  background: var(--primary);
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

  const user = {
    id: 1,
    name: 'Deno',
    email: 'deno@land.com',
    username,
    description: 'Web Developer React | Vue | Angular | Node.js | Next.js',
    avatar: 'https://deno.land/logo.svg?__frsh_c=2cv7hytwns90',
    coverPhoto: 'https://8bit.codes/images/blog/deno-js/deno-js-banner.png',
    website: 'https://deno.land',
  };

  return {
    props: {
      user,
    },
  };
};
