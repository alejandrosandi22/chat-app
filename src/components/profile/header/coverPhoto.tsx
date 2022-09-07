import { uploadFile } from '../../../firebase/client';
import useUpdateUser from 'hooks/user/useUpdateUser';
import { useState } from 'react';
import { UserType } from 'types';
import refetchQueries from 'services/refetchQueries';

interface CoverPhotoProps {
  user: UserType;
  currentUser: UserType;
}

export default function CoverPhoto({ user, currentUser }: CoverPhotoProps) {
  const { updateUser } = useUpdateUser();
  const [coverPhoto, setCoverPhoto] = useState<string | null>(user.cover_photo);

  const handleDeleteCoverPhoto = async () => {
    await updateUser({
      onCompleted: async ({ updateUser }) => {
        await refetchQueries();
        setCoverPhoto(updateUser.cover_photo);
      },
      variables: {
        coverPhoto: null,
      },
    });
  };

  const handleUpdateCoverPhoto = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const file: File = e.target.files[0];

    if (file.size > 5000000) {
      alert('File is too big');
      return;
    }
    await uploadFile({
      file,
      fileName: `/cover-photo/${currentUser.username}-cover-photo`,
    }).then(async (res) => {
      await updateUser({
        onCompleted({ updateUser }) {
          setCoverPhoto(updateUser.cover_photo);
        },
        variables: {
          coverPhoto: res?.url,
        },
      });
    });
  };

  return (
    <>
      <section>
        {currentUser.id === user.id && (
          <span>
            <input
              type='file'
              id='coverPhoto'
              onChange={handleUpdateCoverPhoto}
              hidden
              accept='image/*'
            />
            <label htmlFor='coverPhoto'>
              <i className='fal fa-upload' />
            </label>
            <button onClick={handleDeleteCoverPhoto}>
              <i className='fal fa-trash' />
            </button>
          </span>
        )}
        {coverPhoto && <img src={coverPhoto} alt='cover-photo' />}
      </section>
      <style jsx>{`
        section {
          position: relative;
          width: 100%;
          height: 45vh;
          &:hover {
            span {
              opacity: 1;
            }
          }
          span {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30px;
            background: linear-gradient(rgba(0, 0, 0, 0), var(--background));
            display: flex;
            align-items: center;
            justify-content: flex-end;
            opacity: 0;
            transition: 0.5s;
            &:hover {
              opacity: 1;
            }
            label,
            button {
              border: none;
              background: transparent;
              cursor: pointer;
              outline: none;
              margin: 0 10px;
              i {
                color: var(--primary-font-color);
                font-size: 1.25rem;
              }
            }
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        @media (max-width: 768px) {
          section {
            height: 30vh;
          }
        }
      `}</style>
    </>
  );
}
