import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, PanResponder, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

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

  // Custom Circular Slider Component with smooth drag functionality
  const CustomCircularSlider: React.FC = () => {
    const radius = 85;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const progress = ((temperature - 16) / (30 - 16)) * 100;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    
    // Animated values for smooth interactions
    const scaleValue = useRef(new Animated.Value(1)).current;
    const glowOpacity = useRef(new Animated.Value(0.1)).current;
    
    // State to track if user is currently dragging
    const [isDragging, setIsDragging] = useState(false);
    const [lastValidAngle, setLastValidAngle] = useState(0);
    
    // Calculate handle position
    const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2;
    const handleX = 110 + radius * Math.cos(angle);
    const handleY = 110 + radius * Math.sin(angle);

    // Smooth temperature calculation with better precision
    const calculateTemperatureFromPosition = useCallback((x: number, y: number) => {
      const centerX = 110;
      const centerY = 110;
      const dx = x - centerX;
      const dy = y - centerY;
      
      // Calculate distance from center
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only process if touch is within reasonable range of the circle
      if (distance < radius - 40 || distance > radius + 40) {
        return temperature; // Return current temperature if too far
      }
      
      // Calculate angle from center (0 to 2π)
      let touchAngle = Math.atan2(dy, dx);
      
      // Normalize to 0-2π range
      if (touchAngle < 0) {
        touchAngle += 2 * Math.PI;
      }
      
      // Adjust for starting position (top of circle = -π/2)
      touchAngle = touchAngle + Math.PI / 2;
      if (touchAngle > 2 * Math.PI) {
        touchAngle -= 2 * Math.PI;
      }
      
      // Smooth angle transition to prevent jumping
      const angleDiff = Math.abs(touchAngle - lastValidAngle);
      if (angleDiff > Math.PI && !isDragging) {
        // Large angle jump detected, use smoother transition
        if (touchAngle > Math.PI) {
          touchAngle -= 2 * Math.PI;
        } else {
          touchAngle += 2 * Math.PI;
        }
      }
      
      setLastValidAngle(touchAngle);
      
      // Convert angle to progress with better precision
      let progressValue = touchAngle / (2 * Math.PI);
      progressValue = Math.max(0, Math.min(1, progressValue));
      
      // Convert to temperature with smooth interpolation
      const tempRange = 30 - 16;
      const rawTemp = 16 + progressValue * tempRange;
      
      // Round to nearest 0.5 for smoother feel but still discrete values
      const newTemp = Math.round(rawTemp * 2) / 2;
      
      // Clamp final temperature
      return Math.max(16, Math.min(30, newTemp));
    }, [temperature, isDragging, lastValidAngle]);

    // Enhanced pan responder with smoother interactions
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          const touchX = evt.nativeEvent.locationX;
          const touchY = evt.nativeEvent.locationY;
          const centerX = 110;
          const centerY = 110;
          const distance = Math.sqrt(Math.pow(touchX - centerX, 2) + Math.pow(touchY - centerY, 2));
          
          // Allow dragging in a wider area around the circle
          return distance >= radius - 50 && distance <= radius + 50;
        },
        onPanResponderGrant: (evt) => {
          setIsDragging(true);
          
          // Haptic feedback when starting drag
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          
          // Initial touch position calculation
          const touchX = evt.nativeEvent.locationX;
          const touchY = evt.nativeEvent.locationY;
          const newTemp = calculateTemperatureFromPosition(touchX, touchY);
          setTemperature(newTemp);
          
          // Animate handle scale up for visual feedback
          Animated.parallel([
            Animated.spring(scaleValue, {
              toValue: 1.2,
              useNativeDriver: true,
              tension: 150,
              friction: 3,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0.3,
              duration: 150,
              useNativeDriver: true,
            })
          ]).start();
        },
        onPanResponderMove: (evt, gestureState) => {
          // Use cumulative gesture position for smoother tracking
          const touchX = evt.nativeEvent.locationX;
          const touchY = evt.nativeEvent.locationY;
          const newTemp = calculateTemperatureFromPosition(touchX, touchY);
          
          // Only update if temperature actually changed (reduces unnecessary re-renders)
          if (newTemp !== temperature) {
            setTemperature(newTemp);
            // Add subtle haptic feedback for temperature changes
            Haptics.selectionAsync();
          }
        },
        onPanResponderRelease: () => {
          setIsDragging(false);
          
          // Animate handle back to normal size
          Animated.parallel([
            Animated.spring(scaleValue, {
              toValue: 1,
              useNativeDriver: true,
              tension: 150,
              friction: 8,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0.1,
              duration: 300,
              useNativeDriver: true,
            })
          ]).start();
        },
        onPanResponderTerminate: () => {
          setIsDragging(false);
          // Reset animations if gesture is interrupted
          Animated.parallel([
            Animated.spring(scaleValue, {
              toValue: 1,
              useNativeDriver: true,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0.1,
              duration: 200,
              useNativeDriver: true,
            })
          ]).start();
        },
      })
    ).current;

    return (
      <View 
        style={{ width: 220, height: 220, justifyContent: 'center', alignItems: 'center' }}
        {...panResponder.panHandlers}
      >
        <Svg width="220" height="220" style={{ position: 'absolute' }}>
          <Defs>
            <SvgLinearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#a855f7" />
              <Stop offset="50%" stopColor="#c084fc" />
              <Stop offset="100%" stopColor="#e879f9" />
            </SvgLinearGradient>
            <SvgLinearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#374151" />
              <Stop offset="100%" stopColor="#4b5563" />
            </SvgLinearGradient>
            <SvgLinearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#9333ea" />
              <Stop offset="50%" stopColor="#a855f7" />
              <Stop offset="100%" stopColor="#c084fc" />
            </SvgLinearGradient>
          </Defs>
          
          {/* Animated outer glow effect */}
          <Circle
            cx="110"
            cy="110"
            r={radius + 15}
            stroke={isDragging ? "rgba(168, 85, 247, 0.4)" : "rgba(168, 85, 247, 0.1)"}
            strokeWidth={isDragging ? "25" : "20"}
            fill="none"
          />
          
          {/* Background track */}
          <Circle
            cx="110"
            cy="110"
            r={radius}
            stroke="url(#trackGradient)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* Progress Circle */}
          <Circle
            cx="110"
            cy="110"
            r={radius}
            stroke={isDragging ? "url(#activeGradient)" : "url(#purpleGradient)"}
            strokeWidth={isDragging ? strokeWidth + 3 : strokeWidth + 2}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 110 110)`}
          />
          
          {/* Draggable handle */}
          <Circle
            cx={handleX}
            cy={handleY}
            r={isDragging ? "16" : "14"}
            fill={isDragging ? "url(#activeGradient)" : "url(#purpleGradient)"}
          />
          <Circle
            cx={handleX}
            cy={handleY}
            r={isDragging ? "12" : "10"}
            fill="#ffffff"
          />
          <Circle
            cx={handleX}
            cy={handleY}
            r={isDragging ? "6" : "5"}
            fill={isDragging ? "url(#activeGradient)" : "url(#purpleGradient)"}
          />
        </Svg>
        
        {/* Center content */}
        <View style={{ position: 'absolute', alignItems: 'center' }}>
          <Text className="text-5xl font-bold text-white mb-2" style={{ fontWeight: '300' }}>
            {temperature}
          </Text>
          <Text className="text-lg text-gray-400 mb-4">
            °C
          </Text>
          
          {/* Integrated power button */}
          <TouchableOpacity
            onPress={togglePower}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: isOn ? 'rgba(168, 85, 247, 0.2)' : 'rgba(107, 114, 128, 0.3)',
              borderWidth: 2,
              borderColor: isOn ? '#a855f7' : '#6b7280',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialIcons 
              name="power-settings-new" 
              size={28} 
              color={isOn ? '#a855f7' : '#9ca3af'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Cool circular temperature control using custom SVG slider
  const CircularTempControl = () => {
    return (
      <View className="items-center mb-4">
        <CustomCircularSlider />
        
        {/* Temperature adjustment buttons */}
        <View className="flex-row justify-between w-48 mt-8">
          <TouchableOpacity
            onPress={decreaseTemp}
            style={{
              backgroundColor: 'rgba(168, 85, 247, 0.2)',
              borderWidth: 1,
              borderColor: '#a855f7',
              borderRadius: 25,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name="minus" size={24} color="#a855f7" />
          </TouchableOpacity>
          
          <View className="items-center justify-center">
            <Text className="text-xs text-gray-400 mb-1">Range</Text>
            <Text className="text-sm font-medium text-gray-300">16°C - 30°C</Text>
          </View>
          
          <TouchableOpacity
            onPress={increaseTemp}
            style={{
              backgroundColor: 'rgba(168, 85, 247, 0.2)',
              borderWidth: 1,
              borderColor: '#a855f7',
              borderRadius: 25,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name="plus" size={24} color="#a855f7" />
          </TouchableOpacity>
        </View>
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
            <View className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-700" style={{ backgroundColor: '#1f2937' }}>
              <View className="flex-row items-center justify-center mb-2">
                <MaterialIcons name="ac-unit" size={24} color="#a855f7" />
                <View className="flex-1 mx-4">
                  <View className="flex-row">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <View key={i} className="w-3 h-1 bg-purple-400 mr-1" />
                    ))}
                  </View>
                </View>
              </View>

              <View className="items-center">
                {/* Circular Temperature Control */}
                <CircularTempControl />

                {/* ON/OFF Buttons */}
                <View className="flex-row space-x-8 mt-6">
                  <TouchableOpacity
                    onPress={() => setIsOn(true)}
                    style={{
                      backgroundColor: isOn ? '#a855f7' : 'rgba(107, 114, 128, 0.3)',
                      paddingHorizontal: 24,
                      paddingVertical: 10,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: isOn ? '#a855f7' : '#6b7280',
                    }}
                  >
                    <Text style={{ 
                      color: isOn ? '#ffffff' : '#9ca3af',
                      fontWeight: '600',
                      fontSize: 16
                    }}>
                      ON
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setIsOn(false)}
                    style={{
                      backgroundColor: !isOn ? '#a855f7' : 'rgba(107, 114, 128, 0.3)',
                      paddingHorizontal: 24,
                      paddingVertical: 10,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: !isOn ? '#a855f7' : '#6b7280',
                    }}
                  >
                    <Text style={{ 
                      color: !isOn ? '#ffffff' : '#9ca3af',
                      fontWeight: '600',
                      fontSize: 16
                    }}>
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
