import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Doctor, mockDatabase } from '../../../core/api/mockData';
import { useAppTheme, AppTheme } from '../../../core/theme/useDarkTheme';
import { DoctorCard } from '../components/DoctorCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ConsultationsStackParamList } from '../../../navigation/ConsultationsNavigator';

export const DoctorListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ConsultationsStackParamList>>();
  const theme = useAppTheme();
  const styles = getStyles(theme);

  // Use useMemo to efficiently filter 5,000 doctors based on the search query
  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockDatabase.doctors;
    }

    const query = searchQuery.toLowerCase();
    return mockDatabase.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const renderItem = ({ item }: { item: Doctor }) => (
    <DoctorCard
      doctor={item}
      onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or specialty..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        <Text style={styles.resultCount}>{filteredDoctors.length} doctors found</Text>
      </View>
      <FlashList
        data={filteredDoctors}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No doctors found for "{searchQuery}"</Text>
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
});
