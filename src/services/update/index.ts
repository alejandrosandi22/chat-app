/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserType } from 'types';

interface UpdateType {
  user: UserType;
  currentData: UserType;
  updateUser: any;
  key: string;
}

const handleUpdate = async ({
  user,
  currentData,
  updateUser,
  key,
}: UpdateType) => {
  switch (key) {
    case 'name':
      if (user.name !== '' && user.name !== currentData.name) {
        await updateUser({
          variables: {
            name: user.name,
          },
        });
      }
      break;

    case 'username':
      if (user.username !== '' && user.username !== currentData.username) {
        await updateUser({
          variables: {
            username: user.username,
          },
        });
      }
      break;

    case 'description':
      if (
        user.description !== '' &&
        user.description !== currentData.description
      ) {
        await updateUser({
          variables: {
            description: user.description,
          },
        });
      }
      break;

    case 'website':
      if (user.website !== '' && user.website !== currentData.website) {
        await updateUser({
          variables: {
            website: user.website,
          },
        });
      }
      break;

    default:
      break;
  }
};

export default handleUpdate;
