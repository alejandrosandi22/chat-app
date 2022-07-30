import { MessageType, UserType } from 'types';

export default async function getContacts(userId: number) {
  const data: UserType[] = [
    {
      id: 1,
      name: 'Deno',
      email: 'jondoe@gmail.com',
      username: 'johndoe',
      avatar: 'https://deno.land/logo.svg?__frsh_c=2cv7hytwns90',
      contacts: [2, 3, 5],
    },
    {
      id: 2,
      name: 'Denon',
      email: 'jondoe@gmail.com',
      username: 'johndoe',
      avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
      contacts: [1, 3],
    },
    {
      id: 3,
      name: 'Deno',
      email: '',
      username: 'janedoe',
      avatar: 'https://deno.com/deploy/feature_01.jpeg',
      contacts: [1, 2],
    },
    {
      id: 4,
      name: 'Jane Doe',
      email: '',
      username: 'janedoe',
      avatar: 'https://i.ibb.co/vv2yvRz/denon.png',
      contacts: [],
    },
    {
      id: 5,
      name: 'VelociRaptor',
      email: '',
      username: 'janedoe',
      avatar: 'https://velociraptor.run/images/vr-logo.svg',
      contacts: [1],
    },
  ];

  const contacts = data.filter((user) => user.contacts.includes(userId));

  const getLastContactMessage = async (id: number) => {
    const response: Response = await fetch(
      `http://localhost:3000/api/test/${userId}?offset=last&contactId=${id}`
    );
    const data: MessageType = await response.json();
    return data;
  };

  const contactsWithLastMessage = await Promise.all(
    contacts.map(async (contact) => {
      const lastMessage = await getLastContactMessage(contact.id);
      return { ...contact, lastMessage };
    })
  );

  return contactsWithLastMessage;
}
