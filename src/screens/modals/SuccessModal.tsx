import React from 'react';
import CloseButton from 'components/header/CloseButton';
import Header from 'components/header/Header';
import { StyleSheet, View } from 'react-native';
import { theme } from 'utils/styles';
import { unit } from 'utils/responsive';
import Button from 'components/button/Button';
import Share from 'components/button/Share';
import InfoRow from 'components/card/InfoRow';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCharge } from 'utils/redux/ui/confirmation-modal/confirmation-modal-reducer';

const SuccessModal = () => {
  const navigation = useNavigation();
  const charge = useSelector(selectCharge);
  console.log('charge2: ', charge);

  const handleSharePress = () => {
    //FIXME: this should open OS share thing
    navigation.goBack();
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
            <Share onPress={handleSharePress} />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              title="Aceptar"
              style={styles.button}
              onPress={() => {
                //FIXME: this should open OS share thing
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
