import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Image, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppTheme, AppTheme } from '../../../core/theme/useDarkTheme';
import { groupRecordsForTimeline, TimelineItem } from '../utils/grouping';
import { useRecords } from '../hooks/useRecords';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { useTranslation } from 'react-i18next';

export const TimelineScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { t } = useTranslation();
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useRecords();

  const records = useMemo(() => {
    return data?.pages.flatMap(page => page.data) ?? [];
  }, [data]);

  // Group and flatten the records (including search filter locally)
  const groupedData = useMemo(
    () => groupRecordsForTimeline(records, debouncedSearch),
    [records, debouncedSearch]
  );

  const renderItem = ({ item }: { item: TimelineItem }) => {
    if (item.type === 'header') {
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{item.title}</Text>
        </View>
      );
    }

    const { record } = item;
    const date = new Date(record.date).toLocaleDateString();

    return (
      <View style={styles.recordCard}>
        <View style={styles.recordContent}>
          <Text style={styles.recordType}>{t(record.type)}</Text>
          <Text style={styles.recordDate}>{date}</Text>
          <Text style={styles.recordDesc} numberOfLines={2}>{record.description}</Text>
        </View>
        {record.attachments.length > 0 && (
          <Image
            source={{ uri: record.attachments[0] }}
            style={styles.thumbnail}
          />
        )}
      </View>
    );
  };

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('Search records...')}
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : isError ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{t('Failed to load records.')}</Text>
          <Text style={styles.retryText} onPress={() => refetch()}>{t('Tap to retry')}</Text>
        </View>
      ) : (
        <FlashList
          data={groupedData}
          renderItem={renderItem}
          getItemType={(item) => item.type}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={{ padding: 20 }} color={theme.colors.primary} />
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{t('No records found')}</Text>
            </View>
          }
        />
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  listContent: {
    padding: theme.spacing.m,
  },
  headerContainer: {
    paddingVertical: theme.spacing.m,
    backgroundColor: theme.colors.surface,
  },
  headerText: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  recordCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  recordContent: {
    flex: 1,
    marginRight: theme.spacing.m,
  },
  recordType: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  recordDate: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.s,
  },
  recordDesc: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    marginBottom: 8,
  },
  retryText: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
