import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RemoteScreen: React.FC = () => {
  const [temperature, setTemperature] = useState(22);
  const [isOn, setIsOn] = useState(false);
  const [heliumSmartMode, setHeliumSmartMode] = useState(true); // Default ON
  const [activeMode, setActiveMode] = useState<'Mode' | 'Timer' | 'Fan' | 'Turbo'>('Mode'); // Default Mode selected
  const [swingDirection, setSwingDirection] = useState<'Horizontal' | 'Vertical' | null>('Vertical');

  const increaseTemp = () => {
    if (temperature < 30) {
      setTemperature(temperature + 1);
    }
  };

  const decreaseTemp = () => {
    if (temperature > 16) {
      setTemperature(temperature - 1);
    }
  };

  const handleModeSelect = (mode: 'Mode' | 'Timer' | 'Fan' | 'Turbo') => {
    if (heliumSmartMode) return; // Only work when Helium Smart Mode is OFF
    setActiveMode(mode);
  };

  const handleSwingSelect = (direction: 'Horizontal' | 'Vertical') => {
    setSwingDirection(swingDirection === direction ? null : direction);
  };

  const CircularRemote = () => {
    return (
      <View className="items-center h-fit">
        {/* Remote Control Container */}
        <View className="bg-slate-100 rounded-3xl p-6 shadow-2xl border border-gray-200" style={{ width: 320 }}>
          
          {/* Display Screen */}
          <View className="bg-slate-800 rounded-2xl p-4 mb-4 border border-slate-600">
            <View className="items-center mt-2">
              <Text className="text-white text-3xl font-bold">{temperature}°C</Text>
              <Text className="text-slate-300 text-xs">Current Temperature</Text>
            </View>
            <View className="items-center mt-2 flex-row justify-center">
              <Text className="text-slate-300 text-xs">Status {" "}</Text>
              {isOn ? 
              <Text className="text-green-400 text-sm">ON</Text>: 
              <Text className="text-red-400 text-sm">OFF</Text>}
            </View>
            {/* Min/Max at the bottom of display screen */}
            <View className="flex-row justify-between mt-4 px-2">
              <Text className="text-slate-400 text-xs">Min: 16°C</Text>
              <Text className="text-slate-400 text-xs">Max: 30°C</Text>
            </View>
          </View>

          {/* Control Section - Right below screen */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2 px-2">Control</Text>
            <View className="flex-row justify-between">
              {/* Decrease Temp Button */}
              <TouchableOpacity 
                onPress={decreaseTemp}
                className="flex-1 mx-1 py-3 bg-blue-600 rounded-xl shadow-lg"
              >
                <Text className="text-white text-center font-semibold">-</Text>
              </TouchableOpacity>
              {/* Power Button */}
              <TouchableOpacity 
                onPress={() => setIsOn(!isOn)}
                className={`flex-1 mx-1 py-3 rounded-xl shadow-lg ${isOn ? 'bg-green-600' : 'bg-gray-600'}`}
              >
                {isOn ? <Text className="text-white text-center font-semibold">ON</Text>
                : 
                <Text className="text-white text-center font-semibold">OFF</Text>}
              </TouchableOpacity>
              {/* Increase Temp Button */}
              <TouchableOpacity 
                onPress={increaseTemp}
                className="flex-1 mx-1 py-3 bg-blue-600 rounded-xl shadow-lg"
              >
                <Text className="text-white text-center font-semibold">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Helium Smart Save Mode Section */}
          <View className="mb-4">
            {/* Smart Mode Toggle */}
            <View className="flex-row items-center justify-between mb-3 px-2">
              <Text className="text-gray-700 font-medium">Helium Smart Save Mode</Text>
              
              {/* Premium Toggle Switch Design */}
              <TouchableOpacity 
                onPress={() => setHeliumSmartMode(!heliumSmartMode)}
                className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                  heliumSmartMode 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                    : 'bg-gray-300'
                }`}
                style={{
                  shadowColor: heliumSmartMode ? '#3b82f6' : '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: heliumSmartMode ? 0.4 : 0.15,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                {/* Toggle Track Overlay for depth */}
                <View className={`absolute inset-0 rounded-full ${
                  heliumSmartMode ? 'bg-blue-400' : 'bg-gray-400'
                } opacity-20`} />
                
                {/* Toggle Slider */}
                <View 
                  className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ${
                    heliumSmartMode ? 'right-1 left-auto' : 'left-1 right-auto'
                  }`}
                  style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                    elevation: 4,
                  }}
                >
                  {/* Inner circle for extra depth */}
                  <View className={`absolute inset-0.5 rounded-full ${
                    heliumSmartMode ? 'bg-blue-50' : 'bg-gray-50'
                  }`} />
                  
                  {/* Status indicator dot */}
                  <View className={`absolute top-2 left-2 w-2 h-2 rounded-full transition-all duration-300 ${
                    heliumSmartMode ? 'bg-blue-500 opacity-90' : 'bg-gray-400 opacity-60'
                  }`} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Mode Buttons (Only visible when Smart Mode is OFF) */}
            {!heliumSmartMode && (
              <View>
                <View className="flex-row justify-between mb-2">
                  {['Mode', 'Timer'].map((mode) => (
                    <TouchableOpacity
                      key={mode}
                      onPress={() => handleModeSelect(mode as 'Mode' | 'Timer')}
                      className={`flex-1 mx-1 py-2 rounded-lg ${
                        activeMode === mode ? 'bg-blue-600' : 'bg-gray-500'
                      }`}
                    >
                      <Text className="text-white text-center text-sm font-medium">
                        {mode}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View className="flex-row justify-between">
                  {['Fan', 'Turbo'].map((mode) => (
                    <TouchableOpacity
                      key={mode}
                      onPress={() => handleModeSelect(mode as 'Fan' | 'Turbo')}
                      className={`flex-1 mx-1 py-2 rounded-lg ${
                        activeMode === mode ? 'bg-blue-600' : 'bg-gray-500'
                      }`}
                    >
                      <Text className="text-white text-center text-sm font-medium">
                        {mode}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Swing Section */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2 px-2">Swing</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => handleSwingSelect('Horizontal')}
                className={`flex-1 mx-1 py-2 rounded-lg ${
                  swingDirection === 'Horizontal' ? 'bg-green-600' : 'bg-gray-500'
                }`}
              >
                <Text className="text-white text-center text-sm font-medium">
                  Horizontal
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSwingSelect('Vertical')}
                className={`flex-1 mx-1 py-2 rounded-lg ${
                  swingDirection === 'Vertical' ? 'bg-green-600' : 'bg-gray-500'
                }`}
              >
                <Text className="text-white text-center text-sm font-medium">
                  Vertical
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* First Section - AC Image (Fixed height) */}
        <View className="w-full h-60 mb-6">
          <View className="flex-1 items-center justify-center w-full">
            <Image
              source={require('../../../assets/images/acImg.png')}
              className="w-full flex-1"
              resizeMode="contain"
            />
          </View>
        </View>
        
        {/* Second Section - Remote Control Design */}
        <View className="items-center px-6 pb-12">
          <Text className="text-gray-800 text-2xl font-semibold mb-8">
            AC Remote Control
          </Text>
          <CircularRemote />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RemoteScreen;