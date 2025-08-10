import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'ProMax', 'EcoSmart', 'Compact'];
  
  const products = [
    {
      id: 1,
      name: 'Helium ProMax 2.0',
      category: 'ProMax',
      price: '$1,299',
      rating: 4.8,
      image: '#90c9c4',
      specs: ['1.5 Ton', 'Inverter', '5 Star']
    },
    {
      id: 2,
      name: 'Helium EcoSmart Plus',
      category: 'EcoSmart',
      price: '$899',
      rating: 4.6,
      image: '#c5dfd3',
      specs: ['1 Ton', 'Energy Efficient', '4 Star']
    },
    {
      id: 3,
      name: 'Helium Compact Mini',
      category: 'Compact',
      price: '$649',
      rating: 4.5,
      image: '#6baba5',
      specs: ['0.8 Ton', 'Compact', '3 Star']
    },
    {
      id: 4,
      name: 'Helium ProMax Elite',
      category: 'ProMax',
      price: '$1,599',
      rating: 4.9,
      image: '#3b787b',
      specs: ['2 Ton', 'Premium', '5 Star']
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      className="flex-1 mx-2 mb-4"
    >
      <View className="bg-neutral-white rounded-helium overflow-hidden shadow-helium">
        {/* Product Image Placeholder */}
        <View 
          className="h-40 justify-end items-end p-4"
          style={{ backgroundColor: item.image }}
        >
          <View className="bg-neutral-white px-2 py-1 rounded-full">
            <View className="flex-row items-center">
              <Feather name="star" size={12} color="#fb8641" />
              <Text className="text-neutral-darkGray text-xs font-bold ml-1">{item.rating}</Text>
            </View>
          </View>
        </View>

        {/* Product Info */}
        <View className="p-4">
          <Text className="text-neutral-darkGray text-base font-bold mb-1">{item.name}</Text>
          
          {/* Specs */}
          <View className="flex-row flex-wrap mb-2">
            {item.specs.map((spec, index) => (
              <View key={index} className="bg-accent-mint px-2 py-1 rounded-full mr-1 mb-1">
                <Text className="text-primary-deep text-xs font-medium">{spec}</Text>
              </View>
            ))}
          </View>

          <Text className="text-primary-base text-lg font-bold">{item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#f6fdfc', '#ffffff']} className="flex-1">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-neutral-textGray text-base">Good morning</Text>
              <Text className="text-neutral-darkGray text-2xl font-bold">Welcome to Helium</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-neutral-white rounded-full items-center justify-center shadow-sm">
              <Feather name="bell" size={20} color="#6baba5" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-neutral-white rounded-helium border border-neutral-lightGray shadow-sm">
            <View className="flex-row items-center px-4 py-3">
              <Feather name="search" size={20} color="#6baba5" />
              <Text className="text-neutral-textGray ml-3 flex-1">Search air conditioners...</Text>
              <TouchableOpacity>
                <Feather name="sliders" size={20} color="#6baba5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className="mr-3"
            >
              {selectedCategory === category ? (
                <LinearGradient
                  colors={['#3b787b', '#033129']}
                  className="px-6 py-3 rounded-helium"
                >
                  <Text className="text-neutral-white font-semibold">{category}</Text>
                </LinearGradient>
              ) : (
                <View className="px-6 py-3 bg-neutral-white rounded-helium border border-neutral-lightGray">
                  <Text className="text-neutral-textGray font-medium">{category}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;