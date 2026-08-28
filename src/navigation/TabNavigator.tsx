import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Stethoscope, Store, FileText, ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { useAppTheme } from '../core/theme/useDarkTheme';
import { useTranslation } from 'react-i18next';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConsultationsNavigator } from './ConsultationsNavigator';
import { RecordsScreen } from '../features/records/screens/RecordsScreen';
import { ShopNavigator } from './ShopNavigator';
import { CartScreen } from '../features/shop/screens/CartScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    const insets = useSafeAreaInsets();
    const theme = useAppTheme();
    const { t } = useTranslation();

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
                    height: 80 + insets.bottom

                },

            }}
        >
            <Tab.Screen
                name="ConsultationsTab"
                component={ConsultationsNavigator}
                options={{
                    headerShown: false,
                    title: t('Consultations'),
                    tabBarIcon: ({ color, size }) => <Stethoscope color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="ShopTab"
                component={ShopNavigator}
                options={{
                    headerShown: false,
                    title: t('Shop'),
                    tabBarIcon: ({ color, size }) => <Store color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="Records"
                component={RecordsScreen}
                options={{
                    title: t('Records'),
                    tabBarIcon: ({ color, size }) => <FileText color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="CartTab"
                component={CartScreen}
                options={{
                    title: t('Cart'),
                    tabBarIcon: ({ color, size }) => <ShoppingCart color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
};
