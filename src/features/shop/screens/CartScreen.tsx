import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useCartStore } from '../store/useCartStore';
import { useAppTheme, AppTheme } from '../../../core/theme/useDarkTheme';
import { MockApiClient } from '../../../core/api/mockClient';

export const CartScreen = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    try {
      await MockApiClient.simulateNetwork();
      Alert.alert('Success', 'Order placed successfully!');
      clearCart();
    } catch {
      // Handled globally by mockClient interceptor
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemList}>
        {items.map((item) => (
          <View key={item.product.id} style={styles.cartItem}>
            <Image source={{ uri: item.product.imageUrl }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
              <Text style={styles.itemPrice}>₹{item.product.price}</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityBtn}
                  onPress={() => {
                    if (item.quantity === 1) {
                      removeItem(item.product.id);
                    } else {
                      updateQuantity(item.product.id, item.quantity - 1);
                    }
                  }}
                >
                  <Text style={styles.quantityBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityBtn}
                  onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
                >
                  <Text style={styles.quantityBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>₹{getTotal()}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutBtnText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  emptyText: {
    ...theme.typography.h2,
    color: theme.colors.textSecondary,
  },
  itemList: {
    flex: 1,
    padding: theme.spacing.m,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
  },
  itemDetails: {
    flex: 1,
    marginLeft: theme.spacing.m,
    justifyContent: 'space-between',
  },
  itemName: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  itemPrice: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.s,
  },
  quantityBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quantityBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  quantityText: {
    ...theme.typography.body,
    marginHorizontal: theme.spacing.m,
    color: theme.colors.text,
  },
  footer: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  totalLabel: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  totalAmount: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  checkoutBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutBtnText: {
    ...theme.typography.h3,
    color: '#FFF',
  },
});
