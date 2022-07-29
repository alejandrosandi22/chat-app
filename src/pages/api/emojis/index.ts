import { NextApiRequest, NextApiResponse } from 'next';

export default async function GetEmojis(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `https://emoji-api.com/emojis?access_key=${process.env.EMOJIS_ACCESS_KEY}`;

  const emojisRes = await fetch(url);
  const json = await emojisRes.json();

  res.status(200).json(json);
}
