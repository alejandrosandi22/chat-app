import { GET_USER } from 'graphql/queries';
import { GetServerSideProps } from 'next';
import client from 'services/apolloClient';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserType } from 'types';
import { FormEvent, useState } from 'react';
import Input from 'components/input';
import useChangePassword from 'hooks/user/useChangePassword';
import Link from 'next/link';

export default function NewPassword({ user }: { user: UserType }) {
  const [password, setPassword] = useState<string>('');
  const [changed, setChanged] = useState<boolean>(false);
  const { changePassword, loading } = useChangePassword();

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await changePassword({
      onCompleted: () => {
        setChanged(true);
        setPassword('');
      },
      variables: {
        id: user.id,
        password,
      },
    });
  };

  return (
    <>
      <div className='container'>
        <form onSubmit={handleResetPassword}>
          <h1>New Password</h1>
          <p>Write down your new secret password.</p>
          <Input
            id='new-password'
            type='password'
            name='new-password'
            placeholder='New Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading ? (
            <section className='spin-wrapper'>
              <i className='fal fa-spinner-third' />
            </section>
          ) : (
            <>
              {!changed ? (
                <button>Send</button>
              ) : (
                <div className='link-wrapper'>
                  <Link href='/signin'>
                    <a>Go to sign in</a>
                  </Link>
                </div>
              )}
            </>
          )}
        </form>
      </div>
      <style jsx>{`
        .container {
          position: absolute;
          background: var(--primary);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          form {
            width: 100%;
            max-width: 600px;
            box-shadow: var(--shadow);
            padding: 30px;
            display: flex;
            flex-direction: column;
            h1 {
              text-align: center;
              font-size: 2rem;
              font-weight: 500;
              color: var(--white);
              margin-bottom: 1rem;
            }
            p {
              text-align: center;
              font-size: 1rem;
              font-weight: 400;
              color: var(--white);
              margin-bottom: 2rem;
            }
            .spin-wrapper {
              i {
                font-size: 20px;
                color: var(--primary-font-color);
                animation: spin 1s infinite;
              }
            }
            button {
              margin: 15px auto;
              font-size: 16px;
              width: 140px;
              height: 40px;
              border: 0;
              background: var(--primary-font-color);
              color: var(--primary);
              font-weight: normal;
              &:hover {
                background: var(--secondary);
              }
            }
            .link-wrapper {
              display: flex;
              justify-content: center;
              margin: 10px 0;
              a {
                text-decoration: none;
                font-size: 14px;
                color: var(--secondary-font-color);
                &:hover {
                  color: var(--primary-font-color);
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
