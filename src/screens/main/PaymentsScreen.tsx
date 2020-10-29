import ListItem from 'components/payments/ListItem';
import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from 'utils/styles';
import charge from 'mocks/charge-detail';

const PaymentsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeContainer}>
      <Header
        title={'Pagos pendientes'}
        alignment="center"
        rightButton={<ExitButton />}
      />
      <ListItem charge={charge} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    ...theme.background,
  },
});

export default PaymentsScreen;
