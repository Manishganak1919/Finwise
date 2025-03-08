import React, {useState, useEffect, useMemo} from 'react';
import {StyleSheet, View, useWindowDimensions, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const [loading, setLoading] = useState(true);
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const backgroundAnimation = useMemo(
    () => require('./src/assets/animation/Animation - 1741203441946.json'),
    [],
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {/* Status Bar */}
        {/* <StatusBar
          backgroundColor="transparent"
          translucent
          barStyle="light-content"
        /> */}
         <StatusBar
          backgroundColor="#ffffff"
          barStyle="dark-content"
        />
        <LottieView
          source={backgroundAnimation}
          autoPlay
          loop
          style={{
            width: width * 0.7,
            height: height * 0.4,
          }}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});
