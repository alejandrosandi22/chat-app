import useErrorImage from 'hooks/useErrorImage';
import useGetCurrentUser from 'hooks/user/useGetCurrentUser';
import { useEffect, useState } from 'react';
import { UserType } from 'types';

export default function Avatar({ user }: { user: UserType }) {
  const [avatar, setAvatar] = useState<string>(user.avatar);
  const { imageOnError } = useErrorImage();
  const { currentUser } = useGetCurrentUser();

  useEffect(() => {
    setAvatar(user.avatar);
    if (user.id === currentUser.id) return;
    if (user.show_profile_photo === 'only-contacts') {
      if (!user.contacts.includes(currentUser.id))
        setAvatar('/static/images/user.png');
    }

    if (user.show_profile_photo === 'just-me') {
      if (user.id !== currentUser.id) setAvatar('/static/images/user.png');
    }
  }, [currentUser, user]);

  return (
    <>
      <img src={avatar} alt='avatar' onError={imageOnError} />
      <style jsx>{`
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          aspect-ratio: 1 / 1;
        }
      `}</style>
    </>
  );
}
