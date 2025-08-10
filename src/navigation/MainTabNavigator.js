import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Tab Screens
import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import ReferralScreen from '../screens/ReferralScreen';
import SupportScreen from '../screens/SupportScreen';

const Tab = createBottomTabNavigator();

const TabBarBackground = () => (
  <LinearGradient
    colors={['#ffffff', '#f6fdfc']}
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    }}
  />
);

const MainTabNavigator = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Shop':
              iconName = 'shopping-bag';
              break;
            case 'Referral':
              iconName = 'gift';
              break;
            case 'Support':
              iconName = 'help-circle';
              break;
            default:
              iconName = 'circle';
          }

          return (
            <View className="items-center justify-center">
              <Feather name={iconName} size={20} color={color} />
            </View>
          );
        },
        tabBarButton: (props) => {
          const { accessibilityState, children, onPress, style } = props;
          const focused = accessibilityState?.selected;
          
          return (
            <View 
              style={[
                style,
                {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 4,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 16,
                  backgroundColor: focused ? '#e6f3f1' : 'transparent',
                }
              ]}
              onTouchEnd={onPress}
            >
              {children}
            </View>
          );
        },
        tabBarActiveTintColor: '#033129',
        tabBarInactiveTintColor: '#6baba5',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
          marginBottom: 4
        },
        tabBarStyle: {
          height: 70 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingHorizontal: 16,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#033129',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          backgroundColor: 'transparent',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0
        },
        tabBarBackground: () => <TabBarBackground />
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Referral" component={ReferralScreen} />
      <Tab.Screen name="Support" component={SupportScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;