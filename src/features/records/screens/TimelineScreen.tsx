import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { mockDatabase } from '../../../core/api/mockData';
import { useAppTheme, AppTheme } from '../../../core/theme/useDarkTheme';
import { groupRecordsForTimeline, TimelineItem } from '../utils/grouping';

export const TimelineScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useAppTheme();
  const styles = getStyles(theme);

  // Group and flatten the 10,000 records
  const groupedData = useMemo(
    () => groupRecordsForTimeline(mockDatabase.records, searchQuery),
    [searchQuery]
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
          <Text style={styles.recordType}>{record.type}</Text>
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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search records..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>
      <FlashList
        data={groupedData}
        renderItem={renderItem}
        getItemType={(item) => item.type}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No records found</Text>
          </View>
        }
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
});
