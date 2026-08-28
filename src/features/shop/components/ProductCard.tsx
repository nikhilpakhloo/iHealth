import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Product } from '../../../core/api/mockData';
import { theme } from '../../../core/theme';

interface ProductCardProps {
  product: Product;
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = theme.spacing.s;
const CARD_WIDTH = width / 2 - CARD_MARGIN * 3;

export const ProductCard = React.memo(({ product }: ProductCardProps) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: product.imageUrl }} 
        style={styles.image} 
        resizeMode="cover"
      />
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
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH, // Make it square
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
  },
});
