import { useQuery } from '@apollo/client';
import { SEARCH_USERS } from 'graphql/queries';

export default function useSearch(search: string) {
  const { data, loading, error } = useQuery(SEARCH_USERS, {
    onError(error) {
      console.error(error.message);
    },
    variables: { search },
  });
  return { data: search === '' ? null : data, loading, error };
}
