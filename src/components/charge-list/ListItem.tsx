import Alert from 'components/alert/Alert';
import Button from 'components/button/Button';
import Spacing from 'components/layout/Spacing';
import { Charge } from 'models/Charge';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { confirmChargeSaga } from 'utils/redux/services/charge-detail-actions';
import {
  selectChargeId,
  selectConfirmLoading,
} from 'utils/redux/ui/confirmation-modal/confirmation-modal-reducer';

interface ListItemProps {
  charge: Charge;
}

type Option = 'confirmar' | 'rechazar' | '';

const ListItem: React.FC<ListItemProps> = ({ charge }) => {
  const [option, setOption] = useState<Option>('');
  const dispatch = useDispatch();
  const loading = useSelector(selectConfirmLoading);
  const chargeId = useSelector(selectChargeId);

  const handleCancel = () => {
    setOption('');
  };

  const handleConfirm = () => {
    setOption('');
    const confirmed = option === 'confirmar';
    dispatch(confirmChargeSaga(charge.id, confirmed));
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
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{charge.createdAt}</Text>
        <Text style={styles.subtitle}>{charge.cashier?.fullName}</Text>
      </View>
      {loading && chargeId === charge.id ? (
        <ActivityIndicator animating={true} color={theme.secondary.color} />
      ) : (
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
      )}

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
