import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/* Screens */
import HomeScreen from '../screens/Home/HomeScreen';
import InsightsScreen from '../screens/Home/InsightsScreen';
import TransactionsScreen from '../screens/Home/TransactionsScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/SignUp';
import OnboardOne from '../screens/Auth/OnboardOne';
import OnboardTwo from '../screens/Auth/OnboardTwo';
import AddExpense from '../screens/Home/AddExpense';

/* Initialize Navigators */
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* Bottom Tabs */
const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false, // ✅ Hides labels
      tabBarStyle: styles.tabBar,
      tabBarIconStyle: styles.iconStyle, // Ensures proper icon alignment
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon
            name="home-outline"
            size={28}
            color={focused ? '#00D09E' : '#A0A0A0'}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Insights"
      component={InsightsScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon
            name="chart-line-variant"
            size={28}
            color={focused ? '#00D09E' : '#A0A0A0'}
          />
        ),
      }}
    />
    <Tab.Screen
      name="AddExpense"
      component={AddExpense}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon name="plus" size={28} color={focused ? '#00D09E' : '#A0A0A0'} />
        ),
      }}
    />
    <Tab.Screen
      name="Transactions"
      component={TransactionsScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon
            name="swap-horizontal"
            size={28}
            color={focused ? '#00D09E' : '#A0A0A0'}
          />
        ),
      }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({focused}) => (
          <Icon
            name="account-outline"
            size={28}
            color={focused ? '#00D09E' : '#A0A0A0'}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

/* Main Stack Navigator */
const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OnboardingOne" component={OnboardOne} />
        <Stack.Screen name="OnboardingTwo" component={OnboardTwo} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HomeTabs" component={BottomTabs} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

/* Styles */
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#DFF7E2', // Clean white background
    height: 70, // Ensures enough space for icons
    paddingTop: 12, // Equal padding on top
    paddingBottom: 12, // Equal padding on bottom
    borderTopWidth: 0, // Removes default top border shadow
    elevation: 10, // Adds subtle shadow effect
    borderTopLeftRadius: 20, // Adds curved top-left corner
    borderTopRightRadius: 20, // Adds curved top-right corner
    position: 'absolute', // Ensures proper placement
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden', // Ensures rounded corners apply correctly
  },
  iconStyle: {
    alignSelf: 'center', // Ensures proper icon alignment
  },
});

export default AppNavigator;
