import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Product } from '../../../core/api/mockData';
import { theme } from '../../../core/theme';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = theme.spacing.s;
const CARD_WIDTH = width / 2 - CARD_MARGIN * 3;

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  const [loading, setLoading] = React.useState(true);
  
  const isInCart = useCartStore(
    state => state.items.some(item => item.product.id === product.id)
  );

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
          resizeMode="cover"
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
        />
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={styles.category} numberOfLines={1}>
          {product.category}
        </Text>
        <Text style={styles.price}>
          ₹{product.price}
        </Text>

        <TouchableOpacity
          style={[styles.addButton, isInCart && styles.addedButton]}
          onPress={() => {
            if (isInCart) {
              useCartStore.getState().removeItem(product.id);
            } else {
              useCartStore.getState().addItem(product);
            }
          }}
        >
          <Text style={[styles.addButtonText, isInCart && styles.addedButtonText]}>
            {isInCart ? 'Remove' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    margin: CARD_MARGIN,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: theme.colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  infoContainer: {
    padding: theme.spacing.s,
  },
  name: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.xs / 2,
  },
  category: {
    ...theme.typography.caption,
    marginBottom: theme.spacing.xs,
  },
  price: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.xs,
    borderRadius: 4,
    alignItems: 'center',
  },
  addedButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  addButtonText: {
    ...theme.typography.caption,
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
  addedButtonText: {
    color: theme.colors.primary,
  },
});
