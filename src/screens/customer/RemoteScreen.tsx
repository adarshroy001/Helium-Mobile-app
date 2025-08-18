import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const RemoteScreen: React.FC = () => {
  return (
    <LinearGradient colors={['#f6fdfc', '#ffffff']} className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mt-6 mb-8">
            <Text className="text-neutral-darkGray text-3xl font-bold mb-2">
              Remote Control
            </Text>
            <Text className="text-neutral-textGray text-base">
              Control your AC units remotely
            </Text>
          </View>

          {/* AC Units List */}
          <View className="mb-6">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">
              Your AC Units
            </Text>
            
            {/* AC Unit 1 */}
            <View className="bg-neutral-white rounded-helium p-6 mb-4 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text className="text-neutral-darkGray text-lg font-semibold">
                    Living Room AC
                  </Text>
                  <Text className="text-neutral-textGray text-sm">
                    ProMax Series • Online
                  </Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-700 text-xs font-medium">ONLINE</Text>
                </View>
              </View>

              {/* Temperature Display */}
              <View className="items-center mb-6">
                <Text className="text-6xl font-light text-neutral-darkGray mb-2">
                  24°
                </Text>
                <Text className="text-neutral-textGray">Current Temperature</Text>
              </View>

              {/* Controls */}
              <View className="flex-row justify-between items-center mb-4">
                <TouchableOpacity className="bg-accent-mint rounded-full p-4">
                  <Feather name="minus" size={20} color="#033129" />
                </TouchableOpacity>
                
                <View className="items-center">
                  <Text className="text-2xl font-semibold text-neutral-darkGray mb-1">
                    20°C
                  </Text>
                  <Text className="text-neutral-textGray text-sm">Target</Text>
                </View>
                
                <TouchableOpacity className="bg-accent-mint rounded-full p-4">
                  <Feather name="plus" size={20} color="#033129" />
                </TouchableOpacity>
              </View>

              {/* Mode Buttons */}
              <View className="flex-row justify-between">
                <TouchableOpacity className="flex-1 bg-primary-base rounded-helium py-3 mr-2">
                  <Text className="text-neutral-white text-center font-medium">
                    Cool
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-neutral-lightGray rounded-helium py-3 ml-2">
                  <Text className="text-neutral-textGray text-center font-medium">
                    Auto
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* AC Unit 2 */}
            <View className="bg-neutral-white rounded-helium p-6 mb-4 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text className="text-neutral-darkGray text-lg font-semibold">
                    Bedroom AC
                  </Text>
                  <Text className="text-neutral-textGray text-sm">
                    EcoSmart Series • Offline
                  </Text>
                </View>
                <View className="bg-red-100 px-3 py-1 rounded-full">
                  <Text className="text-red-700 text-xs font-medium">OFFLINE</Text>
                </View>
              </View>

              <View className="items-center py-8 opacity-50">
                <Feather name="wifi-off" size={48} color="#6baba5" />
                <Text className="text-neutral-textGray text-center mt-4">
                  AC unit is offline
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="mb-8">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">
              Quick Actions
            </Text>
            
            <View className="flex-row justify-between">
              <TouchableOpacity className="flex-1 bg-neutral-white rounded-helium p-4 mr-2 items-center shadow-sm border border-neutral-lightGray">
                <Feather name="power" size={24} color="#033129" className="mb-2" />
                <Text className="text-neutral-darkGray text-sm font-medium">
                  Turn Off All
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-1 bg-neutral-white rounded-helium p-4 ml-2 items-center shadow-sm border border-neutral-lightGray">
                <Feather name="thermometer" size={24} color="#033129" className="mb-2" />
                <Text className="text-neutral-darkGray text-sm font-medium">
                  Eco Mode
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RemoteScreen;
