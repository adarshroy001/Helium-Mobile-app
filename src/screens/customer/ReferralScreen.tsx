import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Benefit } from '../../types';

const ReferralScreen: React.FC = () => {
  const [referralCode] = useState<string>('HELIUM2024');
  const [referralsCount] = useState<number>(12);
  const [earnedAmount] = useState<number>(480);

  const handleShare = async (): Promise<void> => {
    try {
      await Share.share({
        message: `Get $50 off your first Helium AC purchase! Use my referral code: ${referralCode}\n\nDownload the Helium app: https://helium.app/`,
        title: 'Get $50 off Helium AC'
      });
    } catch (error) {
      console.log(error);
    }
  };

  const benefits: Benefit[] = [
    { icon: 'dollar-sign', title: '$50 for you', subtitle: 'When someone uses your code' },
    { icon: 'gift', title: '$50 for them', subtitle: 'Discount on their first purchase' },
    { icon: 'users', title: 'No limits', subtitle: 'Refer as many friends as you want' },
    { icon: 'zap', title: 'Instant rewards', subtitle: 'Credits added immediately' }
  ];

  return (
    <LinearGradient colors={['#033129', '#3b787b']} className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="px-6 pt-8 pb-6">
            <Text className="text-neutral-white text-2xl font-bold mb-2">Refer Friends</Text>
            <Text className="text-primary-light text-base">Share the Helium experience and earn together</Text>
          </View>

          {/* Stats Cards */}
          <View className="px-6 mb-8">
            <View className="flex-row">
              <View className="flex-1 bg-neutral-white rounded-helium p-4 mr-2 shadow-helium">
                <Text className="text-neutral-textGray text-sm mb-1">Total Referrals</Text>
                <Text className="text-primary-deep text-2xl font-bold">{referralsCount}</Text>
              </View>
              <View className="flex-1 bg-neutral-white rounded-helium p-4 ml-2 shadow-helium">
                <Text className="text-neutral-textGray text-sm mb-1">Earned</Text>
                <Text className="text-feedback-success text-2xl font-bold">${earnedAmount}</Text>
              </View>
            </View>
          </View>

          {/* Referral Code */}
          <View className="px-6 mb-8">
            <View className="bg-neutral-white rounded-helium-lg p-6 shadow-helium-lg">
              <Text className="text-neutral-textGray text-sm font-medium mb-2">Your Referral Code</Text>
              
              <View className="bg-accent-mint p-4 rounded-helium mb-4">
                <Text 
                  className="text-primary-deep text-center font-bold text-2xl tracking-widest"
                  style={{ letterSpacing: 4 }}
                >
                  {referralCode}
                </Text>
              </View>

              <TouchableOpacity onPress={handleShare}>
                <LinearGradient
                  colors={['#3b787b', '#033129']}
                  className="py-4 rounded-helium items-center shadow-helium"
                >
                  <View className="flex-row items-center">
                    <Feather name="share-2" size={20} color="#ffffff" />
                    <Text className="text-neutral-white text-base font-semibold ml-2">Share Code</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* How it Works */}
          <View className="px-6 mb-8">
            <Text className="text-neutral-white text-xl font-bold mb-4">How it Works</Text>
            
            <View className="bg-neutral-white rounded-helium-lg p-6 shadow-helium-lg">
              {benefits.map((benefit, index) => (
                <View key={index} className="flex-row items-center mb-4">
                  <View className="w-12 h-12 bg-primary-light rounded-full items-center justify-center mr-4">
                    <Feather name={benefit.icon as keyof typeof Feather.glyphMap} size={20} color="#033129" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-darkGray text-base font-semibold">{benefit.title}</Text>
                    <Text className="text-neutral-textGray text-sm">{benefit.subtitle}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Terms */}
          <View className="px-6 mb-6">
            <Text className="text-primary-light text-sm leading-relaxed">
              Terms apply: Referral rewards are credited after successful purchase completion. 
              New customers only. Maximum discount $50 per referral.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ReferralScreen;
