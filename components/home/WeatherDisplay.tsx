import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
} from 'lucide-react-native';

interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
}

interface WeatherDisplayProps {
  weather: WeatherData | null;
}

const getWeatherIcon = (condition: string, size = 48, color = '#FFF') => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun size={size} color={color} />;
    case 'clouds':
      return <Cloud size={size} color={color} />;
    case 'rain':
      return <CloudRain size={size} color={color} />;
    case 'snow':
      return <CloudSnow size={size} color={color} />;
    case 'thunderstorm':
      return <CloudLightning size={size} color={color} />;
    default:
      return <Sun size={size} color={color} />;
  }
};

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  const { colors } = useThemeColor();

  if (!weather) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.topRow}>
        <View style={styles.tempSection}>
          <Text style={styles.temperature}>
            {Math.round(weather.temperature)}°
          </Text>
          <Text style={styles.condition}>{weather.condition}</Text>
          <Text style={styles.minMax}>
            {Math.round(weather.tempMin)}° / {Math.round(weather.tempMax)}°
          </Text>
        </View>
        <View style={styles.iconContainer}>
          {getWeatherIcon(weather.condition)}
        </View>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Wind size={16} color="#FFF" />
          <Text style={styles.detailText}>Wind: {weather.windSpeed} km/h</Text>
        </View>
        <View style={styles.detailItem}>
          <Droplets size={16} color="#FFF" />
          <Text style={styles.detailText}>Humidity: {weather.humidity}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Sun size={16} color="#FFF" />
          <Text style={styles.detailText}>
            Feels like: {Math.round(weather.feelsLike)}°
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tempSection: {
    flex: 1,
  },
  temperature: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  condition: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  minMax: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: 'Inter-Regular',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherIcon: {
    width: 60,
    height: 60,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
});

export default WeatherDisplay;
