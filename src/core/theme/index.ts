export const theme = {
  colors: {
    primary: '#4CAF50', // Ayurvedic Green
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#212121',
    textSecondary: '#757575',
    error: '#B00020',
    border: '#E0E0E0',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  typography: {
    h1: { fontSize: 24, fontWeight: 'bold' as const },
    h2: { fontSize: 20, fontWeight: 'bold' as const },
    body: { fontSize: 16 },
    caption: { fontSize: 12, color: '#757575' },
  }
} as const;

export type Theme = typeof theme;
