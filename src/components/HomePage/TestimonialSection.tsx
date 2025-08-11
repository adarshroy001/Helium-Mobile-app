// screens/HomeScreen/components/TestimonialSection/index.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

const TestimonialSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const testimonials: Testimonial[] = [
    {
      quote: "What I love about Helium is not just the product—it's the service. Fast, transparent, and customer-obsessed.",
      name: "Nikhil Verma",
      title: "Customer Experience Lead, Amazon",
      company: "amazon"
    },
    {
      quote: "We deployed Helium units in our co-working spaces and saw a 30% drop in user complaints overnight.",
      name: "Priya Desai",
      title: "COO, 91Springboard",
      company: "flipkart"
    },
    {
      quote: "I ordered a Helium AC after a friend recommended it, and it's been a total game-changer this summer.",
      name: "Arjun Mehta",
      title: "Helium Customer",
      company: "helium"
    },
    {
      quote: "Helium isn't selling ACs. They're selling experiences. This is what the future of appliances looks like.",
      name: "Tanvi Ghosh",
      title: "Design Strategist",
      company: "amazon"
    },
    {
      quote: "Helium is redefining comfort. The app-controlled cooling experience is so seamless, I can't imagine going back.",
      name: "Ritika Sharma",
      title: "Helium Customer",
      company: "helium"
    },
  ];

  const getCompanyColor = (company: string): string => {
    switch (company) {
      case 'amazon': return '#ff9500';
      case 'flipkart': return '#ff4444';
      default: return '#4a9eff';
    }
  };

  useEffect(() => {
    if (!isUserInteracting) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isUserInteracting, testimonials.length]);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: currentSlide * width,
      animated: true,
    });
  }, [currentSlide]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const slideIndex = Math.round(offsetX / width);
    if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
    }
  };

  return (
    <View className="relative py-20 min-h-[600px]">
      <Image
        source={{ uri: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037893/b-bg1_lkiwk0.jpg' }}
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
        resizeMode="cover"
      />
      
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/60" />
      
      <View className="flex-1 z-10">
        <View className="px-6 mb-10 items-center">
          <Text className="text-[32px] font-bold text-white text-center mb-4 leading-10">
            What Our Customers <Text className="text-[#f5b841] border-b-2 border-[#f5b841]">Say</Text>
          </Text>
          <Text className="text-base text-white/70 text-center leading-6 px-5">
            Real experiences from customers who've transformed their cooling experience with Helium
          </Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onScrollBeginDrag={() => setIsUserInteracting(true)}
          onScrollEndDrag={() => setTimeout(() => setIsUserInteracting(false), 2000)}
          scrollEventThrottle={16}
          className="mb-8"
        >
          {testimonials.map((testimonial, index) => (
            <View key={index} style={{ width }} className="px-6">
              <View className="bg-black rounded-2xl p-6 min-h-[280px]">
                <View className="mb-6">
                  <Text className="text-lg font-bold text-white mb-1">
                    {testimonial.company}
                  </Text>
                  <View 
                    className="w-8 h-0.5 rounded-full" 
                    style={{ backgroundColor: getCompanyColor(testimonial.company) }}
                  />
                </View>

                <Text className="text-base text-white leading-6 mb-6">
                  "{testimonial.quote}"
                </Text>

                <View className="border-t border-gray-700 pt-4 mb-4">
                  <Text className="text-base font-semibold text-white mb-1">
                    {testimonial.name}
                  </Text>
                  <Text className="text-sm text-gray-400">
                    {testimonial.title}
                  </Text>
                </View>

                <View className="flex-row gap-2">
                  <View className="w-6 h-0.5 bg-white rounded-full" />
                  <View className="w-2 h-0.5 bg-gray-600 rounded-full" />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="flex-row justify-center gap-2 px-6">
          {testimonials.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCurrentSlide(index);
                setIsUserInteracting(true);
                setTimeout(() => setIsUserInteracting(false), 3000);
              }}
              className={`w-2 h-2 rounded-full bg-white ${
                index === currentSlide ? 'opacity-100' : 'opacity-50'
              }`}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default TestimonialSection;
