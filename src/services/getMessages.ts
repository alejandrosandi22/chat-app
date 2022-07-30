import { MessageType } from 'types';

export default async function getMessages(id: number, contactId: number) {
  const response: Response = await fetch(
    `http://localhost:3000/api/test/${id}?limit=25&offset=5&contactId=${contactId}`
  );
  const data: MessageType[] = await response.json();
  return data;
}
