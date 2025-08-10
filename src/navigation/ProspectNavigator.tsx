import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Types
import { RootStackParamList } from '../types';

// Prospect Screens
import SplashScreen from '../screens/prospect/SplashScreen';
import PhoneOTPScreen from '../screens/prospect/PhoneOTPScreen';
import NameInputScreen from '../screens/prospect/NameInputScreen';
import ProductVideosScreen from '../screens/prospect/ProductVideosScreen';

const ProspectStack = createNativeStackNavigator<RootStackParamList>();

const ProspectNavigator: React.FC = () => {
  return (
    <ProspectStack.Navigator 
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right'
      }}
    >
      <ProspectStack.Screen name="Splash" component={SplashScreen} />
      <ProspectStack.Screen name="PhoneOTP" component={PhoneOTPScreen} />
      <ProspectStack.Screen name="NameInput" component={NameInputScreen} />
      <ProspectStack.Screen name="ProductVideos" component={ProductVideosScreen} />
    </ProspectStack.Navigator>
  );
};

export default ProspectNavigator;
