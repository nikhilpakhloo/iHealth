import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const RecordsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Records</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
