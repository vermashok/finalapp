
import React from 'react';
import { useFonts, Raleway_400Regular, Raleway_700Bold } from '@expo-google-fonts/raleway';
import AppNavigator from './navigation/AppNavigator';
import ErrorBoundary from './components/ErrorBoundary';
import useCheckAuth from './hooks/useCheckAuth';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });
  const { isAuthenticated, loading } = useCheckAuth();

  if (!fontsLoaded || loading) {
    return null;
  }
  
  return (
    <ErrorBoundary>
      <AppNavigator isAuthenticated={isAuthenticated} />
    </ErrorBoundary>
  );
}

export default App;
