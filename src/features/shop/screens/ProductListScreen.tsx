import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ProductCard } from '../components/ProductCard';
import { theme } from '../../../core/theme';
import { Product, mockDatabase } from '../../../core/api/mockData';
import { useProductFilter, SortOption } from '../hooks/useProductFilter';

const CATEGORIES = ['All', 'Medicine', 'Equipment', 'Vitamins', 'Ayurvedic', 'Personal Care'];

export const ProductListScreen = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredProducts,
    loadMore,
    hasMore,
    totalCount,
  } = useProductFilter(mockDatabase.products);

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor={theme.colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {CATEGORIES.map(cat => {
            const isSelected = (cat === 'All' && !selectedCategory) || cat === selectedCategory;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryPill, isSelected && styles.categoryPillSelected]}
                onPress={() => setSelectedCategory(cat === 'All' ? null : cat)}
              >
                <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => {
            setSortBy(prev => {
              if (prev === 'price_asc') return 'price_desc';
              if (prev === 'price_desc') return null;
              return 'price_asc';
            });
          }}
        >
          <Text style={styles.sortButtonText}>
            {sortBy === 'price_asc' ? 'Price ↑' : sortBy === 'price_desc' ? 'Price ↓' : 'Sort'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.resultCount}>{totalCount} results</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlashList
        data={filteredProducts}
        renderItem={renderItem}
        numColumns={2}
        onEndReached={() => {
          if (hasMore) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  headerContainer: {
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchInput: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    marginBottom: theme.spacing.s,
    ...theme.typography.body,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  categoryScroll: {
    flex: 1,
    marginRight: theme.spacing.s,
  },
  categoryPill: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.s,
  },
  categoryPillSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    ...theme.typography.caption,
    color: theme.colors.text,
  },
  categoryTextSelected: {
    color: theme.colors.surface,
  },
  sortButton: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sortButtonText: {
    ...theme.typography.caption,
    color: theme.colors.text,
    fontWeight: '600',
  },
  resultCount: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  listContent: {
    padding: theme.spacing.s,
  },
});
