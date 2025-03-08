import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  OnboardingScreen: undefined;
  OnboardingOne: undefined;
};

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'OnboardingScreen'
>;

const OnboardingScreen: React.FC = () => {
  const {width, height} = useWindowDimensions(); // Get screen width & height
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      {/* <StatusBar backgroundColor="transparent" translucent barStyle="light-content" /> */}
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {/* Background Wavy Animation */}
      <LottieView
        source={require('../../assets/animation/Wave - 1741253085043.json')}
        autoPlay
        loop
        style={[styles.backgroundAnimation, {width, height}]}
      />

      {/* Onboarding Content */}
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/firstImg.png')}
          style={[
            styles.image,
            {width: width * 0.9, height: undefined, aspectRatio: 0.8},
          ]}
          resizeMode="contain"
        />

        <Text style={styles.title}>Fast and simple form filling.</Text>
        <Text style={styles.subtitle}>
          Create and share forms easily, get instant alerts, and manage data
          effortlessly with Ace Forms!
        </Text>

        <TouchableOpacity
          style={[styles.continueButton, {width: width * 0.85}]}
          onPress={() => navigation.navigate('OnboardingOne')}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.signInButton, {width: width * 0.85}]}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  backgroundAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#0057FF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0057FF',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginBottom: 20,
  },
  continueText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  signInButton: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0057FF',
    backgroundColor: 'transparent',
  },
  signInText: {
    color: '#0057FF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
