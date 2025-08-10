import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Video } from '../../types';

const { width } = Dimensions.get('window');

type ProductVideosScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductVideos'>;

interface Props {
  navigation: ProductVideosScreenNavigationProp;
}

const ProductVideosScreen: React.FC<Props> = ({ navigation }) => {
  const [currentVideo, setCurrentVideo] = useState<number>(0);

  const videos: Video[] = [
    {
      id: 1,
      title: 'Helium ProMax Series',
      subtitle: 'Ultimate Cooling Performance',
      duration: '2:30',
      thumbnail: '#90c9c4'
    },
    {
      id: 2,
      title: 'Helium EcoSmart',
      subtitle: 'Energy Efficient Technology',
      duration: '1:45',
      thumbnail: '#c5dfd3'
    },
    {
      id: 3,
      title: 'Helium Compact',
      subtitle: 'Perfect for Small Spaces',
      duration: '2:15',
      thumbnail: '#6baba5'
    }
  ];

  const handleSkip = (): void => {
    navigation.navigate('MainApp');
  };

  const handleWatchVideo = (index: number): void => {
    setCurrentVideo(index);
    // Here you would typically open video player
  };

  const handleLearnMore = (): void => {
    navigation.navigate('MainApp');
  };

  return (
    <LinearGradient colors={['#033129', '#3b787b']} className="flex-1">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 mt-4 mb-8">
          <View>
            <Text className="text-neutral-white text-2xl font-bold">Discover Helium</Text>
            <Text className="text-primary-light text-sm">Premium Air Conditioning</Text>
          </View>
          <TouchableOpacity onPress={handleSkip}>
            <Text className="text-primary-light text-base font-medium">Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Video Carousel */}
        <ScrollView 
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          className="mb-8"
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentVideo(index);
          }}
        >
          {videos.map((video, index) => (
            <View key={video.id} style={{ width }} className="px-6">
              <View className="bg-neutral-white rounded-helium-lg overflow-hidden shadow-helium-lg">
                {/* Video Thumbnail */}
                <View 
                  className="h-64 justify-center items-center relative"
                  style={{ backgroundColor: video.thumbnail }}
                >
                  {/* Play Button */}
                  <TouchableOpacity 
                    onPress={() => handleWatchVideo(index)}
                    className="w-20 h-20 bg-neutral-white rounded-full items-center justify-center shadow-helium"
                  >
                    <Feather name="play" size={32} color="#033129" style={{ marginLeft: 4 }} />
                  </TouchableOpacity>

                  {/* Duration Badge */}
                  <View className="absolute top-4 right-4 bg-neutral-darkGray px-3 py-1 rounded-full">
                    <Text className="text-neutral-white text-sm font-medium">{video.duration}</Text>
                  </View>

                  {/* Lottie Animation Placeholder */}
                  <View className="absolute bottom-4 left-4 w-12 h-12 bg-primary-deep rounded-full items-center justify-center">
                    <Text className="text-neutral-white text-xs font-bold">He</Text>
                  </View>
                </View>

                {/* Video Info */}
                <View className="p-6">
                  <Text className="text-neutral-darkGray text-xl font-bold mb-2">{video.title}</Text>
                  <Text className="text-neutral-textGray text-base mb-4">{video.subtitle}</Text>
                  
                  <TouchableOpacity onPress={handleLearnMore}>
                    <LinearGradient
                      colors={['#3b787b', '#033129']}
                      className="py-3 px-6 rounded-helium items-center"
                    >
                      <Text className="text-neutral-white text-base font-semibold">Learn More</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Page Indicators */}
        <View className="flex-row justify-center items-center mb-8">
          {videos.map((_, index) => (
            <View
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentVideo ? 'bg-neutral-white' : 'bg-primary-light'
              }`}
            />
          ))}
        </View>

        {/* Bottom Actions */}
        <View className="px-6 mb-6">
          <TouchableOpacity onPress={handleLearnMore}>
            <LinearGradient
              colors={['#ffffff', '#f6fdfc']}
              className="py-4 rounded-helium items-center shadow-helium"
            >
              <Text className="text-primary-deep text-base font-semibold">Explore Products</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProductVideosScreen;
