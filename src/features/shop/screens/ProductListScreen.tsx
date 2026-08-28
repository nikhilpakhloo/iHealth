import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react-native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { mockDatabase, Product } from '../../../core/api/mockData';
import { useAppTheme, AppTheme } from '../../../core/theme/useDarkTheme';
import { ProductCard } from '../components/ProductCard';
import { FlashList } from '@shopify/flash-list';

const CATEGORIES = ['All', 'Ayurvedic Medicine', 'Supplements', 'Personal Care', 'Herbal Teas', 'Oils'];

export const ProductListScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useAppTheme();
  const styles = getStyles(theme);

  // Use useMemo to prevent re-filtering on every render unless category/search changes
  const filteredProducts = useMemo(() => {
    let result = mockDatabase.products;
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.cardWrapper}>
      <ProductCard product={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Search size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipSelected,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlashList
        data={filteredProducts}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const getStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  searchContainer: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.m,
  },
  searchIcon: {
    marginRight: theme.spacing.s,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.m,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  categories: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    marginRight: theme.spacing.s,
  },
  categoryChipSelected: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  categoryTextSelected: {
    color: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.s,
  },
  cardWrapper: {
    flex: 1,
    padding: theme.spacing.s,
  },
});
