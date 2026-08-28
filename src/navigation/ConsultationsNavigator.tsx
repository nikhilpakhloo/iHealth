import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DoctorListScreen } from '../features/consultations/screens/DoctorListScreen';
import { DoctorDetailsScreen } from '../features/consultations/screens/DoctorDetailsScreen';
import { useAppTheme } from '../core/theme/useDarkTheme';
import { Doctor } from '../core/api/mockData';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export type ConsultationsStackParamList = {
  DoctorList: undefined;
  DoctorDetails: { doctor: Doctor };
};

const Stack = createNativeStackNavigator<ConsultationsStackParamList>();

export const ConsultationsNavigator = () => {
  const theme = useAppTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#FFFFFF', // keep white on primary
      }}
    >
      <Stack.Screen 
        name="DoctorList" 
        component={DoctorListScreen} 
        options={{ 
          title: t('Consultations'),
          headerRight: () => (
            <TouchableOpacity onPress={toggleLanguage} style={styles.langButton}>
              <Text style={styles.langText}>{i18n.language === 'en' ? 'EN' : 'HI'}</Text>
            </TouchableOpacity>
          )
        }} 
      />
      <Stack.Screen 
        name="DoctorDetails" 
        component={DoctorDetailsScreen} 
        options={{ title: t('Doctor Details') || 'Doctor Details' }} 
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  langButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  langText: {
    color: '#FFF',
    fontWeight: 'bold',
  }
});
