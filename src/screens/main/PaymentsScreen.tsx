import ListItem from 'components/payments/ListItem';
import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from 'utils/styles';
import charges from 'mocks/charge-list';
import { FlatList } from 'react-native-gesture-handler';

const PaymentsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeContainer}>
      <Header
        title={'Pagos pendientes'}
        alignment="center"
        rightButton={<ExitButton />}
      />
      <FlatList
        style-={styles.list}
        data={charges}
        keyExtractor={(charge) => charge.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: charge }) => <ListItem charge={charge} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    ...theme.background,
  },
  list: {
    flex: 1,
  },
  divider: {
    height: 1.5,
    width: '100%',
    ...theme.disabledSurface,
  },
});

export default PaymentsScreen;
