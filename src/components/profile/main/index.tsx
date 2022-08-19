import Card from 'components/card';
import useGetContacts from 'hooks/useGetContacts';
import { UserType } from 'types';

interface MainProps {
  user: UserType;
  currentUser: UserType;
}

export default function Main({ currentUser, user }: MainProps) {
  const { contacts, loading } = useGetContacts(user.id);

  if (loading) return <></>;

  return (
    <>
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
            {contacts &&
              contacts.map((contact) => (
                <Card
                  key={contact.username}
                  contact={contact}
                  currentUser={currentUser.id === user.id ? true : false}
                />
              ))}
          </div>
        </section>
      </main>
      <style jsx>{`
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
      `}</style>
    </>
  );
}
