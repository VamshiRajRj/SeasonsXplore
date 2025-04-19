import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { useThemeColor } from '@/hooks/useThemeColor';

interface GreetingHeaderProps {
  locationName: string;
}

const GreetingHeader: React.FC<GreetingHeaderProps> = ({ locationName }) => {
  const { colors } = useThemeColor();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = (): string => {
    const hours = currentTime.getHours();

    if (hours < 12) {
      return 'Good morning';
    } else if (hours < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  const formattedDate = format(currentTime, 'EEEE, MMMM d');

  return (
    <View style={styles.container}>
      <Text style={[styles.greeting, { color: colors.text }]}>
        {getGreeting()}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {formattedDate}
      </Text>
      <Text style={[styles.location, { color: colors.primary }]}>
        {locationName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingTop: 12,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
    fontFamily: 'Inter-SemiBold',
  },
});

export default GreetingHeader;
