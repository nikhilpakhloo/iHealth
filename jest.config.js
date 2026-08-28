module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native(-community)?|@react-navigation|@shopify/flash-list|react-native-mmkv)/'
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
