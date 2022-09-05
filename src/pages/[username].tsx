import AppLayout from 'common/appLayout';
import Loading from 'components/loading';
import Nav from 'components/nav';
import useAuth from 'hooks/auth/useAuth';
import Profile from 'components/profile';
import useGetUser from 'hooks/useGetUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function UsersProfile() {
  const router = useRouter();
  const { username } = router.query;
  const { currentUser, loading } = useAuth();
  const { user, loading: loadingUser } = useGetUser({
    username: username as string | undefined,
  });

  useEffect(() => {
    if (user === null) router.push('/chat');
  }, [user]);

  if (user === null) return null;
  if (loading || loadingUser || !currentUser || user === undefined)
    return <Loading />;

  return (
    <>
      <AppLayout title={`Chat App | ${user.name}`}>
        <div className='profile'>
          <div className='profile-nav-wrapper'>
            <Nav user={currentUser} />
          </div>
          <div className='profile-main-wrapper'>
            <Profile user={user} />
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
          .profile-nav-wrapper {
            position: relative;
            width: 5%;
            height: 100%;
          }
          .profile-main-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
            background: var(--background);
            overflow-y: auto;
          }
        }

        @media (max-width: 768px) {
          .profile {
            overflow: hidden;
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: calc(100% - 70px) 70px;
            grid-template-areas:
              'main'
              'nav';
            .profile-nav-wrapper {
              grid-area: nav;
              width: 100%;
              height: 100%;
              min-height: 70px;
            }
            .profile-main-wrapper {
              grid-area: main;
              width: 100%;
              height: 100%;
              overflow-y: auto;
              overflow-x: hidden;
            }
          }
        }
      `}</style>
    </>
  );
}
