import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { useLocation } from '@/providers/LocationProvider';
import { useRecommendations } from '@/providers/RecommendationsProvider';
import { useThemeColor } from '@/hooks/useThemeColor';
import LoadingScreen from '@/components/common/LoadingScreen';
import ExploreHeader from '@/components/explore/ExploreHeader';
import RecommendationMarker from '@/components/explore/RecommendationMarker';

export default function ExploreScreen() {
  const { isLoading: isLocationLoading, location } = useLocation();
  const { isLoading: isRecommendationsLoading, recommendations } =
    useRecommendations();
  const { colors } = useThemeColor();

  if (isLocationLoading || isRecommendationsLoading || !location) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <ExploreHeader />

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
          showsMyLocationButton
        >
          {/* Current user location marker */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            pinColor="#4285F4"
          />

          {/* Recommendation markers */}
          {recommendations.map((recommendation) => (
            <RecommendationMarker
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
