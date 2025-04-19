import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Heart, Map, Search } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
  icon: 'heart' | 'map' | 'search';
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon }) => {
  const { colors } = useThemeColor();
  
  const getIcon = () => {
    switch(icon) {
      case 'heart':
        return <Heart size={64} color={colors.textSecondary} />;
      case 'map':
        return <Map size={64} color={colors.textSecondary} />;
      case 'search':
        return <Search size={64} color={colors.textSecondary} />;
      default:
        return <Search size={64} color={colors.textSecondary} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 16,
    opacity: 0.6,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});

export default EmptyState;