import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TimelineScreen } from './TimelineScreen';
import { useAppTheme, AppTheme } from '../../../core/theme/useDarkTheme';
import { useTranslation } from 'react-i18next';

const TABS = ['Timeline', 'Lab Results', 'Prescriptions', 'Vitals'];

export const RecordsScreen = () => {
  const [activeTab, setActiveTab] = useState('Timeline');
  const { t } = useTranslation();
  const theme = useAppTheme();
  const styles = getStyles(theme);

  const renderContent = () => {
    switch (activeTab) {
      case 'Timeline':
        return <TimelineScreen />;
      default:
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              {t(activeTab)} {t('content coming soon...')}
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {t(tab)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {renderContent()}
    </View>
  );
};

const getStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  tabContainer: {
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  tabScroll: {
    paddingHorizontal: theme.spacing.m,
  },
  tab: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    marginRight: theme.spacing.s,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: theme.colors.primary,
  },
  tabText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: theme.colors.primary,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    ...theme.typography.h3,
    color: theme.colors.textSecondary,
  },
});
