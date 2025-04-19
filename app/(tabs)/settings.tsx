import { StyleSheet, Text, View, Switch, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Sun, Moon, MapPin, ChevronRight, LogOut, User, Bell, Shield } from 'lucide-react-native';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useThemeColor();

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'theme',
          title: 'Dark Mode',
          icon: isDark ? <Moon size={20} color={colors.text} /> : <Sun size={20} color={colors.text} />,
          type: 'switch',
          value: isDark,
          onValueChange: toggleTheme,
        },
        {
          id: 'units',
          title: 'Temperature Units',
          icon: <Sun size={20} color={colors.text} />,
          type: 'value',
          value: '°C',
        },
        {
          id: 'distanceUnits',
          title: 'Distance Units',
          icon: <MapPin size={20} color={colors.text} />,
          type: 'value',
          value: 'km',
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Profile',
          icon: <User size={20} color={colors.text} />,
          type: 'link',
        },
        {
          id: 'notifications',
          title: 'Notifications',
          icon: <Bell size={20} color={colors.text} />,
          type: 'link',
        },
        {
          id: 'privacy',
          title: 'Privacy',
          icon: <Shield size={20} color={colors.text} />,
          type: 'link',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
              {section.title}
            </Text>
            <View style={[styles.sectionContent, { backgroundColor: colors.cardBackground }]}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    index !== section.items.length - 1 && [styles.settingItemBorder, { borderBottomColor: colors.border }],
                  ]}
                  disabled={item.type === 'switch'}
                >
                  <View style={styles.settingItemLeft}>
                    {item.icon}
                    <Text style={[styles.settingItemTitle, { color: colors.text }]}>
                      {item.title}
                    </Text>
                  </View>

                  <View style={styles.settingItemRight}>
                    {item.type === 'switch' && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: colors.switchTrack, true: colors.primary }}
                        thumbColor={Platform.OS === 'ios' ? undefined : colors.switchThumb}
                      />
                    )}
                    {item.type === 'value' && (
                      <Text style={[styles.settingItemValue, { color: colors.textSecondary }]}>
                        {item.value}
                      </Text>
                    )}
                    {item.type === 'link' && <ChevronRight size={20} color={colors.textSecondary} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.cardBackground }]}
        >
          <LogOut size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  sectionContent: {
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemTitle: {
    fontSize: 16,
    marginLeft: 16,
    fontFamily: 'Inter-Regular',
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemValue: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
  },
});