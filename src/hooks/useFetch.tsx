import { useEffect, useState, useCallback } from 'react';

export default function useFetch<T>(url: string, options?: object) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [url]);

  return { data, loading, error, refetch };
}
