import 'react-native-url-polyfill/auto';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
//Toast 
import Toast from 'react-native-toast-message';

// Types
import { RootStackParamList } from './src/types';

// Screens
import SplashScreen from './src/screens/prospect/SplashScreen';
import PhoneOTPScreen from './src/screens/prospect/PhoneOTPScreen';
import NameInputScreen from './src/screens/prospect/NameInputScreen';
import ProductVideosScreen from './src/screens/prospect/ProductVideosScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import ProductDetailScreen from './src/screens/customer/ProductDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="#f6fdfc" />
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            animation: 'slide_from_right'
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="PhoneOTP" component={PhoneOTPScreen} />
          <Stack.Screen name="NameInput" component={NameInputScreen} />
          <Stack.Screen name="ProductVideos" component={ProductVideosScreen} />
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen}
            options={{
              headerShown: true,
              headerTitle: '',
              headerStyle: { backgroundColor: '#f6fdfc' },
              headerTintColor: '#033129'
            }}
          />
        </Stack.Navigator>
         <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
