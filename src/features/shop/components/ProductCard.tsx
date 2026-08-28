import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Product } from '../../../core/api/mockData';
import { useAppTheme, AppTheme } from '../../../core/theme/useDarkTheme';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = width / 2 - CARD_MARGIN * 3;

const getStyles = (theme: AppTheme) => StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    marginHorizontal: CARD_MARGIN / 2,
    marginBottom: CARD_MARGIN,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  loaderContainer: {
    position: 'absolute',
  },
  infoContainer: {
    padding: theme.spacing.m,
  },
  name: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  price: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.s,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: theme.colors.error,
  },
  addButtonText: {
    ...theme.typography.caption,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  const [loading, setLoading] = useState(true);
  const theme = useAppTheme();
  const styles = getStyles(theme);
  
  const isInCart = useCartStore(
    state => state.items.some(item => item.product.id === product.id)
  );

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        )}
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
          onLoad={() => setLoading(false)}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.price}>
          ₹{product.price}
        </Text>

        <TouchableOpacity
          style={[styles.addButton, isInCart && styles.removeButton]}
          onPress={() => {
            if (isInCart) {
              useCartStore.getState().removeItem(product.id);
            } else {
              useCartStore.getState().addItem(product);
            }
          }}
        >
          <Text style={styles.addButtonText}>
            {isInCart ? 'Remove' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

