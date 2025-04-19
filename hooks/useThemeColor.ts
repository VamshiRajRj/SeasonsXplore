import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';

export type ColorSchemeName = 'light' | 'dark';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  backgroundSecondary: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  border: string;
  switchTrack: string;
  switchThumb: string;
  statusBarStyle: 'light' | 'dark' | 'auto';
}

// Define the color palettes
const lightColors: ThemeColors = {
  primary: '#4285F4',
  secondary: '#34A853',
  accent: '#FBBC05',
  success: '#34A853',
  warning: '#FBBC05',
  error: '#EA4335',
  background: '#F9F9FB',
  backgroundSecondary: '#F0F0F5',
  cardBackground: '#FFFFFF',
  text: '#202124',
  textSecondary: '#5F6368',
  border: '#E8EAED',
  switchTrack: '#E8EAED',
  switchThumb: '#FFFFFF',
  statusBarStyle: 'dark',
};

const darkColors: ThemeColors = {
  primary: '#8AB4F8',
  secondary: '#81C995',
  accent: '#FDE293',
  success: '#81C995',
  warning: '#FDE293',
  error: '#F28B82',
  background: '#202124',
  backgroundSecondary: '#303134',
  cardBackground: '#303134',
  text: '#E8EAED',
  textSecondary: '#9AA0A6',
  border: '#5F6368',
  switchTrack: '#5F6368',
  switchThumb: '#E8EAED',
  statusBarStyle: 'light',
};

export const useThemeColor = () => {
  // Get the device color scheme
  const colorScheme = useColorScheme() as ColorSchemeName;
  const [theme, setTheme] = useState<ColorSchemeName>(colorScheme || 'light');
  
  // Update theme when system theme changes
  useEffect(() => {
    if (colorScheme) {
      setTheme(colorScheme);
    }
  }, [colorScheme]);
  
  // Get the colors for the current theme
  const colors = theme === 'dark' ? darkColors : lightColors;
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  
  return { 
    theme, 
    colors, 
    isDark: theme === 'dark',
    toggleTheme 
  };
};