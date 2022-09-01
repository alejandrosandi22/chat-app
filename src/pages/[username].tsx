import AppLayout from 'common/appLayout';
import Loading from 'components/loading';
import Nav from 'components/nav';
import useAuth from 'hooks/auth/useAuth';
import client from 'services/apolloClient';
import { UserType } from 'types';
import { GET_USER } from 'graphql/queries';
import { GetServerSideProps } from 'next';
import Profile from 'components/profile';

export default function UsersProfile({ user }: { user: UserType }) {
  const { currentUser, loading } = useAuth();
  if (loading || !currentUser) return <Loading />;

  return (
    <>
      <AppLayout title={`Chat App | ${user.name}`}>
        <div className='profile'>
          <Nav user={currentUser} />
          <Profile user={user} />
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
