import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useLocation } from './LocationProvider';

// Types for our recommendation data
export interface Recommendation {
  id: string;
  name: string;
  description: string;
  image: string;
  distance: string;
  tags: string[];
  rating: number;
  reviews: number;
  priceLevel: string;
  openingHours: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: string;
  timeOfDay: string[];
  transportModes: string[];
  interests: string[];
}

interface Filters {
  isVisible: boolean;
  timeOfDay: string | null;
  transportMode: string | null;
  interests: string[];
  distance: number;
  searchQuery: string;
  category: string;
}

interface RecommendationsContextProps {
  recommendations: Recommendation[];
  filteredRecommendations: Recommendation[];
  favorites: Recommendation[];
  filters: Filters;
  isLoading: boolean;
  error: string | null;
  updateFilters: (newFilters: Partial<Filters>) => void;
  toggleFilterVisibility: () => void;
  toggleFavorite: (id: string) => void;
  refreshRecommendations: () => void;
}

const RecommendationsContext = createContext<RecommendationsContextProps>({
  recommendations: [],
  filteredRecommendations: [],
  favorites: [],
  filters: {
    isVisible: false,
    timeOfDay: null,
    transportMode: null,
    interests: [],
    distance: 10,
    searchQuery: '',
    category: '',
  },
  isLoading: true,
  error: null,
  updateFilters: () => {},
  toggleFilterVisibility: () => {},
  toggleFavorite: () => {},
  refreshRecommendations: () => {},
});

interface RecommendationsProviderProps {
  children: ReactNode;
}

export const RecommendationsProvider: React.FC<
  RecommendationsProviderProps
> = ({ children }) => {
  const { location } = useLocation();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState<
    Recommendation[]
  >([]);
  const [favorites, setFavorites] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>({
    isVisible: false,
    timeOfDay: null,
    transportMode: null,
    interests: [],
    distance: 10,
    searchQuery: '',
    category: '',
  });

  // Fetch recommendations data (mock data for now)
  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, we would fetch from an API based on location
      // For now, use mock data

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock data based on the user's location
      if (location) {
        const mockRecommendations: Recommendation[] = [
          {
            id: '1',
            name: 'Golden Gate Park',
            description:
              'A large urban park with gardens, museums, and recreational areas. Perfect for a day of exploration and relaxation in nature while still being in the city.',
            image:
              'https://images.pexels.com/photos/1141853/pexels-photo-1141853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            distance: '1.2 km',
            tags: ['Park', 'Outdoor', 'Nature'],
            rating: 4.7,
            reviews: 1243,
            priceLevel: 'Free',
            openingHours: '5:00 AM - 10:00 PM',
            coordinates: {
              latitude: location.coords.latitude + 0.01,
              longitude: location.coords.longitude - 0.01,
            },
            category: 'Outdoor',
            timeOfDay: ['Morning', 'Afternoon', 'Evening'],
            transportModes: [
              'Walking',
              'Biking',
              'Driving',
              'Public Transport',
            ],
            interests: ['Outdoor', 'Nature', 'Chill'],
          },
          {
            id: '2',
            name: 'Modern Art Museum',
            description:
              "A contemporary art museum featuring works from emerging and established artists from around the world. The rotating exhibitions ensure there's always something new to see.",
            image:
              'https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            distance: '2.5 km',
            tags: ['Museum', 'Art', 'Indoor'],
            rating: 4.5,
            reviews: 856,
            priceLevel: '$15',
            openingHours: '10:00 AM - 5:30 PM',
            coordinates: {
              latitude: location.coords.latitude - 0.015,
              longitude: location.coords.longitude + 0.02,
            },
            category: 'Cultural',
            timeOfDay: ['Morning', 'Afternoon'],
            transportModes: ['Driving', 'Public Transport'],
            interests: ['Museums', 'Historical', 'Indoor'],
          },
          {
            id: '3',
            name: 'Waterfront Bistro',
            description:
              'An elegant waterfront restaurant offering exquisite cuisine with panoramic views of the bay. Their seasonal menu focuses on locally-sourced ingredients and fresh seafood.',
            image:
              'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            distance: '3.8 km',
            tags: ['Restaurant', 'Waterfront', 'Dining'],
            rating: 4.8,
            reviews: 1052,
            priceLevel: '$$$',
            openingHours: '11:00 AM - 11:00 PM',
            coordinates: {
              latitude: location.coords.latitude + 0.025,
              longitude: location.coords.longitude + 0.01,
            },
            category: 'Food',
            timeOfDay: ['Afternoon', 'Evening'],
            transportModes: ['Driving', 'Public Transport'],
            interests: ['Romantic', 'Chill'],
          },
          {
            id: '4',
            name: 'City Observatory',
            description:
              'A historic observatory offering stunning views of the night sky and educational shows about astronomy. Perfect for stargazing enthusiasts and curious minds alike.',
            image:
              'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            distance: '5.1 km',
            tags: ['Observatory', 'Science', 'Night Activity'],
            rating: 4.6,
            reviews: 725,
            priceLevel: '$10',
            openingHours: '7:00 PM - 11:00 PM',
            coordinates: {
              latitude: location.coords.latitude - 0.03,
              longitude: location.coords.longitude - 0.025,
            },
            category: 'Educational',
            timeOfDay: ['Night'],
            transportModes: ['Driving'],
            interests: ['Stargazing', 'Educational'],
          },
          {
            id: '5',
            name: 'Historic Walking Tour',
            description:
              "A guided walking tour through the city's historic district, showcasing architecture and stories from the past 200 years. Tours are led by knowledgeable local historians.",
            image:
              'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            distance: '1.8 km',
            tags: ['Tour', 'Historic', 'Walking'],
            rating: 4.4,
            reviews: 512,
            priceLevel: '$20',
            openingHours: '9:00 AM - 4:00 PM',
            coordinates: {
              latitude: location.coords.latitude + 0.008,
              longitude: location.coords.longitude + 0.015,
            },
            category: 'Cultural',
            timeOfDay: ['Morning', 'Afternoon'],
            transportModes: ['Walking', 'Public Transport'],
            interests: ['Historical', 'Walking'],
          },
          {
            id: '6',
            name: 'Adventure Park',
            description:
              'An outdoor adventure park featuring zip lines, climbing walls, and obstacle courses for all skill levels. A perfect destination for thrill-seekers and active individuals.',
            image:
              'https://images.pexels.com/photos/2041759/pexels-photo-2041759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            distance: '7.2 km',
            tags: ['Adventure', 'Active', 'Outdoor'],
            rating: 4.7,
            reviews: 932,
            priceLevel: '$$',
            openingHours: '9:00 AM - 6:00 PM',
            coordinates: {
              latitude: location.coords.latitude - 0.04,
              longitude: location.coords.longitude + 0.035,
            },
            category: 'Activity',
            timeOfDay: ['Morning', 'Afternoon'],
            transportModes: ['Driving', 'Public Transport'],
            interests: ['Adventure', 'Outdoor', 'Active'],
          },
          {
            id: '7',
            name: 'Lakeside Trail',
            description:
              'A peaceful trail surrounding a serene lake, perfect for jogging, cycling or a leisurely stroll. The path is well-maintained and offers beautiful views throughout all seasons.',
            image:
              'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            distance: '4.3 km',
            tags: ['Trail', 'Lake', 'Nature'],
            rating: 4.5,
            reviews: 687,
            priceLevel: 'Free',
            openingHours: 'Always Open',
            coordinates: {
              latitude: location.coords.latitude + 0.035,
              longitude: location.coords.longitude - 0.02,
            },
            category: 'Outdoor',
            timeOfDay: ['Morning', 'Afternoon', 'Evening'],
            transportModes: ['Walking', 'Biking', 'Driving'],
            interests: ['Outdoor', 'Nature', 'Chill'],
          },
          {
            id: '8',
            name: 'Cozy Bookstore Café',
            description:
              'A charming bookstore with an integrated café serving specialty coffee and homemade pastries. Browse through their curated collection while enjoying a warm drink.',
            image:
              'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            distance: '1.5 km',
            tags: ['Café', 'Books', 'Cozy'],
            rating: 4.6,
            reviews: 423,
            priceLevel: '$',
            openingHours: '8:00 AM - 8:00 PM',
            coordinates: {
              latitude: location.coords.latitude - 0.008,
              longitude: location.coords.longitude - 0.01,
            },
            category: 'Food',
            timeOfDay: ['Morning', 'Afternoon', 'Evening'],
            transportModes: ['Walking', 'Biking', 'Public Transport'],
            interests: ['Cafes', 'Chill', 'Indoor'],
          },
        ];

        setRecommendations(mockRecommendations);
        setFilteredRecommendations(mockRecommendations);
      }
    } catch (err) {
      setError('Failed to fetch recommendations');
      console.error('Recommendations error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchRecommendations();
    }
  }, [location]);

  useEffect(() => {
    if (recommendations.length === 0) return;

    let filtered = [...recommendations];

    // Time of Day
    if (filters.timeOfDay) {
      filtered = filtered.filter((item) =>
        item.timeOfDay.includes(filters.timeOfDay!)
      );
    }

    // Transport Mode
    if (filters.transportMode) {
      filtered = filtered.filter((item) =>
        item.transportModes.includes(filters.transportMode!)
      );
    }

    // Category
    if (filters.category) {
      filtered = filtered.filter(
        (item) =>
          item.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    // Interests
    if (filters.interests.length > 0) {
      filtered = filtered.filter((item) =>
        filters.interests.some((interest) => item.interests.includes(interest))
      );
    }

    // Search Query
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Distance (parse string like "1.2 km")
    filtered = filtered.filter((item) => {
      const distanceValue = parseFloat(item.distance);
      return !isNaN(distanceValue) && distanceValue <= filters.distance;
    });

    // Sort by closest distance
    filtered.sort((a, b) => {
      const dA = parseFloat(a.distance.split(' ')[0]);
      const dB = parseFloat(b.distance.split(' ')[0]);
      return dA - dB;
    });

    setFilteredRecommendations(filtered);
  }, [recommendations, filters]);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const toggleFilterVisibility = () => {
    setFilters((prev) => ({ ...prev, isVisible: !prev.isVisible }));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      // Check if the recommendation is already in favorites
      const isFavorite = prev.some((fav) => fav.id === id);

      if (isFavorite) {
        // Remove from favorites
        return prev.filter((fav) => fav.id !== id);
      } else {
        // Add to favorites
        const recommendation = recommendations.find((rec) => rec.id === id);
        if (recommendation) {
          return [...prev, recommendation];
        }
        return prev;
      }
    });
  };

  return (
    <RecommendationsContext.Provider
      value={{
        recommendations,
        filteredRecommendations,
        favorites,
        filters,
        isLoading,
        error,
        updateFilters,
        toggleFilterVisibility,
        toggleFavorite,
        refreshRecommendations: fetchRecommendations,
      }}
    >
      {children}
    </RecommendationsContext.Provider>
  );
};

export const useRecommendations = () => useContext(RecommendationsContext);

export default RecommendationsProvider;

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from 'react';
// import { useLocation } from './LocationProvider';
// import { useWeather } from './WeatherProvider';
// import { getRecommendations } from '@/services/recommendationsService';

// export interface Recommendation {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   distance: string;
//   tags: string[];
//   rating: number;
//   reviews: number;
//   priceLevel: string;
//   openingHours: string;
//   coordinates: {
//     latitude: number;
//     longitude: number;
//   };
//   category: string;
//   timeOfDay: string[];
//   transportModes: string[];
//   interests: string[];
// }

// interface Filters {
//   isVisible: boolean;
//   timeOfDay: string | null;
//   transportMode: string | null;
//   interests: string[];
//   distance: number;
//   searchQuery: string;
//   category: string;
// }

// interface RecommendationsContextProps {
//   recommendations: Recommendation[];
//   filteredRecommendations: Recommendation[];
//   favorites: Recommendation[];
//   filters: Filters;
//   isLoading: boolean;
//   error: string | null;
//   updateFilters: (newFilters: Partial<Filters>) => void;
//   toggleFilterVisibility: () => void;
//   toggleFavorite: (id: string) => void;
//   refreshRecommendations: () => void;
// }

// const RecommendationsContext = createContext<RecommendationsContextProps>({
//   recommendations: [],
//   filteredRecommendations: [],
//   favorites: [],
//   filters: {
//     isVisible: false,
//     timeOfDay: null,
//     transportMode: null,
//     interests: [],
//     distance: 10,
//     searchQuery: '',
//     category: '',
//   },
//   isLoading: true,
//   error: null,
//   updateFilters: () => {},
//   toggleFilterVisibility: () => {},
//   toggleFavorite: () => {},
//   refreshRecommendations: () => {},
// });

// interface RecommendationsProviderProps {
//   children: ReactNode;
// }

// export const RecommendationsProvider: React.FC<
//   RecommendationsProviderProps
// > = ({ children }) => {
//   const { location } = useLocation();
//   const { weather } = useWeather();

//   const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
//   const [filteredRecommendations, setFilteredRecommendations] = useState<
//     Recommendation[]
//   >([]);
//   const [favorites, setFavorites] = useState<Recommendation[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const [filters, setFilters] = useState<Filters>({
//     isVisible: false,
//     timeOfDay: null,
//     transportMode: null,
//     interests: [],
//     distance: 10,
//     searchQuery: '',
//     category: '',
//   });

//   const fetchRecommendations = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       if (!location || !weather) return;

//       const data = await getRecommendations({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         weather: String(weather),
//         timeOfDay: filters.timeOfDay || 'Afternoon',
//         month: new Date().toLocaleString('default', { month: 'long' }),
//         transportMode: filters.transportMode || 'Walking',
//         distanceKm: filters.distance,
//         interests: filters.interests,
//         category: filters.category,
//       });

//       setRecommendations(data);
//       setFilteredRecommendations(data);
//     } catch (err) {
//       console.error('Error fetching recommendations:', err);
//       setError('Failed to fetch recommendations');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (location && weather) {
//       fetchRecommendations();
//     }
//   }, [location, weather, filters]);

//   // useEffect(() => {
//   //   if (recommendations.length === 0) return;

//   //   let filtered = [...recommendations];

//   //   if (filters.timeOfDay) {
//   //     filtered = filtered.filter((item) =>
//   //       item.timeOfDay.includes(filters.timeOfDay!)
//   //     );
//   //   }

//   //   if (filters.transportMode) {
//   //     filtered = filtered.filter((item) =>
//   //       item.transportModes.includes(filters.transportMode!)
//   //     );
//   //   }

//   //   if (filters.category) {
//   //     filtered = filtered.filter(
//   //       (item) =>
//   //         item.category.toLowerCase() === filters.category!.toLowerCase()
//   //     );
//   //   }

//   //   if (filters.interests.length > 0) {
//   //     filtered = filtered.filter((item) =>
//   //       filters.interests.some((interest) => item.interests.includes(interest))
//   //     );
//   //   }

//   //   if (filters.searchQuery.trim() !== '') {
//   //     const query = filters.searchQuery.toLowerCase();
//   //     filtered = filtered.filter(
//   //       (item) =>
//   //         item.name.toLowerCase().includes(query) ||
//   //         item.description.toLowerCase().includes(query) ||
//   //         item.tags.some((tag) => tag.toLowerCase().includes(query))
//   //     );
//   //   }

//   //   filtered = filtered.filter((item) => {
//   //     const distanceValue = parseFloat(item.distance);
//   //     return !isNaN(distanceValue) && distanceValue <= filters.distance;
//   //   });

//   //   filtered.sort((a, b) => {
//   //     const dA = parseFloat(a.distance);
//   //     const dB = parseFloat(b.distance);
//   //     return dA - dB;
//   //   });

//   //   setFilteredRecommendations(filtered);
//   // }, [recommendations, filters]);

//   const updateFilters = (newFilters: Partial<Filters>) => {
//     setFilters((prev) => ({ ...prev, ...newFilters }));
//   };

//   const toggleFilterVisibility = () => {
//     setFilters((prev) => ({ ...prev, isVisible: !prev.isVisible }));
//   };

//   const toggleFavorite = (id: string) => {
//     setFavorites((prev) => {
//       const isFavorite = prev.some((fav) => fav.id === id);
//       if (isFavorite) return prev.filter((fav) => fav.id !== id);
//       const newFav = recommendations.find((rec) => rec.id === id);
//       return newFav ? [...prev, newFav] : prev;
//     });
//   };

//   return (
//     <RecommendationsContext.Provider
//       value={{
//         recommendations,
//         filteredRecommendations,
//         favorites,
//         filters,
//         isLoading,
//         error,
//         updateFilters,
//         toggleFilterVisibility,
//         toggleFavorite,
//         refreshRecommendations: fetchRecommendations,
//       }}
//     >
//       {children}
//     </RecommendationsContext.Provider>
//   );
// };

// export const useRecommendations = () => useContext(RecommendationsContext);

// export default RecommendationsProvider;
