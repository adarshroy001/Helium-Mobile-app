import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Product, CategoryType } from '../../types';

type ShopScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainApp'>;

interface Props {
  navigation: ShopScreenNavigationProp;
}

interface ShopProduct extends Product {
  originalPrice?: string;
  discount?: string;
}

const ShopScreen: React.FC<Props> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('AC Units');

  const categories: CategoryType[] = ['AC Units', 'Accessories', 'Parts', 'Filters'];
  
  const products: ShopProduct[] = [
    {
      id: 1,
      name: 'Helium ProMax 2.0',
      category: 'AC Units',
      price: '$1,299',
      originalPrice: '$1,499',
      rating: 4.8,
      image: '#90c9c4',
      specs: ['1.5 Ton', 'Inverter', '5 Star'],
      discount: '13% OFF'
    },
    {
      id: 2,
      name: 'Smart Thermostat',
      category: 'Accessories',
      price: '$149',
      rating: 4.6,
      image: '#c5dfd3',
      specs: ['Smart', 'WiFi', 'App Control']
    },
    {
      id: 3,
      name: 'HEPA Air Filter',
      category: 'Filters',
      price: '$29',
      rating: 4.5,
      image: '#6baba5',
      specs: ['HEPA', 'Washable', 'Long-lasting']
    },
    {
      id: 4,
      name: 'Remote Control',
      category: 'Accessories',
      price: '$39',
      rating: 4.9,
      image: '#3b787b',
      specs: ['Universal', 'Backlit', 'Voice Control']
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === 'AC Units' ? product.category === 'AC Units' : product.category === selectedCategory
  );

  const handleAddToCart = (product: ShopProduct): void => {
    setCartItems(cartItems + 1);
  };

  const renderProduct = ({ item }: { item: ShopProduct }) => (
    <TouchableOpacity className="flex-1 mx-2 mb-4">
      <View className="bg-neutral-white rounded-helium overflow-hidden shadow-helium">
        {/* Product Image */}
        <View 
          className="h-40 justify-between p-4"
          style={{ backgroundColor: item.image }}
        >
          {item.discount && (
            <View className="bg-feedback-error px-2 py-1 rounded-full self-start">
              <Text className="text-neutral-white text-xs font-bold">{item.discount}</Text>
            </View>
          )}
          
          <TouchableOpacity className="bg-neutral-white w-8 h-8 rounded-full items-center justify-center self-end">
            <Feather name="heart" size={16} color="#6baba5" />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View className="p-4">
          <Text className="text-neutral-darkGray text-base font-bold mb-2">{item.name}</Text>
          
          <View className="flex-row items-center mb-3">
            <Text className="text-primary-base text-lg font-bold">{item.price}</Text>
            {item.originalPrice && (
              <Text className="text-neutral-textGray text-sm line-through ml-2">{item.originalPrice}</Text>
            )}
          </View>

          <TouchableOpacity 
            onPress={() => handleAddToCart(item)}
            className="bg-primary-base py-2 rounded-helium items-center"
          >
            <Text className="text-neutral-white font-semibold">Add to Cart</Text>
          </TouchableOpacity>
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
            <Text className="text-neutral-darkGray text-2xl font-bold">Shop</Text>
            <TouchableOpacity className="relative">
              <View className="w-10 h-10 bg-neutral-white rounded-full items-center justify-center shadow-sm">
                <Feather name="shopping-cart" size={20} color="#6baba5" />
              </View>
              {cartItems > 0 && (
                <View className="absolute -top-1 -right-1 w-5 h-5 bg-feedback-error rounded-full items-center justify-center">
                  <Text className="text-neutral-white text-xs font-bold">{cartItems}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-neutral-white rounded-helium border border-neutral-lightGray shadow-sm">
            <View className="flex-row items-center px-4 py-3">
              <Feather name="search" size={20} color="#6baba5" />
              <Text className="text-neutral-textGray ml-3 flex-1">Search products...</Text>
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

        {/* Products */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Checkout Button */}
        {cartItems > 0 && (
          <View className="absolute bottom-20 left-6 right-6">
            <TouchableOpacity>
              <LinearGradient
                colors={['#3b787b', '#033129']}
                className="py-4 rounded-helium items-center shadow-helium-lg"
              >
                <Text className="text-neutral-white text-base font-semibold">
                  Checkout ({cartItems} items)
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ShopScreen;
