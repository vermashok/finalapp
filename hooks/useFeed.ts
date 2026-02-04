import { useState, useCallback } from 'react';
import { API_BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Post {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  title: string;
  likes: string[];
  commentsCount: number;
}

export default function useFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPosts = useCallback(async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}posts?page=${reset ? 1 : page}&limit=10`, {
        headers: { 'x-auth-token': token as string }
      });
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(prev => reset ? data : [...prev, ...data]);
      setHasMore(data.length === 10);
      if (reset) setPage(2); else setPage(p => p + 1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const refresh = useCallback(() => fetchPosts(true), [fetchPosts]);

  return { posts, loading, error, fetchPosts, refresh, hasMore };
}
