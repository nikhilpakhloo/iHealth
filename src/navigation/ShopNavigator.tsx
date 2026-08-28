import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductListScreen } from '../features/shop/screens/ProductListScreen';
import { CartScreen } from '../features/shop/screens/CartScreen';
import { useCartStore } from '../features/shop/store/useCartStore';
import { theme } from '../core/theme';

const Stack = createNativeStackNavigator();

export const ShopNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.background,
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          title: 'Shop',
          headerRight: () => <CartButton />,
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Shopping Cart',
        }}
      />
    </Stack.Navigator>
  );
};

const CartButton = () => {
  const navigation = useNavigation<any>();
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <Text style={{ color: theme.colors.background, fontWeight: 'bold' }}>
        Cart ({itemCount})
      </Text>
    </TouchableOpacity>
  );
};
