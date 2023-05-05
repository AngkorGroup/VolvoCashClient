import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import FastImage from 'react-native-fast-image';
import Button from 'components/button/Button';
import { unit } from 'utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../utils/styles';

interface UpdateVersionScreenProps {
  storeUrl: string;
}

const UpdateVersionScreen: React.FC<UpdateVersionScreenProps> = ({
  storeUrl,
}) => {
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
          <View style={styles.bottomContainer}>
            <Text style={styles.text}>
              Necesitas la última versión para utilizar Volvo Cash
            </Text>
            <Button
              title="Actualizar"
              onPress={() => {
                Linking.openURL(storeUrl);
              }}
            />
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
  text: {
    padding: unit(30),
    textAlign: 'center',
    ...theme.primaryOverDark,
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UpdateVersionScreen;
