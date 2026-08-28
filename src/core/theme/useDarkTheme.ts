import { useColorScheme } from 'react-native';

const lightThemeColors = {
  primary: '#4CAF50',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#212121',
  textSecondary: '#757575',
  error: '#B00020',
  border: '#E0E0E0',
};

const darkThemeColors = {
  primary: '#81C784',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  error: '#CF6679',
  border: '#333333',
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

export const typography = {
  h1: { fontSize: 24, fontWeight: 'bold' as const },
  h2: { fontSize: 20, fontWeight: 'bold' as const },
  h3: { fontSize: 18, fontWeight: 'bold' as const },
  body: { fontSize: 16 },
  caption: { fontSize: 12, color: '#757575' }, // We might override color dynamically
};

export const useAppTheme = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return {
    colors: isDark ? darkThemeColors : lightThemeColors,
    spacing,
    typography: {
      ...typography,
      caption: { ...typography.caption, color: isDark ? '#B0B0B0' : '#757575' },
    },
    isDark,
  };
};

export type AppTheme = ReturnType<typeof useAppTheme>;
