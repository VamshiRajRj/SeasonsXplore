import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import FontProvider from '@/providers/FontProvider';
import LocationProvider from '@/providers/LocationProvider';
import WeatherProvider from '@/providers/WeatherProvider';
import RecommendationsProvider from '@/providers/RecommendationsProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <SafeAreaProvider>
      <FontProvider>
        <LocationProvider>
          <WeatherProvider>
            <RecommendationsProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen 
                  name="details/[id]" 
                  options={{
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                  }} 
                />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </RecommendationsProvider>
          </WeatherProvider>
        </LocationProvider>
      </FontProvider>
    </SafeAreaProvider>
  );
}