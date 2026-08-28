import { useState, useMemo, useEffect } from 'react';
import { Product } from '../../../core/api/mockData';
import { useDebounce } from '../../../core/hooks/useDebounce';

const PAGE_SIZE = 50;

export type SortOption = 'price_asc' | 'price_desc' | null;

export function useProductFilter(masterList: Product[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>(null);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredAndSortedProducts = useMemo(() => {
    let result = masterList;

    if (debouncedSearch) {
      const lowerSearch = debouncedSearch.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerSearch));
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (sortBy) {
      // Create a shallow copy before sorting to avoid mutating the master list
      result = [...result].sort((a, b) => {
        if (sortBy === 'price_asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    return result;
  }, [masterList, debouncedSearch, selectedCategory, sortBy]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedCategory, sortBy]);

  // Slice for infinite scroll simulation
  const paginatedProducts = filteredAndSortedProducts.slice(0, page * PAGE_SIZE);
  const hasMore = paginatedProducts.length < filteredAndSortedProducts.length;

  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredProducts: paginatedProducts,
    loadMore,
    hasMore,
    totalCount: filteredAndSortedProducts.length,
  };
}
