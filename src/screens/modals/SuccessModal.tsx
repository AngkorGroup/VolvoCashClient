import React, { useState } from 'react';
import CloseButton from 'components/header/CloseButton';
import Header from 'components/header/Header';
import { StyleSheet, View, Alert } from 'react-native';
import { theme } from 'utils/styles';
import { unit } from 'utils/responsive';
import Button from 'components/button/Button';
import ShareButton from 'components/button/Share';
import InfoRow from 'components/card/InfoRow';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { selectCharge } from 'utils/redux/ui/confirmation-modal/confirmation-modal-reducer';
import { navigate } from 'utils/navigation';

const SuccessModal = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const charge = useSelector(selectCharge);

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

  return (
    <View style={styles.container}>
      <Header
        title={'Cobro exitoso'}
        alignment="center"
        rightButton={<CloseButton />}
      />
      {charge && (
        <View style={styles.card}>
          <InfoRow label="Operación" value={charge.operationCode || '-'} />
          <InfoRow label="Monto" value={charge.amount.toString()} />
          <InfoRow label="Concepto" value={charge.description} />
          <InfoRow label="Vendedor" value={charge.cashier?.fullName || ''} />
          <View style={styles.shareContainer}>
            <ShareButton onPress={() => handleSharePress(charge.imageUrl)} />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              title="Aceptar"
              style={styles.button}
              onPress={() => {
                navigation.goBack();
              }}
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

export default SuccessModal;
