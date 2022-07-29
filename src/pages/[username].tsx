import AppLayout from 'common/appLayout';
import { GetServerSideProps } from 'next';
import { UserType } from 'types';

export default function UsersProfile({ user }: { user: UserType }) {
  return (
    <>
      <AppLayout title={`Chat App | ${user.name}`}>
        <div></div>
      </AppLayout>
      <style jsx>{``}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;

  const user = {
    id: 2,
    name: 'John Doe',
    email: '',
    username,
    avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
  };

  return {
    props: {
      user,
    },
  };
};
