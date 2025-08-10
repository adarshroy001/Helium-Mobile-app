import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
//Toast 
import Toast from 'react-native-toast-message';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import PhoneOTPScreen from './src/screens/PhoneOTPScreen';
import NameInputScreen from './src/screens/NameInputScreen';
import ProductVideosScreen from './src/screens/ProductVideosScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
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