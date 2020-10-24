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

const SuccessModal = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        title={'Cobro exitoso'}
        alignment="center"
        rightButton={<CloseButton />}
      />
      <View style={styles.card}>
        <InfoRow label="Operación" value="001-12398273-5" />
        <InfoRow label="Monto" value="S/ 1,200.00" />
        <InfoRow label="Concepto" value="Lubricante HD-5000" />
        <InfoRow label="Vendedor" value="Luis Ramos" />
        <View style={styles.shareContainer}>
          <Share onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.buttonsContainer}>
          <Button title="Confirmar" style={styles.button} />
        </View>
      </View>
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
