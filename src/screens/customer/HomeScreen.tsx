// screens/HomeScreen/index.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import HeroSection from '../../components/HomePage/HeroSection';
import ImageStackedPinning from '../../components/HomePage/ImageStackedPinning';
import FloatingGallery from '../../components/HomePage/FloatingGallery';
import TestimonialSection from '../../components/HomePage/TestimonialSection';
import WaitlistSection from '../../components/HomePage/WaitlistSection';

const HomeScreen: React.FC = () => {

  return (
    <ScrollView 
      className="flex-1 bg-[#080808]"
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <HeroSection />
      <ImageStackedPinning />
      <FloatingGallery />
      <TestimonialSection />
      <WaitlistSection />
    </ScrollView>
  );
};

export default HomeScreen;
