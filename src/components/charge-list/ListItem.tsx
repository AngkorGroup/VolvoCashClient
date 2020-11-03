import { useNavigation } from '@react-navigation/native';
import Alert from 'components/alert/Alert';
import Button from 'components/button/Button';
import Spacing from 'components/layout/Spacing';
import { Charge } from 'models/Charge';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatDate } from 'utils/moment';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import * as routes from 'utils/routes';
import { useDispatch } from 'react-redux';
import { confirmChargeSaga } from 'utils/redux/services/charge-detail-actions';

interface ListItemProps {
  charge: Charge;
}

type Option = 'confirmar' | 'rechazar' | '';

const ListItem: React.FC<ListItemProps> = ({ charge }) => {
  const [option, setOption] = useState<Option>('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleCancel = () => {
    setOption('');
  };

  const handleConfirm = () => {
    setOption('');
    const confirmed = option === 'confirmar';
    dispatch(confirmChargeSaga(charge.id, confirmed));
    if (confirmed) {
      navigation.navigate(routes.SUCCESS_MODAL);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{charge.displayName}</Text>
        </View>
        <View style={styles.moneyContainer}>
          <Text style={styles.money}>{charge.amount.toString()}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{formatDate(charge.createdAt)}</Text>
          <Text style={styles.subtitle}>{charge.cashier?.fullName}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Confirmar"
            small
            onPress={() => setOption('confirmar')}
          />
          <Spacing size={10} />
          <Button
            title="Rechazar"
            small
            danger
            onPress={() => setOption('rechazar')}
          />
        </View>
      </View>
      <Alert
        visible={!!option}
        title={`¿Está seguro que desea ${option}?`}
        confirmText="Si"
        cancelText="No"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.surface,
    padding: unit(15),
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
