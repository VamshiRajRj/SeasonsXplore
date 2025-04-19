import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Recommendation } from '@/providers/RecommendationsProvider';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Heart, MapPin, Star } from 'lucide-react-native';

interface RecommendationCardProps {
  recommendation: Recommendation;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const { width } = Dimensions.get('window');

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  recommendation,
  isFavorite,
  onFavoriteToggle
}) => {
  const router = useRouter();
  const { colors } = useThemeColor();
  
  const handlePress = () => {
    router.push(`/details/${recommendation.id}`);
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: colors.cardBackground }
      ]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: recommendation.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            onFavoriteToggle();
          }}
        >
          <Heart 
            size={20} 
            color={isFavorite ? colors.error : '#FFF'}
            fill={isFavorite ? colors.error : 'none'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text 
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {recommendation.name}
          </Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.primary} fill={colors.primary} />
            <Text style={[styles.rating, { color: colors.text }]}>
              {recommendation.rating}
            </Text>
          </View>
        </View>
        
        <View style={styles.tagsRow}>
          {recommendation.tags.slice(0, 3).map((tag, index) => (
            <View 
              key={index} 
              style={[
                styles.tag,
                { backgroundColor: colors.backgroundSecondary }
              ]}
            >
              <Text style={[styles.tagText, { color: colors.textSecondary }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.footer}>
          <View style={styles.distanceContainer}>
            <MapPin size={14} color={colors.textSecondary} />
            <Text style={[styles.distance, { color: colors.textSecondary }]}>
              {recommendation.distance} away
            </Text>
          </View>
          
          <Text style={[styles.priceLevel, { color: colors.textSecondary }]}>
            {recommendation.priceLevel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
    fontFamily: 'Inter-Bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  tagsRow: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  priceLevel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});

export default RecommendationCard;