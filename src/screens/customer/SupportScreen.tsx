import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { FAQ, SocialLink } from '../../types';

const SupportScreen: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I schedule installation?',
      answer: 'Installation can be scheduled directly through the app after purchase. Our certified technicians will contact you within 24 hours to arrange a convenient time.'
    },
    {
      id: 2,
      question: 'What is covered under warranty?',
      answer: 'All Helium ACs come with a comprehensive 5-year warranty covering manufacturing defects, compressor, and parts. Installation warranty is included for 2 years.'
    },
    {
      id: 3,
      question: 'Can I control my AC remotely?',
      answer: 'Yes! All Helium AC models support Wi-Fi connectivity. You can control temperature, schedule operations, and monitor energy usage through the app.'
    },
    {
      id: 4,
      question: 'How often should I clean the filter?',
      answer: 'For optimal performance, clean your filter every 2-3 weeks. The app will send you reminders and show you how to do it properly.'
    },
    {
      id: 5,
      question: 'What if I need repairs?',
      answer: 'Contact our 24/7 support through the app. We have certified service centers across the country and offer doorstep service within 48 hours.'
    }
  ];

  const socialLinks: SocialLink[] = [
    { icon: 'phone', label: 'Call Support', action: () => Linking.openURL('tel:1-800-HELIUM') },
    { icon: 'mail', label: 'Email Us', action: () => Linking.openURL('mailto:support@helium.com') },
    { icon: 'message-circle', label: 'Live Chat', action: () => {} },
    { icon: 'globe', label: 'Website', action: () => Linking.openURL('https://helium.com') }
  ];

  const handleFAQPress = (id: number): void => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <LinearGradient colors={['#f6fdfc', '#ffffff']} className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="px-6 pt-4 pb-6">
            <Text className="text-neutral-darkGray text-2xl font-bold mb-2">Support Center</Text>
            <Text className="text-neutral-textGray text-base">We're here to help you 24/7</Text>
          </View>

          {/* Quick Actions */}
          <View className="px-6 mb-8">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">Quick Actions</Text>
            <View className="flex-row flex-wrap">
              {socialLinks.map((link, index) => (
                <TouchableOpacity 
                  key={index}
                  onPress={link.action}
                  className="w-1/2 mb-3 pr-2"
                >
                  <View className="bg-neutral-white rounded-helium p-4 border border-neutral-lightGray shadow-sm">
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 bg-accent-mint rounded-full items-center justify-center mr-3">
                        <Feather name={link.icon as keyof typeof Feather.glyphMap} size={18} color="#033129" />
                      </View>
                      <Text className="text-neutral-darkGray font-medium flex-1">{link.label}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* FAQs */}
          <View className="px-6 mb-6">
            <Text className="text-neutral-darkGray text-lg font-semibold mb-4">Frequently Asked Questions</Text>
            
            <View className="bg-neutral-white rounded-helium-lg border border-neutral-lightGray shadow-helium overflow-hidden">
              {faqs.map((faq, index) => (
                <View key={faq.id}>
                  <TouchableOpacity 
                    onPress={() => handleFAQPress(faq.id)}
                    className="p-4 flex-row items-center justify-between"
                  >
                    <Text className="text-neutral-darkGray font-medium flex-1 mr-3">
                      {faq.question}
                    </Text>
                    <Feather 
                      name={expandedFAQ === faq.id ? "chevron-up" : "chevron-down"} 
                      size={20} 
                      color="#6baba5" 
                    />
                  </TouchableOpacity>
                  
                  {expandedFAQ === faq.id && (
                    <View className="px-4 pb-4 border-t border-neutral-lightGray">
                      <Text className="text-neutral-textGray leading-relaxed mt-2">
                        {faq.answer}
                      </Text>
                    </View>
                  )}
                  
                  {index < faqs.length - 1 && (
                    <View className="border-t border-neutral-lightGray" />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Contact Us */}
          <View className="px-6 mb-8">
            <TouchableOpacity>
              <LinearGradient
                colors={['#3b787b', '#033129']}
                className="py-4 rounded-helium items-center shadow-helium"
              >
                <View className="flex-row items-center">
                  <Feather name="headphones" size={20} color="#ffffff" />
                  <Text className="text-neutral-white text-base font-semibold ml-2">Contact Support</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* App Info */}
          <View className="px-6 pb-6">
            <View className="bg-accent-mint rounded-helium p-4">
              <Text className="text-primary-deep text-center font-medium">
                Helium App v1.0.0
              </Text>
              <Text className="text-neutral-textGray text-center text-sm mt-1">
                Pure Air. Pure Comfort.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SupportScreen;
