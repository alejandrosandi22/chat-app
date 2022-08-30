import { GET_USER } from 'graphql/queries';
import { GetServerSideProps } from 'next';
import client from 'services/apolloClient';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserType } from 'types';
import { FormEvent, useState } from 'react';
import Input from 'components/input';
import { useRouter } from 'next/router';
import useChangePassword from 'hooks/user/useChangePassword';

export default function NewPassword({ user }: { user: UserType }) {
  const [password, setPassword] = useState<string>('');
  const { changePassword } = useChangePassword();
  const router = useRouter();

  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    changePassword({
      onCompleted: () => {
        router.push('/signin');
      },
      variables: {
        id: user.id,
        password,
      },
    });
  };

  return (
    <>
      <div>
        <form onSubmit={handleResetPassword}>
          <Input
            id='new-password'
            type='password'
            name='new-password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Send</button>
        </form>
      </div>
      <style jsx>{`
        div {
          position: absolute;
          width: 100%;
          height: 100%;
          background: var(--background);
        }
      `}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.query;

  try {
    const { username } = jwt.verify(
      token as string,
      process.env.RESET_TOKEN
    ) as JwtPayload;

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
  } catch (error) {
    context.res.writeHead(302, {
      Location: '/signin',
    });
    context.res.end();

    return {
      props: {},
    };
  }
};
