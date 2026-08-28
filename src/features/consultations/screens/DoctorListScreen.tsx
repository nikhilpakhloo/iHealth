import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, TextInput, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Doctor } from '../../../core/api/mockData';
import { useAppTheme, AppTheme } from '../../../core/theme/useDarkTheme';
import { DoctorCard } from '../components/DoctorCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDoctors } from '../hooks/useDoctors';
import { useBookingsStore } from '../store/useBookingsStore';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { ConsultationsStackParamList } from '../../../navigation/ConsultationsNavigator';
import { t } from 'i18next';

export const DoctorListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const navigation = useNavigation<NativeStackNavigationProp<ConsultationsStackParamList>>();
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const { bookings, removeBooking } = useBookingsStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useDoctors(debouncedSearch, '');

  const doctors = useMemo(() => {
    return data?.pages.flatMap(page => page.data) ?? [];
  }, [data]);

  const renderItem = useCallback(({ item }: { item: Doctor }) => (
    <DoctorCard
      doctor={item}
      onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}
    />
  ), [navigation]);

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderHeader = () => {
    if (bookings.length === 0 || debouncedSearch.trim() !== '') return null;
    return (
      <View style={styles.upcomingSection}>
        <Text style={styles.sectionTitle}>{t('Upcoming Consultations')}</Text>
        {bookings.map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            <View style={styles.bookingInfo}>
              <Text style={styles.bookingDoctorName}>{booking.doctor.name}</Text>
              <Text style={styles.bookingTime}>{booking.slot} • {booking.status === 'confirmed' ? t('Confirmed') : t('Pending (Offline)')}</Text>
            </View>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => removeBooking(booking.id)}
            >
              <Text style={styles.cancelBtnText}>{t('Cancel')}</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('Search by name...')}
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {data?.pages[0]?.total !== undefined && (
          <Text style={styles.resultCount}>{data.pages[0].total} {t('doctors found')}</Text>
        )}
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : isError ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{t('Failed to load doctors.')}</Text>
          <Text style={styles.retryText} onPress={() => refetch()}>{t('Tap to retry')}</Text>
        </View>
      ) : (
        <FlashList
          data={doctors}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
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
              <Text style={styles.emptyText}>{t('No doctors found for')} "{searchQuery}"</Text>
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
    marginBottom: theme.spacing.s,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  resultCount: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  listContent: {
    padding: theme.spacing.m,
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
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  upcomingSection: {
    marginBottom: theme.spacing.m,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  bookingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.m,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.s,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingDoctorName: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  bookingTime: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginTop: 4,
  },
  cancelBtn: {
    padding: theme.spacing.s,
  },
  cancelBtnText: {
    ...theme.typography.body,
    color: theme.colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.m,
  },
});
