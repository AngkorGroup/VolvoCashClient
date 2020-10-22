import React from 'react';
import CloseButton from 'components/header/CloseButton';
import Header from 'components/header/Header';
import { StyleSheet, View } from 'react-native';
import { theme } from 'utils/styles';
import { unit } from 'utils/responsive';
import Button from 'components/button/Button';
import InfoRow from 'components/card/InfoRow';
import { useNavigation } from '@react-navigation/native';
import * as routes from 'utils/routes';

const ConfirmationModal = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        title={'Confirmar cobro'}
        alignment="center"
        rightButton={<CloseButton />}
      />
      <View style={styles.card}>
        <InfoRow label="Monto" value="S/ 1,200.00" />
        <InfoRow label="Concepto" value="Lubricante HD-5000" />
        <InfoRow label="Vendedor" value="Luis Ramos" />
        <View style={styles.buttonsContainer}>
          <Button
            title="Rechazar"
            danger
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Button
            title="Confirmar"
            style={styles.button}
            onPress={() => navigation.navigate(routes.SUCCESS_MODAL)}
          />
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
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: unit(100),
  },
  button: {
    marginVertical: unit(5),
  },
});

export default ConfirmationModal;
