import AppLayout from 'common/appLayout';
import Input from 'components/input';
import useForgetPassword from 'hooks/user/useForgetPassword';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');

  const { forgetPassword } = useForgetPassword();

  const handleForgetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await forgetPassword({
      variables: {
        email,
      },
    });
  };

  return (
    <>
      <AppLayout title='Chat App | Forgot Password'>
        <div className='forgot-password'>
          <form onSubmit={handleForgetPassword}>
            <h1>Forgot your password?</h1>
            <p>
              Write your email that you signup to send you an recover email.
            </p>
            <Input
              type='email'
              id='forgot-password-email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit'>Send</button>
            <div className='links-wrapper'>
              <Link href='/signin'>
                <a className='links'>Go back</a>
              </Link>
            </div>
          </form>
        </div>
      </AppLayout>
      <style jsx>{`
        .forgot-password {
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
            button {
              margin: 15px auto;
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
            .links-wrapper {
              display: flex;
              justify-content: space-evenly;
              .links {
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
