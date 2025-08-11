// screens/HomeScreen/components/ImageStackedPinning/index.tsx
import React from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface ImagePanelData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const ImageStackedPinning: React.FC = () => {
  const imagePanels: ImagePanelData[] = [
    {
      id: '1',
      title: 'Integrated Air Purifier',
      subtitle: 'Not just cool air — clean air.',
      description: 'Save cost, space, and complexity with built-in purification. Perfect for health-conscious urban homes like Delhi NCR & Bengaluru.',
      imageUrl: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037892/2_jvcoiw.jpg'
    },
    {
      id: '2',
      title: 'Refrigerant Leakage Detector',
      subtitle: 'Helium ACs protect themselves.',
      description: 'Detect gas leaks before they become breakdowns. No surprise service calls — just peace of mind.',
      imageUrl: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037893/4_uinp5o.jpg'
    },
    {
      id: '3',
      title: 'Front Panel Customisation',
      subtitle: 'Your AC, your style.',
      description: 'Match your AC to your vibe. Make it yours with design-forward front panels — a first in the industry.',
      imageUrl: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037894/3_g5phkk.png'
    },
    {
      id: '4',
      title: 'IoT Control & Smart Features',
      subtitle: 'The smartest AC you have ever owned.',
      description: 'Control from anywhere, get smart alerts, and unlock advanced diagnostics — all from your phone.',
      imageUrl: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037892/1_udzmcb.jpg'
    },
    {
      id: '5',
      title: 'Heavy-Duty, Best-in-Class Machine',
      subtitle: 'Built for extremes. Ready for anything.',
      description: 'Engineered for Indian summers. Delivers top performance even at 55°C — powerful and durable.',
      imageUrl: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037893/5_lfsvpq.jpg'
    }
  ];

  return (
    <View className="bg-[#0E0E10] pt-12 pb-5">
      <View className="px-5 pt-16 pb-8">
        <Text className="text-[32px] font-bold text-white text-center mb-4">
          Innovation at its <Text className="text-[#f5b841]">finest</Text>
        </Text>
        <Text className="text-base text-white text-center opacity-80 leading-6">
          Everyday moments, reimagined with smart, app-first cooling.
        </Text>
      </View>

      <ScrollView 
        className="px-4"
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {imagePanels.map((panel, index) => (
          <View key={panel.id} className="mb-8 rounded-2xl overflow-hidden border border-[#282626]">
            <View className="bg-[#121111] p-6 h-[200px]">
              <View className="items-center bg-white/20 self-center px-4 py-2 rounded-full mb-4">
                <Text className="text-white text-sm font-semibold">
                  {String(index + 1).padStart(2, '0')}
                </Text>
              </View>
              
              <Text className="text-xl font-bold text-white text-center mb-3 leading-7">
                {panel.title}
              </Text>
              <Text className="text-sm text-white/80 text-center leading-5">
                {panel.description}
              </Text>
            </View>
            
            <View className="h-[280px]">
              <Image 
                source={{ uri: panel.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ImageStackedPinning;
