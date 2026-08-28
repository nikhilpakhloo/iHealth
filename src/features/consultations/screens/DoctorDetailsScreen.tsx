import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ConsultationsStackParamList } from '../../../navigation/ConsultationsNavigator';
import { useAppTheme, AppTheme } from '../../../core/theme/useDarkTheme';
import { MockApiClient } from '../../../core/api/mockClient';
import NetInfo from '@react-native-community/netinfo';
import { useSyncStore } from '../../../core/offline/useSyncStore';
import { useToastStore } from '../../../shared/store/useToastStore';

type Props = NativeStackScreenProps<ConsultationsStackParamList, 'DoctorDetails'>;

export const DoctorDetailsScreen = ({ route, navigation }: Props) => {
  const { doctor } = route.params;
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const handleBook = async () => {
    if (!selectedSlot) return;

    setIsBooking(true);
    
    // Check network state
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected || netInfo.isInternetReachable === false) {
      // Offline: queue the action
      useSyncStore.getState().enqueueAction({
        type: 'BOOK_CONSULTATION',
        payload: { doctorId: doctor.id, slot: selectedSlot }
      });
      
      Alert.alert(
        'Offline',
        `You are currently offline. Your booking with ${doctor.name} at ${selectedSlot} has been queued and will be processed when you reconnect.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      setIsBooking(false);
      return;
    }

    try {
      await MockApiClient.createBooking(doctor.id, selectedSlot);
      useToastStore.getState().show(`Consultation with ${doctor.name} confirmed!`, 'success');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Booking Failed', error.message || 'The selected slot is no longer available. Please choose another one.');
      setSelectedSlot(null);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerCard}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {doctor.rating} Rating</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Select a Time Slot</Text>
      
      <View style={styles.slotsGrid}>
        {doctor.availableSlots.map((slot) => {
          const isSelected = selectedSlot === slot;
          return (
            <TouchableOpacity
              key={slot}
              style={[
                styles.slotButton,
                isSelected && styles.slotButtonSelected,
              ]}
              onPress={() => setSelectedSlot(slot)}
              disabled={isBooking}
            >
              <Text
                style={[
                  styles.slotText,
                  isSelected && styles.slotTextSelected,
                ]}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.bookButton,
            (!selectedSlot || isBooking) && styles.bookButtonDisabled,
          ]}
          onPress={handleBook}
          disabled={!selectedSlot || isBooking}
        >
          {isBooking ? (
            <ActivityIndicator color={theme.colors.surface} />
          ) : (
            <Text style={styles.bookButtonText}>Book Consultation</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: theme.spacing.m,
  },
  headerCard: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.l,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  name: {
    ...theme.typography.h1,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  specialty: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
  },
  ratingBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: 8,
  },
  ratingText: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: '#FF8F00',
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.m,
    marginBottom: theme.spacing.xl,
  },
  slotButton: {
    width: '30%',
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.m,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  slotButtonSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  slotText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  slotTextSelected: {
    color: theme.colors.surface,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: theme.spacing.xl,
  },
  bookButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: theme.colors.border,
  },
  bookButtonText: {
    ...theme.typography.h3,
    color: theme.colors.surface,
  },
});
