import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  action: () => void;
}

const ServicesScreen: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: '1',
      title: 'Installation Service',
      description: 'Professional AC installation by certified technicians',
      icon: 'tool',
      action: () => {
        // Handle installation booking
        console.log('Book installation');
      },
    },
    {
      id: '2',
      title: 'Maintenance & Repair',
      description: 'Regular maintenance and emergency repair services',
      icon: 'settings',
      action: () => {
        // Handle maintenance booking
        console.log('Book maintenance');
      },
    },
    {
      id: '3',
      title: 'Extended Warranty',
      description: 'Extend your product warranty for additional coverage',
      icon: 'shield',
      action: () => {
        // Handle warranty extension
        console.log('Extend warranty');
      },
    },
    {
      id: '4',
      title: 'Energy Audit',
      description: 'Professional energy efficiency assessment',
      icon: 'zap',
      action: () => {
        // Handle energy audit booking
        console.log('Book energy audit');
      },
    },
    {
      id: '5',
      title: 'Smart Home Setup',
      description: 'Configure your AC for smart home integration',
      icon: 'home',
      action: () => {
        // Handle smart home setup
        console.log('Setup smart home');
      },
    },
    {
      id: '6',
      title: '24/7 Support',
      description: 'Round-the-clock technical support and assistance',
      icon: 'headphones',
      action: () => {
        // Handle support contact
        Linking.openURL('tel:+918001234567');
      },
    },
  ];

  return (
    <LinearGradient colors={['#f6fdfc', '#ffffff']} className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mt-6 mb-8">
            <Text className="text-neutral-darkGray text-3xl font-bold mb-2">
              Services
            </Text>
            <Text className="text-neutral-textGray text-base">
              Professional services for your AC units
            </Text>
          </View>

          {/* Service Categories */}
          <View className="mb-6">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">
              Available Services
            </Text>
            
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                onPress={service.action}
                className="bg-neutral-white rounded-helium p-6 mb-4 shadow-sm border border-neutral-lightGray"
              >
                <View className="flex-row items-start">
                  <View className="bg-accent-mint rounded-full p-3 mr-4">
                    <Feather name={service.icon} size={24} color="#033129" />
                  </View>
                  
                  <View className="flex-1">
                    <Text className="text-neutral-darkGray text-lg font-semibold mb-2">
                      {service.title}
                    </Text>
                    <Text className="text-neutral-textGray text-base mb-3">
                      {service.description}
                    </Text>
                    
                    <View className="flex-row items-center">
                      <Text className="text-primary-base font-medium mr-2">
                        Learn More
                      </Text>
                      <Feather name="arrow-right" size={16} color="#3b787b" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Emergency Contact */}
          <View className="bg-red-50 rounded-helium p-6 mb-6 border border-red-200">
            <View className="flex-row items-center mb-4">
              <View className="bg-red-500 rounded-full p-2 mr-3">
                <Feather name="alert-triangle" size={20} color="white" />
              </View>
              <Text className="text-red-800 text-lg font-semibold">
                Emergency Service
              </Text>
            </View>
            
            <Text className="text-red-700 text-base mb-4">
              For urgent AC repairs and emergency situations, contact our 24/7 helpline.
            </Text>
            
            <TouchableOpacity
              onPress={() => Linking.openURL('tel:+911800123456')}
              className="bg-red-500 rounded-helium py-3 px-6 self-start"
            >
              <View className="flex-row items-center">
                <Feather name="phone" size={16} color="white" className="mr-2" />
                <Text className="text-white font-semibold ml-2">
                  Call Emergency Line
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Service Packages */}
          <View className="mb-8">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">
              Service Packages
            </Text>
            
            {/* Basic Package */}
            <View className="bg-neutral-white rounded-helium p-6 mb-4 shadow-sm border border-neutral-lightGray">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-neutral-darkGray text-lg font-semibold">
                  Basic Care
                </Text>
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-700 text-sm font-medium">
                    ₹999/year
                  </Text>
                </View>
              </View>
              
              <Text className="text-neutral-textGray text-base mb-4">
                Essential maintenance and support package
              </Text>
              
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <Feather name="check" size={16} color="#10b981" className="mr-3" />
                  <Text className="text-neutral-darkGray text-sm">
                    Quarterly maintenance visits
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="check" size={16} color="#10b981" className="mr-3" />
                  <Text className="text-neutral-darkGray text-sm">
                    Priority customer support
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="check" size={16} color="#10b981" className="mr-3" />
                  <Text className="text-neutral-darkGray text-sm">
                    Free filter cleaning
                  </Text>
                </View>
              </View>
            </View>

            {/* Premium Package */}
            <View className="bg-gradient-to-r from-primary-base to-primary-dark rounded-helium p-6 mb-4 shadow-lg">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white text-lg font-semibold">
                  Premium Care
                </Text>
                <View className="bg-yellow-400 px-3 py-1 rounded-full">
                  <Text className="text-yellow-800 text-sm font-medium">
                    ₹1,999/year
                  </Text>
                </View>
              </View>
              
              <Text className="text-blue-100 text-base mb-4">
                Comprehensive care with advanced features
              </Text>
              
              <View className="space-y-2">
                <View className="flex-row items-center">
                  <Feather name="check" size={16} color="#10b981" className="mr-3" />
                  <Text className="text-white text-sm">
                    Monthly maintenance visits
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="check" size={16} color="#10b981" className="mr-3" />
                  <Text className="text-white text-sm">
                    24/7 emergency support
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="check" size={16} color="#10b981" className="mr-3" />
                  <Text className="text-white text-sm">
                    Free parts replacement
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="check" size={16} color="#10b981" className="mr-3" />
                  <Text className="text-white text-sm">
                    Energy efficiency optimization
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ServicesScreen;
