import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocation } from '@/providers/LocationProvider';
import { useWeather } from '@/providers/WeatherProvider';
import { useRecommendations } from '@/providers/RecommendationsProvider';
import WeatherDisplay from '@/components/home/WeatherDisplay';
import GreetingHeader from '@/components/home/GreetingHeader';
import FiltersBottomSheet from '@/components/filters/FiltersBottomSheet';
import RecommendationsList from '@/components/recommendations/RecommendationsList';
import { useThemeColor } from '@/hooks/useThemeColor';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function HomeScreen() {
  const { isLoading: isLocationLoading, locationName } = useLocation();

  const {
    isLoading: isRecommendationsLoading,
    filteredRecommendations,
    filters,
    toggleFilterVisibility,
  } = useRecommendations();
  const { colors } = useThemeColor();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoading: isWeatherLoading, weather } = useWeather();

  useEffect(() => {
    // Combined loading state
    if (!isLocationLoading && !isWeatherLoading && !isRecommendationsLoading) {
      setIsLoading(false);
    }
  }, [isLocationLoading, isWeatherLoading, isRecommendationsLoading]);

  console.log(isLocationLoading, isWeatherLoading, isRecommendationsLoading);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <StatusBar style={colors.statusBarStyle} />

      <RecommendationsList
        recommendations={filteredRecommendations}
        Header={
          <View>
            <GreetingHeader locationName={locationName} />
            <WeatherDisplay weather={weather} />
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Recommendations
              </Text>
              <Text
                style={[styles.filterButton, { color: colors.primary }]}
                onPress={toggleFilterVisibility}
              >
                Filters
              </Text>
            </View>
          </View>
        }
      />

      <FiltersBottomSheet
        visible={filters.isVisible}
        onClose={toggleFilterVisibility}
        filters={filters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  recommendationsContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  filterButton: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});
