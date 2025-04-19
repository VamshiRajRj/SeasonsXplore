import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRecommendations } from '@/providers/RecommendationsProvider';
import { useThemeColor } from '@/hooks/useThemeColor';
import { X, Search } from 'lucide-react-native';
import Slider from '@react-native-community/slider';

interface FiltersBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  filters: any;
}

const FiltersBottomSheet: React.FC<FiltersBottomSheetProps> = ({
  visible,
  onClose,
  filters,
}) => {
  const { updateFilters } = useRecommendations();
  const { colors } = useThemeColor();

  // Local state to manage the form
  const [timeOfDay, setTimeOfDay] = useState<string | null>(filters.timeOfDay);
  const [transportMode, setTransportMode] = useState<string | null>(
    filters.transportMode
  );
  const [interests, setInterests] = useState<string[]>(filters.interests);
  const [distance, setDistance] = useState<number>(filters.distance);
  const [searchQuery, setSearchQuery] = useState<string>(filters.searchQuery);

  // Update local state when filters change
  useEffect(() => {
    setTimeOfDay(filters.timeOfDay);
    setTransportMode(filters.transportMode);
    setInterests(filters.interests);
    setDistance(filters.distance);
    setSearchQuery(filters.searchQuery);
  }, [filters]);

  const handleApplyFilters = () => {
    updateFilters({
      timeOfDay,
      transportMode,
      interests,
      distance,
      searchQuery,
    });
    onClose();
  };

  const handleResetFilters = () => {
    setTimeOfDay(null);
    setTransportMode(null);
    setInterests([]);
    setDistance(10);
    setSearchQuery('');

    updateFilters({
      timeOfDay: null,
      transportMode: null,
      interests: [],
      distance: 10,
      searchQuery: '',
    });

    onClose();
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const transportOptions = ['Walking', 'Biking', 'Driving', 'Public Transport'];
  const interestOptions = [
    'Outdoor',
    'Museums',
    'Adventure',
    'Stargazing',
    'Cafes',
    'Historical',
    'Romantic',
    'Chill',
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Search
              </Text>
              <View
                style={[
                  styles.searchContainer,
                  {
                    backgroundColor: colors.backgroundSecondary,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Search size={20} color={colors.textSecondary} />
                <TextInput
                  style={[styles.searchInput, { color: colors.text }]}
                  placeholder="What do you feel like doing today?"
                  placeholderTextColor={colors.textSecondary}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Time of Day
              </Text>
              <View style={styles.optionsGrid}>
                {timeOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      timeOfDay === option && [
                        styles.selectedOption,
                        { backgroundColor: colors.primary },
                      ],
                    ]}
                    onPress={() =>
                      setTimeOfDay(timeOfDay === option ? null : option)
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: timeOfDay === option ? '#FFFFFF' : colors.text,
                        },
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Transport
              </Text>
              <View style={styles.optionsGrid}>
                {transportOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionButton,
                      transportMode === option && [
                        styles.selectedOption,
                        { backgroundColor: colors.primary },
                      ],
                    ]}
                    onPress={() =>
                      setTransportMode(transportMode === option ? null : option)
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color:
                            transportMode === option ? '#FFFFFF' : colors.text,
                        },
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Interests
              </Text>
              <View style={styles.interestsGrid}>
                {interestOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.interestButton,
                      interests.includes(option) && [
                        styles.selectedInterest,
                        { backgroundColor: colors.primary },
                      ],
                    ]}
                    onPress={() => toggleInterest(option)}
                  >
                    <Text
                      style={[
                        styles.interestText,
                        {
                          color: interests.includes(option)
                            ? '#FFFFFF'
                            : colors.text,
                        },
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.distanceHeader}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Distance
                </Text>
                <Text style={[styles.distanceValue, { color: colors.text }]}>
                  {distance} km
                </Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={50}
                step={1}
                value={distance}
                onValueChange={setDistance}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.backgroundSecondary}
                thumbTintColor={colors.primary}
              />
              <View style={styles.distanceLabels}>
                <Text style={{ color: colors.textSecondary }}>1 km</Text>
                <Text style={{ color: colors.textSecondary }}>50 km</Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.resetButton, { borderColor: colors.border }]}
              onPress={handleResetFilters}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  closeButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedOption: {
    borderWidth: 0,
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  interestButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedInterest: {
    borderWidth: 0,
  },
  interestText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  distanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceValue: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  distanceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
});

export default FiltersBottomSheet;
