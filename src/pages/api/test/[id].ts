import { NextApiRequest, NextApiResponse } from 'next';

const data = [
  {
    id: '1',
    sender: '1',
    receiver: '2',
    type: 'text',
    content: 'Hello',
    created_at: '2022-07-20 15:35:01.48249',
  },
  {
    id: '2',
    sender: '2',
    receiver: '1',
    type: 'text',
    content: 'Hello',
    created_at: '2022-07-20 15:40:01.48249',
  },
  {
    id: '3',
    sender: '2',
    receiver: '1',
    type: 'sticker',
    content:
      'https://i.pinimg.com/originals/20/6c/7e/206c7e5bf9d5d1a97a51cb2fbe174050.png',
    created_at: '2022-07-20 15:41:01.48249',
  },
  {
    id: '4',
    sender: '1',
    receiver: '2',
    type: 'video',
    content: '/Turi-ip-ip.mp4',
    created_at: '2022-07-20 15:50:01.48249',
  },
  {
    id: '5',
    sender: '2',
    receiver: '1',
    type: 'video',
    content:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    created_at: '2022-07-21 15:50:01.48249',
  },
  {
    id: '6',
    sender: '1',
    receiver: '2',
    type: 'image',
    content: '/office_illustration.png',
    created_at: '2022-07-21 16:00:01.48249',
  },
  {
    id: '7',
    sender: '2',
    receiver: '1',
    type: 'audio',
    content:
      'http://www.sonidosmp3gratis.com/sounds/kendo-kadoni-ringtones-prueba-sonido-de.mp3',
    created_at: '2022-07-21 16:01:01.48249',
  },
  {
    id: '8',
    sender: '1',
    receiver: '2',
    type: 'audio',
    content:
      'http://www.sonidosmp3gratis.com/sounds/kendo-kadoni-ringtones-prueba-sonido-de.mp3',
    created_at: '2022-07-22 11:01:01.48249',
  },
  {
    id: '9',
    sender: '1',
    receiver: '3',
    type: 'audio',
    content:
      'http://www.sonidosmp3gratis.com/sounds/kendo-kadoni-ringtones-prueba-sonido-de.mp3',
    created_at: '2022-07-21 16:05:01.48249',
  },
  {
    id: '10',
    sender: '1',
    receiver: '2',
    type: 'text',
    content: 'Hi 😀',
    created_at: '2022-07-27 11:01:01.48249',
  },
];

export default function Test(req: NextApiRequest, res: NextApiResponse) {
  const { id: contactId } = req.query;

  const filterData = data.filter(
    (item) => item.sender === contactId || item.receiver === contactId
  );

  const getDate = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1 < 10 ? 0 : ''}${
      dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;
  };

  let date = '';

  const response = filterData.map((item) => {
    if (date !== getDate(item.created_at)) {
      date = getDate(item.created_at);
      return {
        date: item.created_at,
        ...item,
      };
    }
    return item;
  });

  return res.status(200).json(response);
}
