import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Animate logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();

    // Navigate after animation
    const timer = setTimeout(() => {
      navigation.replace('PhoneOTP');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <LinearGradient
      colors={['#f6fdfc', '#90c9c4']}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 justify-center items-center">
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }}
          className="items-center"
        >
          {/* Logo Placeholder - Space for Lottie Animation */}
          <View className="w-32 h-32 bg-primary-deep rounded-helium-lg mb-6 justify-center items-center shadow-helium">
            <Text className="text-neutral-white text-4xl font-bold">He</Text>
          </View>
          
          {/* Brand Name */}
          <Text className="text-primary-deep text-4xl font-bold mb-2">Helium</Text>
          <Text className="text-neutral-textGray text-lg font-light">Pure Air. Pure Comfort.</Text>
          
          {/* Loading indicator */}
          <View className="mt-8 w-16 h-1 bg-neutral-lightGray rounded-full overflow-hidden">
            <Animated.View 
              className="h-full bg-primary-base rounded-full"
              style={{
                width: '100%',
                transform: [{
                  translateX: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-64, 0]
                  })
                }]
              }}
            />
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SplashScreen;
