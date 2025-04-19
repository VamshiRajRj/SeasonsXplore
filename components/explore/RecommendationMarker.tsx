import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { Recommendation } from '@/providers/RecommendationsProvider';

interface RecommendationMarkerProps {
  recommendation: Recommendation;
}

const RecommendationMarker: React.FC<RecommendationMarkerProps> = ({
  recommendation,
}) => {
  const router = useRouter();

  const handleCalloutPress = () => {
    router.push(`/details/${recommendation.id}`);
  };

  // Determine the marker color based on the category
  const getMarkerColor = () => {
    switch (recommendation.category) {
      case 'Food':
        return '#F97316'; // Orange
      case 'Cultural':
        return '#8B5CF6'; // Purple
      case 'Outdoor':
        return '#34A853'; // Green
      case 'Activity':
        return '#EA4335'; // Red
      case 'Educational':
        return '#4285F4'; // Blue
      default:
        return '#4285F4'; // Default blue
    }
  };

  return (
    <Marker
      coordinate={{
        latitude: recommendation.coordinates.latitude,
        longitude: recommendation.coordinates.longitude,
      }}
      pinColor={getMarkerColor()}
    >
      <Callout tooltip onPress={handleCalloutPress}>
        <View style={styles.calloutContainer}>
          <Text style={styles.calloutTitle}>{recommendation.name}</Text>
          <Text style={styles.calloutSubtitle}>
            {recommendation.tags.slice(0, 2).join(' · ')}
          </Text>
          <Text style={styles.calloutDistance}>
            {recommendation.distance} away
          </Text>
          <TouchableOpacity style={styles.calloutButton}>
            <Text style={styles.calloutButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    width: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  calloutSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  calloutDistance: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  calloutButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  calloutButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});

export default RecommendationMarker;
