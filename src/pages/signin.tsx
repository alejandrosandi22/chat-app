import { useEffect, useState } from 'react';
import AppLayout from 'common/appLayout';
import Input from 'components/input';
import SocialSignIn from 'components/socialSignIn';
import Link from 'next/link';
import useSignIn from 'hooks/auth/useSignIn';
import Loading from 'components/loading';
import useAuth from 'hooks/auth/useAuth';
import { useRouter } from 'next/router';

export function SignInForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signIn, loading, error } = useSignIn();

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
          {error && <p className='signin-error'>{error.message}</p>}
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
      <style jsx>{`
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
            .signin-error {
              color: var(--red);
              font-size: 16px;
              text-align: center;
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

        @media (max-width: 768px) {
          .signin-wrapper {
            width: 100%;
            box-shadow: unset;
            padding: 30px 20px;
            .signin-links-wrapper {
              .signin-links {
                white-space: nowrap;
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
      `}</style>
    </>
  );
}

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!currentUser && !loading) setIsLoading(false);
    if (currentUser) router.push('/chat');
  }, [currentUser, loading]);

  if (isLoading) return <Loading />;

  return (
    <>
      <AppLayout title='Chat App | Sign In'>
        <div className='signin'>
          <SignInForm />
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
