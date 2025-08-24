import React, { useState, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Switch, 
  PanResponder, 
  Animated 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

interface RemotePageProps {}

const RemotePage: React.FC<RemotePageProps> = () => {
  // State management
  const [temperature, setTemperature] = useState<number>(22);
  const [isOn, setIsOn] = useState<boolean>(false);
  const [smartSaveMode, setSmartSaveMode] = useState<boolean>(true);
  const [swingMode, setSwingMode] = useState<'horizontal' | 'vertical' | 'off'>('off');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Animation values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0.2)).current;

  // Temperature control functions
  const increaseTemp = useCallback(() => {
    if (temperature < 30) {
      setTemperature(prev => prev + 1);
      Haptics.selectionAsync();
    }
  }, [temperature]);

  const decreaseTemp = useCallback(() => {
    if (temperature > 16) {
      setTemperature(prev => prev - 1);
      Haptics.selectionAsync();
    }
  }, [temperature]);

  // Semi-circular dial component
  const SemiCircularDial: React.FC = () => {
    const radius = 100;
    const centerX = 150;
    const centerY = 150;
    
    // Calculate progress (0 to 1) based on temperature
    const progress = (temperature - 16) / (30 - 16);
    
    // Calculate handle position on semi-circle
    const angle = Math.PI - (progress * Math.PI); // Semi-circle from left to right
    const handleX = centerX + radius * Math.cos(angle);
    const handleY = centerY + radius * Math.sin(angle);

    // Pan responder for vertical scrolling
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          setIsDragging(true);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          
          Animated.parallel([
            Animated.spring(scaleValue, {
              toValue: 1.1,
              useNativeDriver: true,
              tension: 100,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0.6,
              duration: 200,
              useNativeDriver: true,
            })
          ]).start();
        },
        onPanResponderMove: (evt, gestureState) => {
          // Vertical scrolling to change temperature
          const sensitivity = 0.02;
          const deltaY = -gestureState.dy * sensitivity; // Negative for intuitive direction
          const newTemp = Math.round(Math.max(16, Math.min(30, temperature + deltaY)));
          
          if (newTemp !== temperature) {
            setTemperature(newTemp);
            Haptics.selectionAsync();
          }
        },
        onPanResponderRelease: () => {
          setIsDragging(false);
          
          Animated.parallel([
            Animated.spring(scaleValue, {
              toValue: 1,
              useNativeDriver: true,
              tension: 100,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0.2,
              duration: 300,
              useNativeDriver: true,
            })
          ]).start();
        },
      })
    ).current;

    return (
      <Animated.View 
        style={{ 
          transform: [{ scale: scaleValue }],
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...panResponder.panHandlers}
      >
        <Svg width="300" height="200" style={{ marginBottom: 20 }}>
          <Defs>
            <SvgLinearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#1e40af" />
              <Stop offset="50%" stopColor="#3b82f6" />
              <Stop offset="100%" stopColor="#60a5fa" />
            </SvgLinearGradient>
            <SvgLinearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#2563eb" />
              <Stop offset="50%" stopColor="#3b82f6" />
              <Stop offset="100%" stopColor="#1d4ed8" />
            </SvgLinearGradient>
            <SvgLinearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#374151" />
              <Stop offset="100%" stopColor="#4b5563" />
            </SvgLinearGradient>
          </Defs>
          
          {/* Glow effect */}
          <Animated.View style={{ opacity: glowOpacity }}>
            <Circle
              cx={centerX}
              cy={centerY}
              r={radius + 20}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="15"
              fill="none"
            />
          </Animated.View>
          
          {/* Background semi-circle track */}
          <Path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
            stroke="url(#trackGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Progress semi-circle */}
          <Path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${handleX} ${handleY}`}
            stroke={isDragging ? "url(#activeGradient)" : "url(#dialGradient)"}
            strokeWidth={isDragging ? "16" : "12"}
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Handle */}
          <Circle
            cx={handleX}
            cy={handleY}
            r={isDragging ? "12" : "10"}
            fill={isDragging ? "url(#activeGradient)" : "url(#dialGradient)"}
          />
          <Circle
            cx={handleX}
            cy={handleY}
            r={isDragging ? "8" : "6"}
            fill="#ffffff"
          />
        </Svg>
        
        {/* Temperature display */}
        <View className="absolute items-center" style={{ top: 80 }}>
          <Animated.Text 
            className="text-white font-light mb-2"
            style={{ 
              fontSize: isDragging ? 56 : 52,
              fontWeight: '300'
            }}
          >
            {temperature}
          </Animated.Text>
          <Text className="text-blue-400 text-lg font-medium">°C</Text>
        </View>
      </Animated.View>
    );
  };

  // Swing mode handler
  const handleSwingMode = (mode: 'horizontal' | 'vertical') => {
    setSwingMode(swingMode === mode ? 'off' : mode);
    Haptics.selectionAsync();
  };

  return (
    <LinearGradient colors={['#000000', '#111827']} className="flex-1">
      <SafeAreaView className="flex-1 px-6">
        {/* Top Section */}
        <View className="items-center mt-8 mb-6">
          {/* Smart Save Status */}
          <Text className="text-gray-400 text-sm mb-2">
            Smart Save Mode {smartSaveMode ? 'ON' : 'OFF'}
          </Text>
          
          {/* Brand */}
          <Text className="text-white text-2xl font-bold mb-6 tracking-wider">
            HELIUM
          </Text>
          
          {/* AC Unit Placeholder */}
          <View className="bg-blue-100 rounded-xl w-80 h-32 mb-8 items-center justify-center border border-blue-200">
            <MaterialIcons name="ac-unit" size={48} color="#3b82f6" />
            <Text className="text-blue-600 text-sm mt-2 font-medium">AC Unit Display</Text>
          </View>
        </View>

        {/* Temperature Dial */}
        <View className="items-center mb-8">
          <SemiCircularDial />
          
          {/* ON/OFF Buttons */}
          <View className="flex-row space-x-12 mt-4">
            <TouchableOpacity
              onPress={() => {
                setIsOn(true);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
              className={`px-8 py-3 rounded-xl border-2 ${
                isOn 
                  ? 'bg-blue-600 border-blue-600' 
                  : 'bg-gray-800 border-gray-600'
              }`}
            >
              <Text className={`font-semibold text-lg ${
                isOn ? 'text-white' : 'text-gray-400'
              }`}>
                ON
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                setIsOn(false);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
              className={`px-8 py-3 rounded-xl border-2 ${
                !isOn 
                  ? 'bg-blue-600 border-blue-600' 
                  : 'bg-gray-800 border-gray-600'
              }`}
            >
              <Text className={`font-semibold text-lg ${
                !isOn ? 'text-white' : 'text-gray-400'
              }`}>
                OFF
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Smart Save Mode Toggle */}
        <View className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <MaterialIcons name="eco" size={24} color="#10b981" />
              <Text className="text-white font-semibold ml-3 text-lg">
                Helium Smart Save Mode
              </Text>
            </View>
            <Switch
              value={smartSaveMode}
              onValueChange={(value) => {
                setSmartSaveMode(value);
                Haptics.selectionAsync();
              }}
              trackColor={{ false: '#374151', true: '#3b82f6' }}
              thumbColor={smartSaveMode ? '#ffffff' : '#9ca3af'}
              ios_backgroundColor="#374151"
            />
          </View>
        </View>

        {/* Advanced Controls (shown when Smart Save Mode is OFF) */}
        {!smartSaveMode && (
          <View className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
            <Text className="text-white font-medium mb-4 text-center">Advanced Controls</Text>
            <View className="flex-row justify-between">
              {['Mode', 'Timer', 'Fan', 'Turbo'].map((control, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => Haptics.selectionAsync()}
                  className="bg-blue-600 px-4 py-2 rounded-lg flex-1 mx-1"
                >
                  <Text className="text-white font-medium text-center text-sm">
                    {control}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Swing Control */}
        <View className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <Text className="text-white font-medium mb-4 text-center text-lg">
            Swing
          </Text>
          <View className="flex-row justify-center space-x-8">
            <TouchableOpacity
              onPress={() => handleSwingMode('horizontal')}
              className={`px-6 py-3 rounded-lg border-2 ${
                swingMode === 'horizontal'
                  ? 'bg-blue-600 border-blue-600'
                  : 'bg-gray-700 border-gray-600'
              }`}
            >
              <Text className={`font-medium ${
                swingMode === 'horizontal' ? 'text-white' : 'text-gray-300'
              }`}>
                Horizontal
              </Text>
            </TouchableOpacity>
            
            <View className="items-center justify-center">
              <View className="w-px h-8 bg-gray-600" />
            </View>
            
            <TouchableOpacity
              onPress={() => handleSwingMode('vertical')}
              className={`px-6 py-3 rounded-lg border-2 ${
                swingMode === 'vertical'
                  ? 'bg-blue-600 border-blue-600'
                  : 'bg-gray-700 border-gray-600'
              }`}
            >
              <Text className={`font-medium ${
                swingMode === 'vertical' ? 'text-white' : 'text-gray-300'
              }`}>
                Vertical
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text className="text-gray-400 text-sm text-center mt-3">
            Current: {swingMode === 'off' ? 'Off' : swingMode.charAt(0).toUpperCase() + swingMode.slice(1)}
          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default RemotePage;
