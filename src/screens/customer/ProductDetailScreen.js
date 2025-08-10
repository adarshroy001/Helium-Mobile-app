import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSpec, setSelectedSpec] = useState('Features');

  const images = [product.image, '#c5dfd3', '#6baba5', '#90c9c4'];
  const specTabs = ['Features', 'Specifications', 'Installation'];

  const features = [
    'Inverter Technology for energy efficiency',
    'Wi-Fi connectivity for smart control',
    'Advanced filtration system',
    'Dual rotary compressor',
    'Quick cooling technology'
  ];

  const specifications = [
    { label: 'Capacity', value: '1.5 Ton' },
    { label: 'Energy Rating', value: '5 Star' },
    { label: 'Room Size', value: '150-180 sq ft' },
    { label: 'Noise Level', value: '< 40 dB' },
    { label: 'Warranty', value: '5 Years Comprehensive' }
  ];

  return (
    <LinearGradient colors={['#f6fdfc', '#ffffff']} className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image Gallery */}
          <View className="mb-6">
            <ScrollView 
              horizontal 
              pagingEnabled 
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(event.nativeEvent.contentOffset.x / width);
                setSelectedImage(index);
              }}
            >
              {images.map((image, index) => (
                <View 
                  key={index}
                  style={{ width, height: 300, backgroundColor: image }}
                  className="justify-center items-center"
                >
                  <View className="w-32 h-32 bg-primary-deep rounded-helium-lg items-center justify-center">
                    <Text className="text-neutral-white text-2xl font-bold">He</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            
            {/* Image Indicators */}
            <View className="flex-row justify-center mt-4">
              {images.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    index === selectedImage ? 'bg-primary-base' : 'bg-neutral-lightGray'
                  }`}
                />
              ))}
            </View>
          </View>

          <View className="px-6">
            {/* Product Info */}
            <View className="mb-6">
              <Text className="text-neutral-darkGray text-2xl font-bold mb-2">{product.name}</Text>
              <View className="flex-row items-center mb-4">
                <View className="flex-row items-center mr-4">
                  <Feather name="star" size={16} color="#fb8641" />
                  <Text className="text-neutral-textGray ml-1">{product.rating} (124 reviews)</Text>
                </View>
                <View className="bg-feedback-success px-2 py-1 rounded-full">
                  <Text className="text-neutral-white text-xs font-bold">In Stock</Text>
                </View>
              </View>
              <Text className="text-primary-base text-3xl font-bold mb-4">{product.price}</Text>
              
              {/* Quick Specs */}
              <View className="flex-row flex-wrap">
                {product.specs.map((spec, index) => (
                  <View key={index} className="bg-accent-mint px-3 py-2 rounded-helium mr-2 mb-2">
                    <Text className="text-primary-deep text-sm font-medium">{spec}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Specification Tabs */}
            <View className="mb-6">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
                {specTabs.map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setSelectedSpec(tab)}
                    className="mr-4"
                  >
                    {selectedSpec === tab ? (
                      <LinearGradient
                        colors={['#3b787b', '#033129']}
                        className="px-4 py-2 rounded-helium"
                      >
                        <Text className="text-neutral-white font-semibold">{tab}</Text>
                      </LinearGradient>
                    ) : (
                      <View className="px-4 py-2 bg-neutral-white rounded-helium border border-neutral-lightGray">
                        <Text className="text-neutral-textGray font-medium">{tab}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Spec Content */}
              <View className="bg-neutral-white p-4 rounded-helium border border-neutral-lightGray">
                {selectedSpec === 'Features' && (
                  <View>
                    {features.map((feature, index) => (
                      <View key={index} className="flex-row items-start mb-3">
                        <Feather name="check-circle" size={16} color="#28a57f" className="mt-1" />
                        <Text className="text-neutral-textGray ml-3 flex-1">{feature}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {selectedSpec === 'Specifications' && (
                  <View>
                    {specifications.map((spec, index) => (
                      <View key={index} className="flex-row justify-between py-2 border-b border-neutral-lightGray">
                        <Text className="text-neutral-textGray">{spec.label}</Text>
                        <Text className="text-neutral-darkGray font-semibold">{spec.value}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {selectedSpec === 'Installation' && (
                  <View>
                    <Text className="text-neutral-textGray mb-2">Professional installation included with purchase.</Text>
                    <Text className="text-neutral-textGray">• Free site survey and assessment</Text>
                    <Text className="text-neutral-textGray">• Expert installation within 48 hours</Text>
                    <Text className="text-neutral-textGray">• 2-year installation warranty</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Bar */}
        <View className="px-6 py-4 border-t border-neutral-lightGray bg-neutral-white">
          <View className="flex-row">
            <TouchableOpacity className="w-12 h-12 bg-accent-mint rounded-helium items-center justify-center mr-4">
              <Feather name="heart" size={20} color="#033129" />
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1">
              <LinearGradient
                colors={['#3b787b', '#033129']}
                className="py-4 rounded-helium items-center shadow-helium"
              >
                <Text className="text-neutral-white text-base font-semibold">Buy Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProductDetailScreen;