import useDeleteUser from 'hooks/user/useDeleteUser';
import { useState } from 'react';
import Input from './input';

interface ModalProps {
  setModalState: (modalState: boolean) => void;
}

export default function Modal({ setModalState }: ModalProps) {
  const [confirmation, setConfirmation] = useState<string>('');
  const { deleteUser, loading } = useDeleteUser();

  const handleCancel = async () => {
    setModalState(false);
  };

  const handleDelete = async () => {
    if (confirmation === 'I confirm that I am about to delete my account') {
      await deleteUser();
    }
  };

  return (
    <>
      <div className='modal-bg'>
        <div className='modal'>
          <header>
            <h1 className='modal-title'>Delete Account</h1>
          </header>
          <main className='delete__account__main'>
            <p className='delete__account__text'>
              Are you sure you want to delete your account? Deleting your
              account is permanent.
            </p>

            <p className='delete__account__text__confirmation'>
              Type{' '}
              <strong>I confirm that I am about to delete my account</strong> to
              confirm
            </p>
            <div className='delete__account__input__wrapper'>
              <Input
                id='confirmation'
                type='text'
                name='confirmation'
                placeholder='Confirmation'
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
              />
            </div>
            <div className='delete__account__button__wrapper'>
              {loading ? (
                <i className='fal fa-spinner-third' />
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className='delete__account__button'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className='delete__account__button'
                  >
                    Yes, delete account
                  </button>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
      <style jsx>{`
        .modal-bg {
          z-index: 70;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          animation: show 0.1s ease-in-out both;
          .modal {
            width: 500px;
            aspect-ratio: 4 / 3;
            background: var(--primary);
            border-radius: 5px;
            border: 1px solid var(--secondary);
            animation: show 0.3s ease-in-out both;
            header {
              width: 100%;
              height: 60px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 20px 30px;
              border-bottom: 1px solid var(--border-color);
              .modal-title {
                color: var(--primary-font-color);
                font-size: 26px;
                font-weight: 300;
              }
            }
            .delete__account__main {
              height: calc(100% - 60px);
              padding: 20px;
              .delete__account__text {
                color: var(--primary-font-color);
                font-size: 18px;
                font-weight: 300;
                height: 100px;
              }
              .delete__account__text__confirmation {
                color: var(--primary-font-color);
                font-size: 16px;
                font-weight: 300;
                strong {
                  font-weight: 500;
                }
              }
              .delete__account__input__wrapper {
                width: 100%;
                height: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                .delete__account__input {
                  width: 355px;
                  border: 1px solid var(--secondary);
                  background: var(--primary);
                  height: 30px;
                  border-radius: 2px;
                  color: var(--primary-font-color);
                  padding: 0 10px;
                  &:focus-visible,
                  &:focus {
                    outline: none;
                    border: 1px solid var(--primary-font-color);
                  }
                }
              }
            }
            .delete__account__button__wrapper {
              width: 100%;
              height: 60px;
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              .delete__account__button {
                width: 100px;
                height: 30px;
                border: none;
                &:not(:last-child) {
                  border: 1px solid var(--secondary);
                }
                background: var(--primary);
                border-radius: 2px;
                color: var(--white);
                font-size: 16px;
                font-weight: 300;
                &:nth-child(2) {
                  background: #b3312a;
                  width: 200px;
                  &:hover {
                    background: #e22e24;
                    color: var(--white);
                  }
                }
                &:hover {
                  background: var(--secondary);
                }
              }
            }
          }
        }

        @keyframes show {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .delete__account__bg {
            background: rgba(0, 0, 0, 0.9);
            .delete__account__container {
              width: 100%;
              height: auto;
              aspect-ratio: unset;
            }
          }
        }
      `}</style>
    </>
  );
}
