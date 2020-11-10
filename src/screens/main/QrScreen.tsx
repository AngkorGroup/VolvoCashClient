import React from 'react';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import { StyleSheet, ActivityIndicator, View, Dimensions } from 'react-native';
import { theme } from 'utils/styles';
import { selectCard } from 'utils/redux/ui/card-detail-screen/card-detail-screen-reducer';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

const QrScreen = () => {
  const card = useSelector(selectCard);

  if (!card) {
    return <ActivityIndicator animating={true} />;
  }

  return (
    <View style={styles.container}>
      <Header
        title={`Código QR - ${card.cardType?.displayName}`}
        alignment="left"
        leftButton={<BackButton />}
      />
      <View style={styles.content}>
        <FastImage
          source={{
            uri: card.qrUrl,
          }}
          style={styles.qr}
          resizeMode={FastImage.resizeMode.contain}
        />
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
