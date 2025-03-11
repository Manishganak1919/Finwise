import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
/* Screens */
import HomeScreen from '../screens/Home/HomeScreen';
import NotificationScreen from '../screens/Home/NotificationScreen';
import SettingsScreen from '../screens/Home/SettingsScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import MobileNumberScreen from '../screens/Auth/MobileNumberScreen';
import OtpVerificationScreen from '../screens/Auth/OtpVerificationScreen';
import OnboardOne from '../screens/Auth/OnboardOne'; // Fixed import (case-sensitive)
import OnboardTwo from '../screens/Auth/OnboardTwo';
import Signup from '../screens/Auth/SignUp';
import SignIn from '../screens/Auth/SignIn';
import ForgetPassword from '../screens/Auth/ForgetPassword';
import SecurityPin from '../screens/Auth/SecurityPin';
import SuccessfulVerify from '../screens/Auth/Successfullverify';
import EmailVerify from '../screens/Auth/Emailverify';
import MobileVerify from '../screens/Auth/Mobileverify';

/* Initialize Navigators */
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* Bottom Tabs Navigator */
const BottomTabs = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Notification" component={NotificationScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

/* Main Stack Navigator */
const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="OnboardingMain" component={OnboardingScreen} />
        <Stack.Screen name="OnboardingOne" component={OnboardOne} />
        <Stack.Screen name="OnboardingTwo" component={OnboardTwo} />
        <Stack.Screen name="Emailverify" component={EmailVerify} />
        <Stack.Screen name="Mobileverify" component={MobileVerify} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="forgetpassword" component={ForgetPassword} />
        <Stack.Screen name="securitypin" component={SecurityPin} />
        <Stack.Screen name="successfulverify" component={SuccessfulVerify} />
        <Stack.Screen name="MobileNumber" component={MobileNumberScreen} />
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerificationScreen}
        />
        <Stack.Screen name="HomeTabs" component={BottomTabs} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
