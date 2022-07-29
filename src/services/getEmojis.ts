export default async function getEmojis() {
  const API_URL = `http://localhost:3000/api/emojis`;

  return await fetch(API_URL).then(async (res) => {
    const data = await res.json();
    return data;
  });
}
