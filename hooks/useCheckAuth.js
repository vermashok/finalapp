import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useCheckAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      setIsAuthenticated(!!token);
      setLoading(false);
    });
  }, []);

  return { isAuthenticated, loading };
}
