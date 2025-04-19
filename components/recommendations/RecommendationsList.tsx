import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Recommendation } from '@/providers/RecommendationsProvider';
import RecommendationCard from './RecommendationCard';
import { useRecommendations } from '@/providers/RecommendationsProvider';

interface RecommendationsListProps {
  recommendations: Recommendation[];
  Header?: React.ReactElement<any, any>;
}

const RecommendationsList: React.FC<RecommendationsListProps> = ({
  recommendations,
  Header,
}) => {
  const { favorites, toggleFavorite } = useRecommendations();

  const isItemFavorite = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FlatList
      data={recommendations}
      ListHeaderComponent={Header}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RecommendationCard
          recommendation={item}
          isFavorite={isItemFavorite(item.id)}
          onFavoriteToggle={() => toggleFavorite(item.id)}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
});

export default RecommendationsList;
