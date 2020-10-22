import React from 'react';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import { StyleSheet, ActivityIndicator, View, Dimensions } from 'react-native';
import { theme } from 'utils/styles';
import { selectCard } from 'utils/redux/ui/card-detail-screen/card-detail-screen-reducer';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as routes from 'utils/routes';

const QrScreen = () => {
  const card = useSelector(selectCard);
  const navigation = useNavigation();

  if (!card) {
    return <ActivityIndicator animating={true} />;
  }

  return (
    <View style={styles.container}>
      <Header
        title={`Código QR - ${card.cardType.displayName}`}
        alignment="left"
        leftButton={<BackButton />}
      />
      <View style={styles.content}>
        <TouchableOpacity
          activeOpacity={theme.opacity}
          onPress={() => {
            navigation.navigate(routes.CONFIRMATION_MODAL);
          }}>
          <FastImage
            source={{
              uri:
                'https://borealtech.com/wp-content/uploads/2018/10/codigo-qr-1024x1024.jpg',
            }}
            style={styles.qr}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...theme.background,
  },
  qr: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QrScreen;
