// screens/HomeScreen/components/WaitlistSection/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      setEmail('');
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="relative py-28 px-6 min-h-[400px]">
      <Image
        source={{ uri: 'https://res.cloudinary.com/dqhk6dblu/image/upload/v1752037893/b-bg1_lkiwk0.jpg' }}
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
        resizeMode="cover"
      />
      
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50" />
      
      <View className="flex-1 justify-center items-center z-10">
        <Text className="text-[28px] font-bold text-white text-center mb-6 leading-9">
          Be The First To Experience <Text className="text-[#f5b841] border-b-2 border-[#f5b841]">Helium</Text>
        </Text>
        
        <Text className="text-base text-[#e4e8e2] text-center mb-12 leading-6">
          Join our waitlist for early access and exclusive launch discounts.
        </Text>
        
        <View className="w-full max-w-[320px] mb-8">
          <View className="flex-col gap-3">
            <TextInput
              className="h-12 bg-white rounded-3xl px-4 text-base text-[#033129] border-2 border-transparent"
              placeholder="Enter your email"
              placeholderTextColor="#666666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isSubmitting}
            />
            
            <TouchableOpacity
              className={`h-12 bg-[#f5b841] rounded-3xl flex-row items-center justify-center px-8 ${
                isSubmitting ? 'opacity-70' : 'opacity-100'
              }`}
              onPress={handleSubmit}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <Text className="text-base font-semibold text-white">Joining...</Text>
              ) : (
                <>
                  <Text className="text-base font-semibold text-white">Join</Text>
                  <Feather name="arrow-right" size={16} color="#ffffff" style={{ marginLeft: 8 }} />
                </>
              )}
            </TouchableOpacity>
          </View>
          
          {isSuccess && (
            <View className="flex-row items-center justify-center bg-green-500/20 rounded-full py-2 px-4 mt-4">
              <Feather name="check-circle" size={16} color="#10b981" />
              <Text className="text-sm text-green-400 ml-2">You're on the list!</Text>
            </View>
          )}
        </View>
        
        <Text className="text-sm text-[#e4e8e2]/70 text-center leading-5">
          We respect your privacy. Unsubscribe at any time.
        </Text>
      </View>
    </View>
  );
};

export default WaitlistSection;
