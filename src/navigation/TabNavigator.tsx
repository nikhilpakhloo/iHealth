import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Stethoscope, Store, FileText, ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { useAppTheme } from '../core/theme/useDarkTheme';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConsultationsNavigator } from './ConsultationsNavigator';
import { RecordsScreen } from '../features/records/screens/RecordsScreen';
import { ShopNavigator } from './ShopNavigator';
import { CartScreen } from '../features/shop/screens/CartScreen';

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
                headerTintColor: '#FFFFFF',
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                    borderTopColor: theme.colors.border,
                    height: 80

                },

            }}
        >
            <Tab.Screen
                name="ConsultationsTab"
                component={ConsultationsNavigator}
                options={{
                    headerShown: false,
                    title: 'Consultations',
                    tabBarIcon: ({ color, size }) => <Stethoscope color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="ShopTab"
                component={ShopNavigator}
                options={{
                    headerShown: false,
                    title: 'Shop',
                    tabBarIcon: ({ color, size }) => <Store color={color} size={size} />
                }}
            />
            <Tab.Screen 
                name="Records" 
                component={RecordsScreen}
                options={{
                    title: 'Records',
                    tabBarIcon: ({ color, size }) => <FileText color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="CartTab"
                component={CartScreen}
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
};
