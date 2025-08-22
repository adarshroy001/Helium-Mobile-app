import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, PanResponder, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

const RemoteScreen: React.FC = () => {
  const [smartSaveMode, setSmartSaveMode] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [swingMode, setSwingMode] = useState<'horizontal' | 'vertical' | 'off'>('off');

  const togglePower = () => setIsOn(!isOn);
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

  // Function to handle swing mode selection
  const handleSwingMode = (mode: 'horizontal' | 'vertical') => {
    setSwingMode(swingMode === mode ? 'off' : mode);
  };

  // Interactive circular temperature control component
  const CircularTempControl = () => {
    const radius = 60;
    const strokeWidth = 12;
    const center = 70; // radius + strokeWidth/2 + margin
    const minTemp = 16;
    const maxTemp = 30;
    
    // Calculate angle based on temperature (semicircle: 180 degrees)
    const tempRange = maxTemp - minTemp;
    const currentAngle = ((temperature - minTemp) / tempRange) * 180;
    
    // Convert angle to radians for thumb position
    const angleInRadians = (currentAngle - 90) * (Math.PI / 180); // -90 to start from top
    const thumbX = center + radius * Math.cos(angleInRadians);
    const thumbY = center + radius * Math.sin(angleInRadians);
    
    // Helper function to convert polar coordinates to cartesian
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
      const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180.0);
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };
    
    // Create path for semicircle
    const createPath = (startAngle: number, endAngle: number) => {
      const start = polarToCartesian(center, center, radius, endAngle);
      const end = polarToCartesian(center, center, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    };

    // Handle touch events for circular slider
    const handleTouch = (evt: any) => {
      const { locationX, locationY } = evt.nativeEvent;
      
      // Calculate angle from touch position
      const dx = locationX - center;
      const dy = locationY - center;
      let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; // +90 to adjust for starting position
      
      // Constrain to semicircle (0 to 180 degrees)
      if (angle < 0) angle = 0;
      if (angle > 180) angle = 180;
      
      // Convert angle to temperature
      const newTemp = Math.round(minTemp + (angle / 180) * tempRange);
      setTemperature(Math.max(minTemp, Math.min(maxTemp, newTemp)));
    };

    // Pan responder for drag gestures
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: handleTouch,
      onPanResponderMove: handleTouch,
      onPanResponderRelease: () => {},
    });

    return (
      <View className="items-center mb-4">
        <View 
          style={{ width: center * 2, height: center + 20 }}
          {...panResponder.panHandlers}
        >
          <Svg width={center * 2} height={center + 20}>
            {/* Background semicircle */}
            <Path
              d={createPath(0, 180)}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            
            {/* Active semicircle */}
            <Path
              d={createPath(0, currentAngle)}
              fill="none"
              stroke="#0369a1"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            
            {/* Temperature markers */}
            {[16, 18, 20, 22, 24, 26, 28, 30].map((temp) => {
              const markerAngle = ((temp - minTemp) / tempRange) * 180;
              const markerRad = (markerAngle - 90) * (Math.PI / 180);
              const markerX = center + (radius - strokeWidth/2 - 5) * Math.cos(markerRad);
              const markerY = center + (radius - strokeWidth/2 - 5) * Math.sin(markerRad);
              
              return (
                <Circle
                  key={temp}
                  cx={markerX}
                  cy={markerY}
                  r="2"
                  fill={temp <= temperature ? "#0369a1" : "#d1d5db"}
                />
              );
            })}
            
            {/* Draggable thumb */}
            <Circle
              cx={thumbX}
              cy={thumbY}
              r="10"
              fill="#0369a1"
              stroke="#ffffff"
              strokeWidth="4"
            />
            
            {/* Center temperature display */}
            <SvgText
              x={center}
              y={center - 5}
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
              fill="#0369a1"
            >
              {temperature}°C
            </SvgText>
          </Svg>
        </View>
        
        {/* Temperature adjustment buttons */}
        <View className="flex-row justify-between w-32 mt-4">
          <TouchableOpacity
            onPress={decreaseTemp}
            className="bg-sky-200 rounded-full w-8 h-8 items-center justify-center"
          >
            <Feather name="minus" size={14} color="#0369a1" />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={increaseTemp}
            className="bg-sky-200 rounded-full w-8 h-8 items-center justify-center"
          >
            <Feather name="plus" size={14} color="#0369a1" />
          </TouchableOpacity>
        </View>
        
        {/* Temperature range display */}
        <Text className="text-xs text-gray-500 mt-2">
          {minTemp}°C - {maxTemp}°C
        </Text>
      </View>
    );
  };

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
              HELIUM Smart AC Remote
            </Text>
          </View>

          {/* Remote Control Interface */}
          <View className="bg-neutral-white rounded-3xl p-6 mb-6 shadow-lg border-2 border-neutral-lightGray">
            {/* Smart Save Mode Header */}
            <View className="items-center mb-4">
              <Text className="text-xs text-neutral-textGray mb-1">
                Smart Save Mode {smartSaveMode ? 'ON' : 'OFF'}
              </Text>
              <Text className="text-lg font-bold text-neutral-darkGray">
                HELIUM
              </Text>
            </View>

            {/* Display Screen */}
            <View className="bg-sky-100 rounded-xl p-4 mb-6 border border-sky-200">
              <View className="flex-row items-center justify-center mb-2">
                <MaterialIcons name="ac-unit" size={24} color="#0369a1" />
                <View className="flex-1 mx-4">
                  <View className="flex-row">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <View key={i} className="w-3 h-1 bg-sky-300 mr-1" />
                    ))}
                  </View>
                </View>
              </View>

              <View className="items-center">
                {/* Circular Temperature Control */}
                <CircularTempControl />

                {/* ON/OFF Buttons */}
                <View className="flex-row space-x-8 mt-4">
                  <TouchableOpacity
                    onPress={() => setIsOn(true)}
                    className={`px-6 py-2 rounded ${isOn ? 'bg-sky-500' : 'bg-gray-300'}`}
                  >
                    <Text className={`text-sm font-medium ${isOn ? 'text-white' : 'text-gray-600'}`}>
                      ON
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsOn(false)}
                    className={`px-6 py-2 rounded ${!isOn ? 'bg-sky-500' : 'bg-gray-300'}`}
                  >
                    <Text className={`text-sm font-medium ${!isOn ? 'text-white' : 'text-gray-600'}`}>
                      OFF
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Smart Save Mode Toggle */}
            <View className="flex-row items-center justify-between bg-gray-100 rounded-lg p-3 mb-4">
              <View className="flex-row items-center">
                <MaterialIcons name="eco" size={20} color="#059669" />
                <Text className="ml-2 text-neutral-darkGray font-medium">
                  Helium Smart Save Mode
                </Text>
              </View>
              <Switch
                value={smartSaveMode}
                onValueChange={setSmartSaveMode}
                trackColor={{ false: '#d1d5db', true: '#10b981' }}
                thumbColor={smartSaveMode ? '#ffffff' : '#ffffff'}
              />
            </View>

            {/* Additional Controls (shown when Smart Save Mode is OFF) */}
            {!smartSaveMode && (
              <View className="bg-gray-50 rounded-lg p-3 mb-4">
                <View className="flex-row justify-between mb-2">
                  <TouchableOpacity className="bg-primary-base px-3 py-2 rounded">
                    <Text className="text-white text-xs font-medium">Mode</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-gray-300 px-3 py-2 rounded">
                    <Text className="text-gray-700 text-xs font-medium">Timer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-gray-300 px-3 py-2 rounded">
                    <Text className="text-gray-700 text-xs font-medium">Fan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-gray-300 px-3 py-2 rounded">
                    <Text className="text-gray-700 text-xs font-medium">Turbo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Swing Controls */}
            <View className="bg-gray-100 rounded-lg p-3 mb-6">
              <Text className="text-center text-neutral-darkGray font-medium mb-3">
                Swing
              </Text>
              <View className="flex-row justify-center space-x-8">
                <TouchableOpacity
                  onPress={() => handleSwingMode('horizontal')}
                  className={`px-4 py-2 rounded ${swingMode === 'horizontal' ? 'bg-primary-base' : 'bg-gray-300'}`}
                >
                  <Text className={`text-xs font-medium ${swingMode === 'horizontal' ? 'text-white' : 'text-gray-700'}`}>
                    Horizontal
                  </Text>
                </TouchableOpacity>
                <Text className="text-gray-500 self-center">|</Text>
                <TouchableOpacity
                  onPress={() => handleSwingMode('vertical')}
                  className={`px-4 py-2 rounded ${swingMode === 'vertical' ? 'bg-primary-base' : 'bg-gray-300'}`}
                >
                  <Text className={`text-xs font-medium ${swingMode === 'vertical' ? 'text-white' : 'text-gray-700'}`}>
                    Vertical
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Remote Control Buttons */}
            <View className="border-t border-gray-200 pt-4">
              <View className="flex-row justify-between mb-3">
                <TouchableOpacity className="bg-gray-200 w-12 h-8 rounded items-center justify-center">
                  <Text className="text-xs font-medium text-gray-700">Remote</Text>
                </TouchableOpacity>
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    onPress={decreaseTemp}
                    className="bg-accent-mint w-10 h-8 rounded items-center justify-center"
                  >
                    <Feather name="minus" size={16} color="#033129" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={increaseTemp}
                    className="bg-accent-mint w-10 h-8 rounded items-center justify-center"
                  >
                    <Feather name="plus" size={16} color="#033129" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Navigation Grid */}
              <View className="flex-row justify-center space-x-2">
                <View className="bg-gray-200 w-8 h-6 rounded" />
                <View className="bg-gray-200 w-8 h-6 rounded" />
                <View className="bg-gray-200 w-8 h-6 rounded" />
              </View>
            </View>
          </View>

          {/* Status Information */}
          <View className="bg-neutral-white rounded-helium p-4 mb-6 shadow-sm border border-neutral-lightGray">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-neutral-darkGray font-medium">HELIUM AC Status</Text>
              <View className="bg-green-100 px-2 py-1 rounded-full">
                <Text className="text-green-700 text-xs font-medium">CONNECTED</Text>
              </View>
            </View>
            <Text className="text-neutral-textGray text-sm">
              {smartSaveMode
                ? "• By default HELIUM SMART SAVE MODE will be on"
                : "• Smart Save Mode is OFF - Additional settings are available (MODE, TIMER, FAN, TURBO)"
              }
            </Text>
            <Text className="text-neutral-textGray text-sm mt-1">
              • Swing Mode: {swingMode === 'off' ? 'Off' : swingMode.charAt(0).toUpperCase() + swingMode.slice(1)}
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RemoteScreen;
