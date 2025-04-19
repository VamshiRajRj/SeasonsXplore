import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import axios from 'axios';
import { useLocation } from './LocationProvider';

// OpenWeatherMap API configuration
const WEATHER_API_KEY = '390fa202a74f6afbfce1779c5ff7e31b'; // Replace with your API key
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

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

interface WeatherContextProps {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  refreshWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextProps>({
  weather: null,
  isLoading: true,
  error: null,
  refreshWeather: async () => {},
});

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({
  children,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { location, isLoading: isLocationLoading } = useLocation();

  const fetchWeatherData = async () => {
    if (!location || isLocationLoading) return;

    setIsLoading(true);
    setError(null);
    console.log('Fetching weather data...');

    try {
      // For demo purposes, use mock data instead of actual API call
      // In a production app, uncomment the API call and use your API key

      const response = await axios.get(WEATHER_API_URL, {
        params: {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
          appid: WEATHER_API_KEY,
          units: 'metric',
        },
      });

      const data = response.data;
      console.log(data);

      setWeather({
        temperature: data.main.temp,
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
      });

      // Mock data for demonstration
      // const mockWeather: WeatherData = {
      //   temperature: 22,
      //   condition: 'Clear',
      //   icon: '01d',
      //   humidity: 65,
      //   windSpeed: 3.5,
      //   feelsLike: 23,
      //   tempMin: 19,
      //   tempMax: 24,
      // };

      // Simulate API delay
      // await new Promise(resolve => setTimeout(resolve, 500));

      // setWeather(mockWeather);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather API error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location, isLocationLoading]);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        isLoading,
        error,
        refreshWeather: fetchWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);

export default WeatherProvider;
