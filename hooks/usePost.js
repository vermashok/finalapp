import { useState, useCallback } from 'react';
import { API_BASE_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function usePost(postId) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    if (!postId) {
      setError('Invalid post ID');
      setPost(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}posts/${postId}`, {
        headers: { 'x-auth-token': token }
      });
      if (!res.ok) throw new Error('Failed to fetch post');
      const data = await res.json();
      setPost(data);
    } catch (err) {
      setError(err.message);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const fetchComments = useCallback(async () => {
    if (!postId) {
      setComments([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}posts/${postId}/comments`, {
        headers: { 'x-auth-token': token }
      });
      if (!res.ok) throw new Error('Failed to fetch comments');
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  return { post, comments, loading, error, fetchPost, fetchComments };
}
