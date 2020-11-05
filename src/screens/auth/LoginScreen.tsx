import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from 'components/button/Button';
import { unit } from 'utils/responsive';
import { useNavigation } from '@react-navigation/native';
import * as routes from 'utils/routes';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <FastImage
      source={require('assets/images/client-bg.png')}
      style={styles.bg}>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <View>
            <FastImage
              source={require('assets/images/volvo-cash-logo.png')}
              style={styles.volvoCashLogo}
            />
          </View>
          <View>
            <Button
              title="Ingresar"
              onPress={() => {
                navigation.navigate(routes.PHONE_SCREEN);
              }}
            />
            <Text style={styles.text}>v 1.0.1</Text>
          </View>
        </View>
      </SafeAreaView>
    </FastImage>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    marginBottom: unit(40),
    marginTop: unit(10),
  },
  volvoLogo: {
    width: unit(106),
    height: unit(35),
    resizeMode: 'contain',
  },
  volvoCashLogo: {
    width: unit(106),
    height: unit(106),
    resizeMode: 'contain',
    marginVertical: unit(20),
  },
  text:{
    paddingTop: unit(15),
    textAlign:"center",
    color:"#fff"
  }
});

export default LoginScreen;
