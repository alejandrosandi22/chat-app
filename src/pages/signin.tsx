import { useState } from 'react';
import AppLayout from 'common/appLayout';
import Input from 'components/input';
import SocialSignIn from 'components/socialSignIn';
import Link from 'next/link';
import useSignIn from 'hooks/auth/useSignIn';
import { GetServerSideProps } from 'next';
import client from 'services/apolloClient';
import { GET_CURRENT_USER } from 'graphql/queries';
import { getCookie } from 'cookies-next';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signIn, loading } = useSignIn();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <>
      <AppLayout title='Chat App | Sign In'>
        <div className='signin'>
          <div className='signin-wrapper'>
            <form onSubmit={handleSubmit} className='signin-form'>
              <h1 className='signin-title'>Sign In</h1>
              <Input
                type='email'
                id='signin-email'
                name='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type='password'
                id='signin-password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {loading ? (
                <div className='signin-spinner'>
                  <i className='fal fa-spinner-third signin-spinner-icon' />
                </div>
              ) : (
                <button className='signin-button' type='submit'>
                  Sign In
                </button>
              )}
            </form>
            <div className='signin-links-wrapper'>
              <Link href='/forgot-password'>
                <a className='signin-links'>Forgot your password?</a>
              </Link>
              <Link href='/signup'>
                <a className='signin-links'>Don&apos;t have an account?</a>
              </Link>
            </div>
            <div className='line-wrapper'>
              <span className='line'></span>
            </div>
            <SocialSignIn />
          </div>
        </div>
      </AppLayout>
      <style jsx>{`
        .signin {
          position: absolute;
          background: var(--primary);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .signin-wrapper {
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 610px;
            background: var(--primary);
            box-shadow: var(--shadow);
            padding: 30px 40px;
            .signin-form {
              display: flex;
              flex-direction: column;
              gap: 20px;
              .signin-title {
                color: var(--primary-font-color);
                font-size: 35px;
              }
              .signin-button {
                margin: 5px auto;
                font-size: 16px;
                width: 140px;
                height: 40px;
                border: 0;
                background: var(--primary-font-color);
                color: var(--primary);
                &:hover {
                  background: var(--secondary);
                }
              }
              .signin-spinner {
                margin: 5px auto;
                height: 40px;
                display: grid;
                place-items: center;
                .signin-spinner-icon {
                  color: #fff;
                  font-size: 22px;
                  animation: spin 1s infinite;
                }
              }
            }
            .signin-links-wrapper {
              display: flex;
              justify-content: space-evenly;
              margin: 25px 0;
              .signin-links {
                text-decoration: none;
                font-size: 14px;
                color: var(--secondary-font-color);
                &:hover {
                  color: var(--primary-font-color);
                }
              }
            }
            .line-wrapper {
              display: flex;
              justify-content: center;
              margin: 5px;
              .line {
                position: relative;
                width: 100%;
                height: 1px;
                background: var(--secondary-font-color);
                &::before {
                  content: 'or';
                  display: grid;
                  place-items: center;
                  width: 30px;
                  height: 30px;
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  right: 0;
                  left: 0;
                  margin: auto;
                  font-size: 14px;
                  background: var(--primary);
                  color: var(--secondary-font-color);
                  border: 1px solid var(--secondary-font-color);
                  border-radius: 50%;
                }
              }
            }
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .signin {
            background: var(--primary);
            .signin-wrapper {
              width: 100%;
              box-shadow: unset;
            }
          }
        }
      `}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie('chat-app-user-session', { req, res });

  const { data } = await client.query({
    query: GET_CURRENT_USER,
    context: {
      headers: {
        authorization: token ? `bearer ${token}` : undefined,
      },
    },
  });

  if (data.getCurrentUser) {
    return {
      redirect: {
        permanent: false,
        destination: '/chat',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
