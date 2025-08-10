import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

type NameInputScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'NameInput'>;

interface Props {
  navigation: NameInputScreenNavigationProp;
}

const NameInputScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>('');

  const handleContinue = (): void => {
    if (name.trim().length < 2) {
      return;
    }
    navigation.navigate('ProductVideos');
  };

  return (
    <LinearGradient colors={['#f6fdfc', '#ffffff']} className="flex-1">
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 px-6"
        >
          {/* Header */}
          <View className="mt-8 mb-16">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="w-10 h-10 rounded-full bg-neutral-white items-center justify-center mb-8 shadow-sm"
            >
              <Feather name="arrow-left" size={20} color="#033129" />
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View className="flex-1 justify-center">
            <View className="mb-12">
              <Text className="text-neutral-darkGray text-4xl font-bold mb-4 leading-tight">
                What's your{'\n'}name?
              </Text>
              <Text className="text-neutral-textGray text-lg">
                We'd love to personalize your experience
              </Text>
            </View>

            {/* Name Input */}
            <View className="mb-8">
              <TextInput
                className="bg-neutral-white px-6 py-5 rounded-helium text-xl text-neutral-darkGray border border-neutral-lightGray shadow-sm"
                placeholder="Enter your full name"
                placeholderTextColor="#4a5754"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoFocus
                style={{
                  borderColor: name.length > 1 ? '#3b787b' : '#e2e8e6',
                  borderWidth: name.length > 1 ? 2 : 1
                }}
              />
            </View>

            {/* Continue Button */}
            <TouchableOpacity 
              onPress={handleContinue}
              disabled={name.trim().length < 2}
              className="mb-6"
            >
              <LinearGradient
                colors={name.trim().length >= 2 ? ['#3b787b', '#033129'] : ['#e2e8e6', '#e2e8e6']}
                className="py-5 rounded-helium items-center shadow-helium"
              >
                <Text className={`text-base font-semibold ${name.trim().length >= 2 ? 'text-neutral-white' : 'text-neutral-textGray'}`}>
                  Continue
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Bottom Illustration Placeholder */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-accent-mint rounded-full items-center justify-center">
              <Feather name="user" size={40} color="#6baba5" />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default NameInputScreen;
