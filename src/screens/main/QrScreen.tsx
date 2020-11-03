import React from 'react';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import { StyleSheet, ActivityIndicator, View, Dimensions } from 'react-native';
import { theme } from 'utils/styles';
import { selectCard } from 'utils/redux/ui/card-detail-screen/card-detail-screen-reducer';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

const QrScreen = () => {
  const card = useSelector(selectCard);
  const dispatch = useDispatch();

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
        <TouchableOpacity
          activeOpacity={theme.opacity}
          onPress={() => {
            dispatch({
              type: 'MOCK_CHARGE_CALL',
              payload: {
                method: 'post',
                url: '/mock_charge',
                data: {
                  cardToken: card.qrUrl?.split('content=')[1],
                },
              },
            });
          }}>
          <FastImage
            source={{
              uri: card.qrUrl,
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
