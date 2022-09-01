import AppLayout from 'common/appLayout';
import Input from 'components/input';
import useForgetPassword from 'hooks/user/useForgetPassword';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [sended, setSended] = useState<boolean>(false);
  const { forgetPassword, loading, error } = useForgetPassword();

  const handleForgetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await forgetPassword({
      onCompleted: () => {
        setEmail('');
        setSended(true);
      },
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
            <p className='subtitle'>
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
            {error && <p className='error-message'>{error.message}</p>}
            {loading ? (
              <section className='spin-wrapper'>
                <i className='fal fa-spinner-third' />
              </section>
            ) : (
              <>
                {!sended ? (
                  <button type='submit'>Send</button>
                ) : (
                  <span>Recovery link sent to your email</span>
                )}
              </>
            )}

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
              color: var(--primary-font-color);
              margin-bottom: 1rem;
            }
            .subtitle {
              text-align: center;
              font-size: 1rem;
              font-weight: 400;
              color: var(--primary-font-color);
              margin-bottom: 2rem;
            }
            .error-message {
              text-align: center;
              font-size: 1rem;
              font-weight: 400;
              color: var(--red);
              margin-top: 10px;
            }
            button {
              margin: 15px auto;
              font-size: 16px;
              width: 140px;
              height: 40px;
              font-weight: normal;
              border: 0;
              background: var(--primary-font-color);
              color: var(--primary);
              &:hover {
                background: var(--secondary);
              }
            }
            span,
            .spin-wrapper {
              display: block;
              text-align: center;
              margin: 15px auto;
              font-size: 16px;
              width: 100%;
              height: 40px;
              color: var(--primary-font-color);
            }
            .spin-wrapper {
              i {
                font-size: 20px;
                color: var(--primary-font-color);
                animation: spin 1s infinite;
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

        @media (max-width: 768px) {
          .forgot-password {
            form {
              padding: 0 5px;
              box-shadow: none;
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
