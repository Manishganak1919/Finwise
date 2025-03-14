import React from 'react';
import {View, StyleSheet} from 'react-native';

const InsightsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Heading Section */}

      {/* White Background Section */}
      <View style={styles.whiteBackground}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E', // Green background
  },
  whiteBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '67%',
    backgroundColor: '#F5FFF9', // White background
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default InsightsScreen;
