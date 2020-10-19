import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from 'utils/styles';

const PaymentsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeContainer}>
      <Header
        title={'Pagos pendientes'}
        alignment="center"
        rightButton={<ExitButton />}
      />
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
