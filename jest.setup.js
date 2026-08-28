jest.mock('react-native-mmkv', () => {
  return {
    createMMKV: jest.fn().mockReturnValue({
      set: jest.fn(),
      getString: jest.fn(),
      getNumber: jest.fn(),
      getBoolean: jest.fn(),
      contains: jest.fn(),
      delete: jest.fn(),
      getAllKeys: jest.fn(),
      clearAll: jest.fn(),
      remove: jest.fn(),
    }),
  };
});

jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: () => ({ isConnected: true }),
  fetch: () => Promise.resolve({ isConnected: true }),
  addEventListener: jest.fn(),
}));
