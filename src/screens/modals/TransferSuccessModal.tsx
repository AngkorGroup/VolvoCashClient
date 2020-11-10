import React, { useState } from 'react';
import CloseButton from 'components/header/CloseButton';
import Header from 'components/header/Header';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { theme } from 'utils/styles';
import { unit } from 'utils/responsive';
import Button from 'components/button/Button';
import ShareButton from 'components/button/Share';
import InfoRow from 'components/card/InfoRow';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTransfer } from 'utils/redux/ui/transfer-form-screen/transfer-form-screen-reducer';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

const TransferSuccessModal = () => {
  const navigation = useNavigation();
  const transfer = useSelector(selectTransfer);
  const [loading, setLoading] = useState(false);

  const handleSharePress = async (imageUrl: string) => {
    setLoading(true);
    RNFetchBlob.fetch('GET', imageUrl, {
      'Content-Type': 'multipart/form-data',
    })
      .then((res) => {
        setLoading(false);
        const status = res.info().status;
        if (status === 200) {
          Share.open({
            url: `data:image/jpeg;base64,${res.base64()}`,
          }).catch(() => {
            return Alert.alert(
              'Error',
              'Hubo un problema al momento de compartir el comprobante.',
            );
          });
        }
      })
      .catch(() => {
        setLoading(false);
        return Alert.alert(
          'Error',
          'Hubo un problema al momento de compartir el comprobante.',
        );
      });
  };

  const closeModal = () => {
    navigation.goBack();
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Transferencia exitosa'}
        alignment="center"
        rightButton={<CloseButton onClose={closeModal} />}
      />
      {loading && (
        <ActivityIndicator animating={true} color={theme.secondary.color} />
      )}
      {transfer && (
        <View style={styles.card}>
          <InfoRow label="Operación" value={transfer.operationCode || '-'} />
          <InfoRow label="Monto" value={transfer.amount.toString()} />
          <InfoRow label="Concepto" value={transfer.displayName} />
          <View style={styles.shareContainer}>
            <ShareButton onPress={() => handleSharePress(transfer.imageUrl)} />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              title="Aceptar"
              style={styles.button}
              onPress={closeModal}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...theme.background,
  },
  card: {
    ...theme.surface,
    ...theme.shadow,
    marginVertical: unit(30),
    paddingVertical: unit(60),
    paddingHorizontal: unit(40),
    alignItems: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: unit(100),
  },
  button: {
    marginVertical: unit(5),
  },
  shareContainer: {
    marginTop: unit(30),
  },
});

export default TransferSuccessModal;
