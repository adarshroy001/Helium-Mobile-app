import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const PhoneOTPScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const otpRefs = useRef([]);

  const handleSendOTP = () => {
    if (phoneNumber.length < 10) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Phone Number',
        text2: 'Please enter a valid phone number',
        position: 'bottom',
      });
      return;
    }
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
    }, 1000);
  };

  const handleOTPChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter complete OTP',
        position: 'bottom',
      });
      return;
    }
    navigation.navigate('NameInput');
  };

  return (
    <LinearGradient colors={['#f6fdfc', '#ffffff']} className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mt-8 mb-12">

            <Text className="text-neutral-darkGray text-3xl font-bold mb-2">
              {otpSent ? 'Verify OTP' : 'Enter Phone Number'}
            </Text>
            <Text className="text-neutral-textGray text-base">
              {otpSent
                ? `We've sent a 6-digit code to ${countryCode} ${phoneNumber}`
                : 'We\'ll send you a verification code'
              }
            </Text>
          </View>

          {!otpSent ? (
            // Phone Number Input
            <View>
              <View className="mb-6">
                <Text className="text-neutral-textGray text-sm font-medium mb-2">Phone Number</Text>
                <View className="flex-row bg-neutral-white rounded-helium border border-neutral-lightGray shadow-sm">
                  {/* Country Code Selector */}
                  <TouchableOpacity className="flex-row items-center px-4 py-4 border-r border-neutral-lightGray">
                    <Text className="text-2xl mr-2">🇮🇳</Text>
                    <Text className="text-neutral-darkGray font-medium mr-1">{countryCode}</Text>
                    <Feather name="chevron-down" size={16} color="#6baba5" />
                  </TouchableOpacity>

                  {/* Phone Input */}
                  <TextInput
                    className="flex-1 px-4 py-4 text-neutral-darkGray text-base"
                    placeholder="Enter phone number"
                    placeholderTextColor="#4a5754"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
              </View>

              {/* Send OTP Button */}
              <TouchableOpacity
                onPress={handleSendOTP}
                disabled={isLoading}
                className="mb-4"
              >
                <LinearGradient
                  colors={['#3b787b', '#033129']}
                  className="py-4 rounded-helium items-center shadow-helium"
                >
                  <Text className="text-neutral-white text-base font-semibold">
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            // OTP Input
            <View>
              <View className="mb-8">
                <Text className="text-neutral-textGray text-sm font-medium mb-4">Enter OTP</Text>
                <View className="flex-row justify-between">
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={ref => otpRefs.current[index] = ref}
                      className="w-12 h-12 bg-neutral-white rounded-helium border-2 border-neutral-lightGray text-center text-xl font-bold text-neutral-darkGray"
                      value={digit}
                      onChangeText={(value) => handleOTPChange(value, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      style={{
                        borderColor: digit ? '#3b787b' : '#e2e8e6'
                      }}
                    />
                  ))}
                </View>
              </View>

              {/* Verify Button */}
              <TouchableOpacity onPress={handleVerifyOTP} className="mb-4">
                <LinearGradient
                  colors={['#3b787b', '#033129']}
                  className="py-4 rounded-helium items-center shadow-helium"
                >
                  <Text className="text-neutral-white text-base font-semibold">Verify OTP</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Resend OTP */}
              <View className="items-center">
                <Text className="text-neutral-textGray text-sm mb-2">Didn't receive code?</Text>
                <TouchableOpacity onPress={handleSendOTP}>
                  <Text className="text-primary-base font-semibold">Resend OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
        <Toast />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PhoneOTPScreen;