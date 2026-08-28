import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DoctorListScreen } from '../features/consultations/screens/DoctorListScreen';
import { DoctorDetailsScreen } from '../features/consultations/screens/DoctorDetailsScreen';
import { useAppTheme } from '../core/theme/useDarkTheme';
import { Doctor } from '../core/api/mockData';

export type ConsultationsStackParamList = {
  DoctorList: undefined;
  DoctorDetails: { doctor: Doctor };
};

const Stack = createNativeStackNavigator<ConsultationsStackParamList>();

export const ConsultationsNavigator = () => {
  const theme = useAppTheme();
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
        options={{ title: 'Consultations' }} 
      />
      <Stack.Screen 
        name="DoctorDetails" 
        component={DoctorDetailsScreen} 
        options={{ title: 'Doctor Details' }} 
      />
    </Stack.Navigator>
  );
};
