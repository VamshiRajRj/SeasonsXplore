import React, { ReactNode, useEffect } from 'react';
import { Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { 
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

interface FontProviderProps {
  children: ReactNode;
}

const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded || fontError) {
        // Hide the splash screen once fonts are loaded or if there's an error
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Override the default text component to use our font
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: 'Inter-Regular' };

  return <>{children}</>;
};

export default FontProvider;