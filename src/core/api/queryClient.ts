import { QueryClient } from '@tanstack/react-query';
import { createMMKV } from 'react-native-mmkv';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { Persister } from '@tanstack/react-query-persist-client';

const queryStorage = createMMKV({ id: 'react-query-cache' });

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2, // Retry failed requests twice
    },
  },
});

export const mmkvPersister: Persister = {
  persistClient: async (client) => {
    queryStorage.set('react-query-cache', JSON.stringify(client));
  },
  restoreClient: async () => {
    const cache = queryStorage.getString('react-query-cache');
    if (!cache) return undefined;
    return JSON.parse(cache);
  },
  removeClient: async () => {
    queryStorage.remove('react-query-cache');
  },
};

// Initialize persistence (this runs once on app load)
persistQueryClient({
  queryClient,
  persister: mmkvPersister,
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
});
