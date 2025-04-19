import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

const LoadingScreen: React.FC = () => {
  const { colors } = useThemeColor();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.text, { color: colors.text }]}>
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});

export default LoadingScreen;