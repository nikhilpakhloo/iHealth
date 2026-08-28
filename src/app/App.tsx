import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from '../navigation/RootNavigator';
import { ErrorBoundary } from '../core/error/ErrorBoundary';
import { SyncManager } from '../core/offline/SyncManager';
import { Toast } from '../shared/components/Toast';

const queryClient = new QueryClient();

export const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(() => {
    SyncManager.init();
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
        </QueryClientProvider>
        <Toast />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
