import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

interface LocationContextProps {
  location: Location.LocationObject | null;
  locationName: string;
  isLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextProps>({
  location: null,
  locationName: '',
  isLoading: true,
  error: null,
  refreshLocation: async () => {},
});

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getLocationData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Request permissions first
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setIsLoading(false);
        // Use default location for web platform
        if (Platform.OS === 'web') {
          // Default to a generic location
          setLocationName('Your Location');
          
          // Set a default location (e.g., San Francisco)
          const defaultLocation: Location.LocationObject = {
            coords: {
              latitude: 37.7749,
              longitude: -122.4194,
              altitude: 0,
              accuracy: 0,
              altitudeAccuracy: 0,
              heading: 0,
              speed: 0,
            },
            timestamp: Date.now(),
          };
          setLocation(defaultLocation);
        }
        return;
      }
      
      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      
      // Get location name
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      
      if (addressResponse && addressResponse.length > 0) {
        const address = addressResponse[0];
        const locationString = address.city || address.region || address.country;
        setLocationName(locationString);
      } else {
        setLocationName('Your Location');
      }
    } catch (err) {
      // If there's an error on web, use default values
      if (Platform.OS === 'web') {
        setLocationName('Your Location');
        
        // Set a default location (e.g., San Francisco)
        const defaultLocation: Location.LocationObject = {
          coords: {
            latitude: 37.7749,
            longitude: -122.4194,
            altitude: 0,
            accuracy: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
          },
          timestamp: Date.now(),
        };
        setLocation(defaultLocation);
      } else {
        setError('Failed to get location');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLocationData();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        locationName,
        isLoading,
        error,
        refreshLocation: getLocationData,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);

export default LocationProvider;