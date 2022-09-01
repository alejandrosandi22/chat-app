import AppLayout from 'common/appLayout';
import Loading from 'components/loading';
import Nav from 'components/nav';
import Search from 'components/search';
import Users from 'components/users';
import useAuth from 'hooks/auth/useAuth';
import { UserType } from 'types';

export default function Explore() {
  const { currentUser, loading } = useAuth();

  if (!currentUser || loading) return <Loading />;

  return (
    <>
      <AppLayout title='Chat App | Explore'>
        <div className='explore-container'>
          <Nav user={{ username: 'denoland' } as UserType} />
          <section>
            <header>
              <div className='explore-search-wrapper'>
                <Search />
              </div>
            </header>
            <main>
              <Users />
            </main>
          </section>
        </div>
      </AppLayout>
      <style jsx>{`
        .explore-container {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          section {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 95%;
            header {
              height: 70px;
              background: var(--primary);
              .explore-search-wrapper {
                width: 500px;
                height: 100%;
              }
            }
          }
          main {
            height: calc(100% - 70px);
            overflow: hidden;
          }
        }
      `}</style>
    </>
  );
}
