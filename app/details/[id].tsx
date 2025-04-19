import { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { useRecommendations } from '@/providers/RecommendationsProvider';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ArrowLeft, Heart, Navigation, Star, ExternalLink, Clock, DollarSign, MapPin } from 'lucide-react-native';

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { recommendations, favorites, toggleFavorite } = useRecommendations();
  const { colors } = useThemeColor();
  
  // Find the recommendation from the list
  const recommendation = recommendations.find(r => r.id === id) || null;
  
  if (!recommendation) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.errorText, { color: colors.text }]}>Place not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === id);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recommendation.image }} style={styles.image} />
          <View style={styles.overlay}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => toggleFavorite(recommendation.id)} 
              style={[styles.favoriteButton, { backgroundColor: colors.cardBackground }]}
            >
              <Heart 
                size={20} 
                color={isFavorite ? colors.error : colors.text} 
                fill={isFavorite ? colors.error : 'none'} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{recommendation.name}</Text>
          
          <View style={styles.tagContainer}>
            {recommendation.tags.map((tag, index) => (
              <View key={index} style={[styles.tag, { backgroundColor: colors.backgroundSecondary }]}>
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>{tag}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Star size={16} color={colors.primary} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {recommendation.rating} ({recommendation.reviews} reviews)
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={16} color={colors.text} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {recommendation.openingHours}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <DollarSign size={16} color={colors.text} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {recommendation.priceLevel}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <MapPin size={16} color={colors.text} />
              <Text style={[styles.infoText, { color: colors.text }]}>
                {recommendation.distance} away
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {recommendation.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Location</Text>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: recommendation.coordinates.latitude,
                  longitude: recommendation.coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: recommendation.coordinates.latitude,
                    longitude: recommendation.coordinates.longitude,
                  }}
                  title={recommendation.name}
                />
              </MapView>
              <TouchableOpacity 
                style={[styles.directionsButton, { backgroundColor: colors.primary }]}
              >
                <Navigation size={20} color="#fff" />
                <Text style={styles.directionsText}>Get Directions</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.websiteButton, { borderColor: colors.border }]}
          >
            <Text style={[styles.websiteText, { color: colors.text }]}>Visit Website</Text>
            <ExternalLink size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  directionsButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  directionsText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    borderWidth: 1,
    marginBottom: 24,
  },
  websiteText: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  errorText: {
    fontSize: 18,
    marginLeft: 16,
    fontFamily: 'Inter-Regular',
  },
});