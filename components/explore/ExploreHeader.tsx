import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRecommendations } from '@/providers/RecommendationsProvider';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Search, SlidersHorizontal } from 'lucide-react-native';

const ExploreHeader: React.FC = () => {
  const { toggleFilterVisibility } = useRecommendations();
  const { colors } = useThemeColor();

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.backgroundSecondary }]}
          onPress={() => {}}
        >
          <Search size={20} color={colors.text} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.backgroundSecondary }]}
          onPress={toggleFilterVisibility}
        >
          <SlidersHorizontal size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default ExploreHeader;