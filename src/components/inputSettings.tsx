/* eslint-disable @typescript-eslint/no-explicit-any */
import useUpdateUser from 'hooks/user/useUpdateUser';
import { FormEvent, useEffect, useState } from 'react';
import handleUpdate from 'services/update';

const INTIAL_VALUE = {
  name: '',
  username: '',
  description: '',
  website: '',
};

interface InputSettingsProps {
  user: any;
  setUser: any;
  type: string;
}

export default function InputSettings({
  user,
  setUser,
  type,
}: InputSettingsProps) {
  const [disabledInput, setDisabledInput] = useState<any>({
    name: true,
    username: true,
    description: true,
    website: true,
  });
  const { updateUser, loading } = useUpdateUser();
  const [currentData, setCurrentData] = useState<any>(INTIAL_VALUE);

  useEffect(() => {
    setCurrentData(user);
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdate({
      user,
      currentData,
      updateUser,
      key: e.currentTarget.id,
    });
    setDisabledInput({
      ...disabledInput,
      [type]: true,
    });
  };
  return (
    <>
      <form
        id={type}
        onSubmit={handleSubmit}
        className='settings-content-wrapper'
      >
        <div className='settings-content-text'>
          <span className='settings-content-title settings-content-profile-information-title'>
            {type}
          </span>
        </div>
        {loading ? (
          <i className='fal fa-spinner-third settings-loading' />
        ) : (
          <input
            type='text'
            disabled={disabledInput[type]}
            className={`settings-content-input ${
              !disabledInput[type] ? 'settings-content-input-enable' : ''
            }`}
            value={user[type]}
            onChange={(e) => {
              setUser({ ...user, [type]: e.target.value });
            }}
          />
        )}
        {disabledInput[type] ? (
          <button
            type='button'
            onClick={() => {
              setDisabledInput({
                ...disabledInput,
                [type]: false,
              });
            }}
            className='settings-content-button'
          >
            change
          </button>
        ) : (
          <div className='settings-content-button-action-wrapper'>
            <button type='submit' className='settings-content-button-action'>
              <i className='fal fa-check' />
            </button>
            <button
              type='button'
              onClick={() => {
                setDisabledInput({
                  ...disabledInput,
                  [type]: true,
                });
                setUser({ ...user, [type]: currentData[type] });
              }}
              className='settings-content-button-action'
            >
              <i className='fal fa-times' />
            </button>
          </div>
        )}
      </form>
      <style jsx>{`
        .settings-content-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 32px;
          height: 50px;
          border-bottom: 1px solid var(--primary);
          .settings-content-text {
            .settings-content-title {
              font-size: 16px;
              font-weight: normal;
              color: var(--primary-font-color);
              text-transform: capitalize;
            }
            .settings-content-profile-information-title {
              display: block;
              width: 100px;
            }
            .settings-content-subtitle {
              font-size: 12px;
              font-weight: normal;
              color: var(--secondary-font-color);
            }
          }
          .settings-content-input {
            border: none;
            width: 300px;
            height: 30px;
            padding: 0 8px;
            font-size: 16px;
            font-weight: normal;
            color: var(--primary-font-color);
            background: transparent;
            outline: none;
            transition: 0.25s;
            text-align: center;
            text-overflow: ellipsis;
          }
          .settings-content-input-enable {
            background: var(--background);
          }
          .settings-loading {
            color: var(--primary-font-color);
          }
          .settings-content-button {
            background: var(--primary);
            color: var(--primary-font-color);
            border: none;
            font-size: 16px;
            width: 80px;
            height: 30px;
            border: 1px solid var(--secondary);
            font-weight: normal;
            &:hover {
              background: var(--secondary);
            }
          }
          .settings-content-button-action-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 80px;
            .settings-content-button-action {
              background: var(--primary);
              color: var(--primary-font-color);
              border: none;
              font-size: 16px;
              width: 35px;
              height: 30px;
              border: 1px solid var(--secondary);
              &:hover {
                background: var(--secondary);
              }
            }
          }
        }
      `}</style>
    </>
  );
}
