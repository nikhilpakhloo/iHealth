import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { theme } from '../core/theme';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConsultationsScreen } from '../features/consultations/screens/ConsultationsScreen';
import { RecordsScreen } from '../features/records/screens/RecordsScreen';
import { ProductListScreen } from '../features/shop/screens/ProductListScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            safeAreaInsets={{ bottom: insets.bottom }}
            screenOptions={{
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                headerStyle: { backgroundColor: theme.colors.primary },
                headerTintColor: theme.colors.background,
            }}
        >
            <Tab.Screen name="Consultations" component={ConsultationsScreen} />
            <Tab.Screen name="Shop" component={ProductListScreen} />
            <Tab.Screen name="Records" component={RecordsScreen} />
        </Tab.Navigator>
    );
};
