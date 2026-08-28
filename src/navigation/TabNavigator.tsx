import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useAppTheme } from '../core/theme/useDarkTheme';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConsultationsNavigator } from './ConsultationsNavigator';
import { RecordsScreen } from '../features/records/screens/RecordsScreen';
import { ShopNavigator } from './ShopNavigator';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    const insets = useSafeAreaInsets();
    const theme = useAppTheme();

    return (
        <Tab.Navigator
            safeAreaInsets={{ bottom: insets.bottom }}
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                headerStyle: { backgroundColor: theme.colors.primary },
                headerTintColor: theme.colors.background,
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                    borderTopColor: theme.colors.border,
                },
            }}
        >
            <Tab.Screen 
                name="ConsultationsTab" 
                component={ConsultationsNavigator} 
                options={{ 
                    headerShown: false,
                    title: 'Consultations'
                }} 
            />
            <Tab.Screen 
                name="ShopTab" 
                component={ShopNavigator} 
                options={{ 
                    headerShown: false,
                    title: 'Shop'
                }} 
            />
            <Tab.Screen name="Records" component={RecordsScreen} />
        </Tab.Navigator>
    );
};
