import { useState, useCallback } from 'react';
import { API_BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}posts?page=${reset ? 1 : page}&limit=10`, {
        headers: { 'x-auth-token': token }
      });
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(prev => reset ? data : [...prev, ...data]);
      setHasMore(data.length === 10);
      if (reset) setPage(2); else setPage(p => p + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const refresh = useCallback(() => fetchPosts(true), [fetchPosts]);

  return { posts, loading, error, fetchPosts, refresh, hasMore };
}
