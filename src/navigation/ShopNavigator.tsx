import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductListScreen } from '../features/shop/screens/ProductListScreen';
import { CartScreen } from '../features/shop/screens/CartScreen';
import { useAppTheme } from '../core/theme/useDarkTheme';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../features/shop/store/useCartStore';

export type ShopStackParamList = {
  ProductList: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<ShopStackParamList>();

const CartButton = () => {
  const navigation = useNavigation<any>();
  const itemsCount = useCartStore((state) => state.items.length);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
      <Text style={styles.cartIcon}>🛒</Text>
      {itemsCount > 0 && (
        <Text style={styles.badge}>{itemsCount}</Text>
      )}
    </TouchableOpacity>
  );
};

const renderCartButton = () => <CartButton />;

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
          headerRight: renderCartButton
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Shopping Cart' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#FF5252',
    color: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});
