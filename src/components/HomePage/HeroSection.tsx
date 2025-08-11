// src/components/HomePage/HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const { height: screenHeight } = Dimensions.get('window');

interface HeroSectionProps {
  onShopPress?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onShopPress }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const insets = useSafeAreaInsets();
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <View className="relative justify-center items-center" style={{ height: screenHeight }}>
      {/* Background Video */}
      <Video
        ref={videoRef}
        source={{
          uri: 'https://res.cloudinary.com/dqhk6dblu/video/upload/v1752037197/hero-3_1_dtwdco.mp4',
        }}
        shouldPlay
        isLooping
        isMuted
        resizeMode={ResizeMode.COVER}
        useNativeControls={false}
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
        // Improves performance on Android
        posterSource={undefined}
        // On iOS, inline playback is default in RN; nothing special needed
      />

      {/* Dark Overlay */}
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/30" />

      {/* Title */}
      <View className="absolute w-full px-5" style={{ bottom: 160 }}>
        <Text className="text-[28px] font-bold text-[#e4e8e2] text-center leading-9 tracking-tight">
          Reimagining AC for New India
        </Text>
      </View>

      {/* Shop Button */}
      <View className="absolute w-full items-center" style={{ bottom: 40 + insets.bottom }}>
        <TouchableOpacity
          className="flex-row items-center bg-[#f5b841] px-8 py-4 rounded-full"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: [{ translateY: isLoaded ? 0 : 30 }],
          }}
          onPress={onShopPress}
          activeOpacity={0.8}
        >
          <Text className="text-lg font-semibold text-[#1e2a28]">Shop Now</Text>
          <Feather name="arrow-right" size={20} color="#1e2a28" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeroSection;
