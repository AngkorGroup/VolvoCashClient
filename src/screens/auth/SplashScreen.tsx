import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const SplashScreen = () => {
  return (
    <FastImage
      source={require('assets/images/client-bg.png')}
      style={styles.bg}
    />
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
});

export default SplashScreen;
