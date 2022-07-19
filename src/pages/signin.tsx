import { useState } from 'react';
import AppLayout from 'common/appLayout';
import Input from 'components/input';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
      <AppLayout title='Chat App | Sign In'>
        <div className='signin'>
          <div className='signin-wrapper'>
            <form className='signin-form'>
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
              <button className='signin-button' type='submit'>
                Sign In
              </button>
            </form>
            <div className='signin-links-wrapper'>
              <a className='signin-links' href='/signup'>
                Forgot your password?
              </a>
              <a className='signin-links' href='/forgot-password'>
                Don&apos;t have an account?
              </a>
            </div>
            <div className='line'></div>
            <div className='signin-social-wrapper'>
              <a href='/' className='signin-social-item facebook'>
                <i className='fab fa-facebook signin-social-item-icon' />
                <span className='signin-social-item-caption'>
                  Sign In With Facebook
                </span>
              </a>
              <a href='/' className='signin-social-item google'>
                <i className='fab fa-google signin-social-item-icon' />
                <span className='signin-social-item-caption'>
                  Sign In With Google
                </span>
              </a>
              <a href='/' className='signin-social-item github'>
                <i className='fab fa-github signin-social-item-icon' />
                <span className='signin-social-item-caption'>
                  Sign In With Github
                </span>
              </a>
            </div>
          </div>
        </div>
      </AppLayout>
      <style jsx>{`
        .signin {
          position: absolute;
          background: var(--background);
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
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
                margin: 0 auto;
                font-size: 16px;
                width: 140px;
                height: 40px;
                border: 0;
                background: var(--white);
                color: var(--primary);
                &:hover {
                  background: var(--secondary-font-color);
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
            .line {
              position: relative;
              display: block;
              width: 100%;
              height: 1px;
              background: var(--secondary-font-color);
              &::before {
                content: 'or';
                display: grid;
                place-items: center;
                width: 35px;
                height: 35px;
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                margin: auto;
                font-size: 16px;
                background: var(--primary);
                color: var(--secondary-font-color);
                border: 1px solid var(--secondary-font-color);
                border-radius: 50%;
              }
            }
            .signin-social-wrapper {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: 40px 0 20px 0;
              gap: 20px;
              .signin-social-item {
                text-decoration: none;
                display: flex;
                align-items: center;
                width: 250px;
                height: 40px;
                padding: 5px 10px;
                gap: 10px;
                background: var(--primary);
                color: var(--primary-font-color);
                .signin-social-item-icon {
                  font-size: 20px;
                  display: flex;
                  align-items: center;
                  width: 30px;
                  height: 100%;
                  border-right: 1px solid var(--white);
                }
                .signin-social-item-caption {
                }
                &:hover {
                  filter: brightness(0.95);
                }
              }
              .facebook {
                background: #3b5998;
              }
              .google {
                background: #dd4b39;
              }
              .github {
                background: #222222;
              }
            }
          }
        }

        @media (max-width: 768px) {
          .signin {
            background: var(--primary);
            .signin-wrapper {
              width: 100%;
            }
          }
        }
      `}</style>
    </>
  );
}
