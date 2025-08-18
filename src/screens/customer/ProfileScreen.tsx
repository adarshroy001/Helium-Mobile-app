import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const ProfileScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoModeEnabled, setAutoModeEnabled] = useState(false);
  const [energySavingEnabled, setEnergySavingEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
      ]
    );
  };

  const profileMenuItems = [
    {
      id: '1',
      title: 'Personal Information',
      icon: 'user' as keyof typeof Feather.glyphMap,
      action: () => console.log('Personal Info'),
    },
    {
      id: '2',
      title: 'My AC Units',
      icon: 'wind' as keyof typeof Feather.glyphMap,
      action: () => console.log('AC Units'),
    },
    {
      id: '3',
      title: 'Purchase History',
      icon: 'shopping-bag' as keyof typeof Feather.glyphMap,
      action: () => console.log('Purchase History'),
    },
    {
      id: '4',
      title: 'Payment Methods',
      icon: 'credit-card' as keyof typeof Feather.glyphMap,
      action: () => console.log('Payment Methods'),
    },
    {
      id: '5',
      title: 'Addresses',
      icon: 'map-pin' as keyof typeof Feather.glyphMap,
      action: () => console.log('Addresses'),
    },
  ];

  return (
    <LinearGradient colors={['#f6fdfc', '#ffffff']} className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mt-6 mb-8">
            <Text className="text-neutral-darkGray text-3xl font-bold mb-2">
              Profile
            </Text>
            <Text className="text-neutral-textGray text-base">
              Manage your account and preferences
            </Text>
          </View>

          {/* User Info Card */}
          <View className="bg-neutral-white rounded-helium p-6 mb-6 shadow-sm border border-neutral-lightGray">
            <View className="flex-row items-center">
              <View className="bg-primary-base rounded-full w-16 h-16 items-center justify-center mr-4">
                <Text className="text-neutral-white text-2xl font-bold">
                  J
                </Text>
              </View>
              
              <View className="flex-1">
                <Text className="text-neutral-darkGray text-xl font-semibold mb-1">
                  John Doe
                </Text>
                <Text className="text-neutral-textGray text-base mb-2">
                  +91 98765 43210
                </Text>
                <View className="bg-green-100 px-3 py-1 rounded-full self-start">
                  <Text className="text-green-700 text-xs font-medium">
                    Verified Customer
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity className="bg-accent-mint rounded-full p-2">
                <Feather name="edit-2" size={20} color="#033129" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Profile Menu */}
          <View className="mb-6">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">
              Account Settings
            </Text>
            
            {profileMenuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={item.action}
                className="bg-neutral-white rounded-helium p-4 mb-3 shadow-sm border border-neutral-lightGray"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="bg-accent-mint rounded-full p-2 mr-3">
                      <Feather name={item.icon} size={20} color="#033129" />
                    </View>
                    <Text className="text-neutral-darkGray text-base font-medium">
                      {item.title}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={20} color="#6baba5" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Preferences */}
          <View className="mb-6">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">
              Preferences
            </Text>
            
            {/* Notifications */}
            <View className="bg-neutral-white rounded-helium p-4 mb-3 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-accent-mint rounded-full p-2 mr-3">
                    <Feather name="bell" size={20} color="#033129" />
                  </View>
                  <View>
                    <Text className="text-neutral-darkGray text-base font-medium">
                      Push Notifications
                    </Text>
                    <Text className="text-neutral-textGray text-sm">
                      Receive alerts and updates
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#e2e8e6', true: '#6baba5' }}
                  thumbColor={notificationsEnabled ? '#033129' : '#f4f3f4'}
                />
              </View>
            </View>

            {/* Auto Mode */}
            <View className="bg-neutral-white rounded-helium p-4 mb-3 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-accent-mint rounded-full p-2 mr-3">
                    <Feather name="cpu" size={20} color="#033129" />
                  </View>
                  <View>
                    <Text className="text-neutral-darkGray text-base font-medium">
                      Smart Auto Mode
                    </Text>
                    <Text className="text-neutral-textGray text-sm">
                      Automatic temperature control
                    </Text>
                  </View>
                </View>
                <Switch
                  value={autoModeEnabled}
                  onValueChange={setAutoModeEnabled}
                  trackColor={{ false: '#e2e8e6', true: '#6baba5' }}
                  thumbColor={autoModeEnabled ? '#033129' : '#f4f3f4'}
                />
              </View>
            </View>

            {/* Energy Saving */}
            <View className="bg-neutral-white rounded-helium p-4 mb-3 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-accent-mint rounded-full p-2 mr-3">
                    <Feather name="battery" size={20} color="#033129" />
                  </View>
                  <View>
                    <Text className="text-neutral-darkGray text-base font-medium">
                      Energy Saving Mode
                    </Text>
                    <Text className="text-neutral-textGray text-sm">
                      Optimize for energy efficiency
                    </Text>
                  </View>
                </View>
                <Switch
                  value={energySavingEnabled}
                  onValueChange={setEnergySavingEnabled}
                  trackColor={{ false: '#e2e8e6', true: '#6baba5' }}
                  thumbColor={energySavingEnabled ? '#033129' : '#f4f3f4'}
                />
              </View>
            </View>
          </View>

          {/* Support & Legal */}
          <View className="mb-6">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">
              Support & Legal
            </Text>
            
            <TouchableOpacity className="bg-neutral-white rounded-helium p-4 mb-3 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-accent-mint rounded-full p-2 mr-3">
                    <Feather name="help-circle" size={20} color="#033129" />
                  </View>
                  <Text className="text-neutral-darkGray text-base font-medium">
                    Help & Support
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#6baba5" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-neutral-white rounded-helium p-4 mb-3 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-accent-mint rounded-full p-2 mr-3">
                    <Feather name="file-text" size={20} color="#033129" />
                  </View>
                  <Text className="text-neutral-darkGray text-base font-medium">
                    Terms & Conditions
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#6baba5" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-neutral-white rounded-helium p-4 mb-3 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="bg-accent-mint rounded-full p-2 mr-3">
                    <Feather name="shield" size={20} color="#033129" />
                  </View>
                  <Text className="text-neutral-darkGray text-base font-medium">
                    Privacy Policy
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color="#6baba5" />
              </View>
            </TouchableOpacity>
          </View>

          {/* App Version */}
          <View className="bg-neutral-white rounded-helium p-4 mb-6 shadow-sm border border-neutral-lightGray">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="bg-accent-mint rounded-full p-2 mr-3">
                  <Feather name="info" size={20} color="#033129" />
                </View>
                <Text className="text-neutral-darkGray text-base font-medium">
                  App Version
                </Text>
              </View>
              <Text className="text-neutral-textGray text-base">
                v1.2.3
              </Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-50 rounded-helium p-4 mb-8 border border-red-200"
          >
            <View className="flex-row items-center justify-center">
              <Feather name="log-out" size={20} color="#dc2626" className="mr-3" />
              <Text className="text-red-600 text-base font-semibold ml-3">
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfileScreen;
