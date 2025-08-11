// screens/HomeScreen/components/FloatingGallery/index.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, ScrollView } from 'react-native';

interface FloatingGalleryProps {
  onShopPress?: () => void;
}

const FloatingGallery: React.FC<FloatingGalleryProps> = ({ onShopPress }) => {
  const animatedValues = useRef(
    Array.from({ length: 12 }, () => new Animated.Value(0))
  ).current;

  const images = [
    { id: 1, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037461/12_lfachu.png', alt: 'AC 1' },
    { id: 2, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037460/10_wxxd5x.png', alt: 'AC 2' },
    { id: 3, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037459/9_vpzjig.png', alt: 'AC 3' },
    { id: 4, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037460/11_dfo9xx.jpg', alt: 'AC 4' },
    { id: 5, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037449/8_grcrny.jpg', alt: 'AC 5' },
    { id: 6, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037441/7_wkehpd.jpg', alt: 'AC 6' },
    { id: 7, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037440/5_rv5xe9.jpg', alt: 'AC 7' },
    { id: 8, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037440/6_zl9vmj.jpg', alt: 'AC 8' },
    { id: 9, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037439/3_fcmbd0.jpg', alt: 'AC 9' },
    { id: 10, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037438/4_b0sa7n.jpg', alt: 'AC 10' },
    { id: 11, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037437/2_isp0n2.jpg', alt: 'AC 11' },
    { id: 12, src: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037437/1_yizo49.jpg', alt: 'AC 12' },
  ];

  useEffect(() => {
    animatedValues.forEach((animatedValue, index) => {
      const createAnimation = () => {
        return Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: index % 2 === 0 ? -10 : 10,
            duration: 3000 + (index * 200),
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 3000 + (index * 200),
            useNativeDriver: true,
          }),
        ]);
      };

      const loopAnimation = () => {
        createAnimation().start(() => loopAnimation());
      };

      setTimeout(() => {
        loopAnimation();
      }, index * 200);
    });
  }, [animatedValues]);

  return (
    <ScrollView className="bg-[#080808] py-20" showsVerticalScrollIndicator={false}>
      <View className="px-6 items-center">
        <View className="mb-10 items-center">
          <Text className="text-[32px] font-bold text-white text-center mb-6 leading-10">
            Try <Text className="text-[#f5b841]">Helium</Text> for{'\n'}just ₹8,000
          </Text>
          <Text className="text-base text-white/70 text-center mb-8 leading-6 max-w-[300px]">
            Experience premium, app-first cooling with inbuilt air purification — all for a special introductory price. No compromises, just innovation.
          </Text>
          <View className="mb-10">
            <Text className="text-sm text-white/60 mb-3">✓ Smart app-controlled AC</Text>
            <Text className="text-sm text-white/60 mb-3">✓ Integrated air purifier</Text>
            <Text className="text-sm text-white/60 mb-3">✓ Futuristic design & silent cooling</Text>
            <Text className="text-sm text-white/60 mb-3">✓ Free delivery + installation</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap justify-center gap-4 mb-10 px-5">
          {images.map((image, index) => (
            <Animated.View
              key={image.id}
              style={{
                transform: [{ translateY: animatedValues[index] }]
              }}
              className="w-[100px] h-[60px] rounded-xl overflow-hidden border border-[#444444]"
            >
              <TouchableOpacity activeOpacity={0.8}>
                <Image
                  source={{ uri: image.src }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <TouchableOpacity
          className="bg-[#f5b841] px-8 py-4 rounded-[25px]"
          onPress={onShopPress}
          activeOpacity={0.8}
        >
          <Text className="text-base font-semibold text-[#1e2a28] text-center">
            Shop Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FloatingGallery;
