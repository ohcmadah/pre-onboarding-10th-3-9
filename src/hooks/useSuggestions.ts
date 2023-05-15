import { useEffect, useState } from 'react';
import { Suggestion } from '../@types';
import debounce from '../utils/debounce';
import { getSuggestions } from '../api/search';

const useSuggestions = (q: string, page: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setSuggestions([]);
    setHasMore(false);
  }, [q]);

  useEffect(() => {
    const trimmed = q.trim();
    if (!trimmed) {
      return undefined;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const debounced = debounce(async () => {
      setIsLoading(true);
      const data = await getSuggestions({ params: { q: trimmed, page }, signal });
      if (data) {
        setSuggestions((prev) => [...prev, ...data.result]);
        setHasMore((data.page - 1) * data.limit + data.qty < data.total);
      }
      setIsLoading(false);
    }, 500);
    debounced();

    return () => {
      debounced.clear();
      controller.abort();
    };
  }, [q, page]);

  return { isLoading, suggestions, hasMore };
};

export default useSuggestions;
