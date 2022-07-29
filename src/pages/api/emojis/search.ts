import { NextApiRequest, NextApiResponse } from 'next';

export default async function GetEmojis(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.query;

  const url = `https://emoji-api.com/emojis?search=${search}&access_key=${process.env.EMOJIS_ACCESS_KEY}`;

  const emojis = await fetch(url);
  const json = await emojis.json();

  res.status(200).json(json);
}
