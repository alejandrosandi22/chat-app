export default async function searchEmojis({ search }: { search: string }) {
  const API_URL = `http://localhost:3000/api/emojis/search?search=${search}`;
  return await fetch(API_URL).then((res) => res.json());
}
