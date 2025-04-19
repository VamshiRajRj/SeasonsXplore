import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRecommendations } from '@/providers/RecommendationsProvider';
import { useThemeColor } from '@/hooks/useThemeColor';
import RecommendationCard from '@/components/recommendations/RecommendationCard';
import EmptyState from '@/components/common/EmptyState';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useRecommendations();
  const { colors } = useThemeColor();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          message="Places you save will appear here"
          icon="heart"
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecommendationCard
              recommendation={item}
              isFavorite={true}
              onFavoriteToggle={() => toggleFavorite(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});