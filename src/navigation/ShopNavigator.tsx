import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductListScreen } from '../features/shop/screens/ProductListScreen';
import { useAppTheme } from '../core/theme/useDarkTheme';

export type ShopStackParamList = {
  ProductList: undefined;
};

const Stack = createNativeStackNavigator<ShopStackParamList>();

export const ShopNavigator = () => {
  const theme = useAppTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#FFFFFF',
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          title: 'Shop',
        }}
      />
    </Stack.Navigator>
  );
};
