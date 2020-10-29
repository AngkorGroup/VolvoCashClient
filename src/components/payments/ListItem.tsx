import Button from 'components/button/Button';
import Spacing from 'components/layout/Spacing';
import { Charge } from 'models/Charge';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatDate } from 'utils/moment';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface ListItemProps {
  charge: Charge;
}

const ListItem: React.FC<ListItemProps> = ({ charge }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{charge.displayName}</Text>
        </View>
        <View style={styles.moneyContainer}>
          <Text style={styles.money}>{charge.money}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{formatDate(charge.date)}</Text>
          <Text style={styles.subtitle}>{charge.cashier.fullName}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button title="Confirmar" small />
          <Spacing size={10} />
          <Button title="Rechazar" small danger />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.surface,
    padding: unit(5),
  },
  topContainer: {
    flexDirection: 'row',
  },
  bottomContainer: {
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  subtitleContainer: {},
  moneyContainer: {},
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  title: {
    ...theme.small,
    ...theme.primary,
    marginBottom: unit(5),
  },
  subtitle: {
    ...theme.small,
    ...theme.secondary,
    marginBottom: unit(5),
  },
  money: {
    ...theme.primary,
    ...theme.mediumLight,
  },
});

export default ListItem;
