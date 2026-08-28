import React from 'react';
import { Star } from 'lucide-react-native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Doctor } from '../../../core/api/mockData';
import { useAppTheme, AppTheme } from '../../../core/theme/useDarkTheme';

interface Props {
  doctor: Doctor;
  onPress?: () => void;
}

export const DoctorCard = ({ doctor, onPress }: Props) => {
  const theme = useAppTheme();
  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Star size={12} color="#FF8F00" fill="#FF8F00" />
          <Text style={styles.ratingText}>{doctor.rating}</Text>
        </View>
      </View>
      <View style={styles.slots}>
        <Text style={styles.slotsLabel}>Available Slots:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {doctor.availableSlots.slice(0, 3).map(slot => (
            <View key={slot} style={styles.slotChip}>
              <Text style={styles.slotText}>{slot}</Text>
            </View>
          ))}
          {doctor.availableSlots.length > 3 && (
            <View style={styles.slotChipMore}>
              <Text style={styles.slotTextMore}>+{doctor.availableSlots.length - 3}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme: AppTheme) => StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  info: {
    flex: 1,
    marginRight: theme.spacing.m,
  },
  name: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  specialty: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  ratingText: {
    ...theme.typography.caption,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginLeft: 4,
  },
  slots: {
    marginTop: theme.spacing.xs,
  },
  slotsLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.s,
  },
  slotChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: 16,
    marginRight: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  slotText: {
    ...theme.typography.caption,
    color: theme.colors.text,
  },
  slotChipMore: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: 16,
    justifyContent: 'center',
  },
  slotTextMore: {
    ...theme.typography.caption,
    color: theme.colors.background,
    fontWeight: 'bold',
  },
});
