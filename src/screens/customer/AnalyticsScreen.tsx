import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const AnalyticsScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const energyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [12, 15, 8, 20, 18, 14, 16],
        color: (opacity = 1) => `rgba(59, 120, 123, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const usageData = {
    labels: ['Living', 'Bedroom', 'Kitchen', 'Office'],
    datasets: [
      {
        data: [45, 30, 15, 10],
      },
    ],
  };

  return (
    <LinearGradient colors={['#f6fdfc', '#ffffff']} className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mt-6 mb-8">
            <Text className="text-neutral-darkGray text-3xl font-bold mb-2">
              Analytics
            </Text>
            <Text className="text-neutral-textGray text-base">
              Track your energy usage and savings
            </Text>
          </View>

          {/* Period Selector */}
          <View className="flex-row bg-neutral-white rounded-helium p-2 mb-6 shadow-sm border border-neutral-lightGray">
            {(['week', 'month', 'year'] as const).map((period) => (
              <TouchableOpacity
                key={period}
                onPress={() => setSelectedPeriod(period)}
                className={`flex-1 py-2 rounded-md ${
                  selectedPeriod === period ? 'bg-primary-base' : ''
                }`}
              >
                <Text
                  className={`text-center font-medium capitalize ${
                    selectedPeriod === period ? 'text-neutral-white' : 'text-neutral-textGray'
                  }`}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Stats Cards */}
          <View className="flex-row justify-between mb-6">
            <View className="flex-1 bg-neutral-white rounded-helium p-4 mr-2 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between mb-2">
                <Feather name="zap" size={20} color="#3b787b" />
                <Text className="text-green-600 text-sm font-medium">-12%</Text>
              </View>
              <Text className="text-2xl font-bold text-neutral-darkGray mb-1">
                125 kWh
              </Text>
              <Text className="text-neutral-textGray text-sm">
                Energy Used
              </Text>
            </View>

            <View className="flex-1 bg-neutral-white rounded-helium p-4 ml-2 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between mb-2">
                <Feather name="dollar-sign" size={20} color="#3b787b" />
                <Text className="text-green-600 text-sm font-medium">-15%</Text>
              </View>
              <Text className="text-2xl font-bold text-neutral-darkGray mb-1">
                ₹2,450
              </Text>
              <Text className="text-neutral-textGray text-sm">
                Cost Saved
              </Text>
            </View>
          </View>

          {/* Energy Usage Chart */}
          <View className="bg-neutral-white rounded-helium p-4 mb-6 shadow-sm border border-neutral-lightGray">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">
              Energy Usage Trend
            </Text>
            
            {/* Simple Chart Representation */}
            <View className="flex-row items-end justify-between h-32 px-4">
              {energyData.labels.map((day, index) => (
                <View key={day} className="items-center">
                  <View 
                    className="bg-primary-base rounded-t-md mb-2" 
                    style={{ 
                      height: energyData.datasets[0].data[index] * 4,
                      width: 20 
                    }}
                  />
                  <Text className="text-neutral-textGray text-xs">{day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Room Usage Chart */}
          <View className="bg-neutral-white rounded-helium p-4 mb-6 shadow-sm border border-neutral-lightGray">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">
              Usage by Room
            </Text>
            
            {/* Simple Bar Representation */}
            <View className="space-y-3">
              {usageData.labels.map((room, index) => (
                <View key={room} className="flex-row items-center">
                  <Text className="text-neutral-darkGray w-16 text-sm">{room}</Text>
                  <View className="flex-1 bg-neutral-lightGray rounded-full h-3 ml-3">
                    <View 
                      className="bg-primary-base h-3 rounded-full"
                      style={{ width: `${usageData.datasets[0].data[index]}%` }}
                    />
                  </View>
                  <Text className="text-neutral-textGray text-sm w-10 text-right ml-2">
                    {usageData.datasets[0].data[index]}%
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Efficiency Tips */}
          <View className="bg-neutral-white rounded-helium p-6 mb-8 shadow-sm border border-neutral-lightGray">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">
              Efficiency Tips
            </Text>
            
            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <View className="bg-accent-mint rounded-full p-2 mr-3">
                  <Feather name="thermometer" size={16} color="#033129" />
                </View>
                <Text className="flex-1 text-neutral-darkGray font-medium">
                  Optimal Temperature
                </Text>
              </View>
              <Text className="text-neutral-textGray text-sm ml-10">
                Keep your AC at 24°C for best efficiency
              </Text>
            </View>

            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <View className="bg-accent-mint rounded-full p-2 mr-3">
                  <Feather name="clock" size={16} color="#033129" />
                </View>
                <Text className="flex-1 text-neutral-darkGray font-medium">
                  Smart Scheduling
                </Text>
              </View>
              <Text className="text-neutral-textGray text-sm ml-10">
                Use timer function to avoid unnecessary usage
              </Text>
            </View>

            <View>
              <View className="flex-row items-center mb-2">
                <View className="bg-accent-mint rounded-full p-2 mr-3">
                  <Feather name="filter" size={16} color="#033129" />
                </View>
                <Text className="flex-1 text-neutral-darkGray font-medium">
                  Regular Maintenance
                </Text>
              </View>
              <Text className="text-neutral-textGray text-sm ml-10">
                Clean filters monthly for optimal performance
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AnalyticsScreen;
