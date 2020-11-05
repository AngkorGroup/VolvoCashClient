import React, { useEffect } from 'react';
import CloseButton from 'components/header/CloseButton';
import Header from 'components/header/Header';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { theme } from 'utils/styles';
import { unit } from 'utils/responsive';
import Button from 'components/button/Button';
import InfoRow from 'components/card/InfoRow';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCharge,
  selectChargeId,
  selectConfirmLoading,
  selectLoading,
} from 'utils/redux/ui/confirmation-modal/confirmation-modal-reducer';
import {
  confirmChargeCall,
  getChargeDetailCall,
} from 'utils/redux/services/charge-detail-actions';
import { closeConfirmationModal } from 'utils/redux/ui/confirmation-modal/confirmation-modal-actions';

const ConfirmationModal = () => {
  const loading = useSelector(selectLoading);
  const confirmLoading = useSelector(selectConfirmLoading);
  const charge = useSelector(selectCharge);
  const chargeId = useSelector(selectChargeId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chargeId) {
      dispatch(getChargeDetailCall(chargeId));
    }
  }, [dispatch, chargeId]);

  const handleClose = () => {
    dispatch(closeConfirmationModal());
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Confirmar cobro'}
        alignment="center"
        rightButton={<CloseButton onClose={handleClose} />}
      />
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator animating={true} color={theme.secondary.color} />
        </View>
      )}
      {charge && (
        <View style={styles.card}>
          <InfoRow label="Monto" value={charge.amount.toString()} />
          <InfoRow label="Concepto" value={charge.description} />
          <InfoRow label="Vendedor" value={charge.cashier?.fullName || ''} />
          <View style={styles.buttonsContainer}>
            <Button
              loading={loading || confirmLoading}
              title="Rechazar"
              danger
              style={styles.button}
              onPress={() => {
                if (chargeId) {
                  dispatch(confirmChargeCall(chargeId, false));
                }
              }}
            />
            <Button
              loading={loading || confirmLoading}
              title="Confirmar"
              style={styles.button}
              onPress={() => {
                if (chargeId) {
                  dispatch(confirmChargeCall(chargeId, true));
                }
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
  },
  buttonsContainer: {
    alignItems: 'center',
    marginTop: unit(100),
  },
  button: {
    marginVertical: unit(5),
  },
  loaderContainer: {
    marginVertical: unit(10),
  },
});

export default ConfirmationModal;
