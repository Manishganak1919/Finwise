import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

type RootStackParamList = {
  OnboardingTwo: undefined;
  Emailverify: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, 'OnboardingTwo'>;

const OnboardTwo: React.FC = () => {
  const {width, height} = useWindowDimensions();
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      {/* Green Background */}

      {/* Heading Section */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingTitle}>Ready to take</Text>
        <Text style={styles.headingSubtitle}>control of your finances?</Text>
      </View>

      {/* White Background Overlapping Green */}
      <View style={styles.whiteBackground}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/onboard-two.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Emailverify')}>
            <Text style={[styles.buttonText, {fontSize: width * 0.045}]}>
              Next
            </Text>
          </TouchableOpacity>

          {/* Pagination Dots */}
          <View style={styles.paginationContainer}>
            <View style={[styles.dot]} />
            <View style={[styles.dot, styles.activeDot]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  headingContainer: {
    alignItems: 'center',
    marginTop: 100, // Adjust space from the top
    marginBottom: 20, // Space between heading & white container
  },
  headingTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0E3E3E',
  },
  headingSubtitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0E3E3E',
  },
  whiteBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '67%',
    backgroundColor: '#F5FFF9',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '50%',
    aspectRatio: 1,
    backgroundColor: '#EAF8F0',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
  },
  button: {
    backgroundColor: '#00D09E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#00C08B',
  },
});

export default OnboardTwo;
