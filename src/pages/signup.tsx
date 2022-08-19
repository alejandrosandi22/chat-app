import { useMutation } from '@apollo/client';
import AppLayout from 'common/appLayout';
import Input from 'components/input';
import SocialSignIn from 'components/socialSignIn';
import { setCookie } from 'cookies-next';
import { SIGN_UP } from 'graphql/queries';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';

interface DataStateType {
  name: string;
  email: string;
  username: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const [data, setData] = useState<DataStateType>(() => ({
    name: '',
    email: '',
    username: '',
    password: '',
  }));
  const [handleSignUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      setCookie('chat-app-user-session', data.signUp.value);
      router.push('/chat');
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleSetData = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignUp({
      variables: data,
    });
  };

  return (
    <>
      <AppLayout title='Chat App | Sign Up'>
        <div className='signup'>
          <div className='signup-wrapper'>
            <form onSubmit={handleSubmit} className='signup-form'>
              <h1 className='signup-title'>Sign Up</h1>
              <div className='signup-input-wrapper'>
                <Input
                  type='text'
                  id='signup-name'
                  name='name'
                  placeholder='Name'
                  value={data.name}
                  onChange={handleSetData}
                />
                <Input
                  type='text'
                  id='signup-username'
                  name='username'
                  placeholder='Username'
                  value={data.username}
                  onChange={handleSetData}
                />
              </div>
              <div className='signup-input-wrapper'>
                <Input
                  type='email'
                  id='signup-email'
                  name='email'
                  placeholder='Email'
                  value={data.email}
                  onChange={handleSetData}
                />
                <Input
                  type='password'
                  id='signup-password'
                  name='password'
                  placeholder='Password'
                  value={data.password}
                  onChange={handleSetData}
                />
              </div>
              {loading ? (
                <div className='signin-spinner'>
                  <i className='fal fa-spinner-third signin-spinner-icon' />
                </div>
              ) : (
                <button className='signup-button' type='submit'>
                  Sign Up
                </button>
              )}
            </form>
            <div className='signup-links-wrapper'>
              <Link href='/signin'>
                <a className='signup-links'>Do you already have an account?</a>
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
        .signup {
          position: absolute;
          background: var(--primary);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .signup-wrapper {
            display: flex;
            flex-direction: column;
            width: 600px;
            height: 610px;
            background: var(--primary);
            box-shadow: var(--shadow);
            padding: 30px 40px;
            .signup-form {
              display: flex;
              flex-direction: column;
              gap: 20px;
              .signup-title {
                color: var(--primary-font-color);
                font-size: 35px;
              }
              .signup-input-wrapper {
                position: relative;
                width: 100%;
                display: flex;
                gap: 10px;
              }
              .signup-button {
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
            .signup-links-wrapper {
              display: flex;
              justify-content: space-evenly;
              margin: 25px 0;
              .signup-links {
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
          .signup {
            background: var(--primary);
            .signup-wrapper {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              box-shadow: unset;
              .signup-input-wrapper {
                flex-direction: column;
              }
            }
          }
        }
      `}</style>
    </>
  );
}
