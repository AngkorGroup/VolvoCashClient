import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Details from 'components/detail';
import {
  selectCharge,
  selectChargeId,
} from 'utils/redux/ui/confirmation-modal/confirmation-modal-reducer';
import { initialState } from 'utils/redux/ui/movement-detail-screen/movement-detail-screen-reducer';
import { customFormatDate, customFormatHour } from 'utils/moment';
import { getChargeDetailCall } from 'utils/redux/services/charge-detail-actions';

const SuccessModal = () => {
  const [loading, setLoading] = useState(false);
  const charge = useSelector(selectCharge);
  const [payload, setPayload] = useState(initialState);
  const chargeId = useSelector(selectChargeId);
  const dispatch = useDispatch();

  const handleSharePress = async (imageUrl: string) => {
    setLoading(true);
    RNFetchBlob.fetch('GET', imageUrl, {
      'Content-Type': 'multipart/form-data',
    })
      .then((res) => {
        setLoading(false);
        const status = res.info().status;
        if (status === 200) {
          Share.open({
            url: `data:image/jpeg;base64,${res.base64()}`,
          }).catch(() => {
            return Alert.alert(
              'Error',
              'Hubo un problema al momento de compartir el comprobante.',
            );
          });
        }
      })
      .catch(() => {
        setLoading(false);
        return Alert.alert(
          'Error',
          'Hubo un problema al momento de compartir el comprobante.',
        );
      });
  };

  useEffect(() => {
    if (chargeId) {
      dispatch(getChargeDetailCall(chargeId));
    }
  }, [dispatch, chargeId]);
  useEffect(() => {
    if (charge) {
      setPayload({
        description: charge.description || '',
        displayName: charge.displayName || '',
        imageUrl: charge.imageUrl,
        amountLabel: charge.amount.label,
        hour: customFormatHour(charge.createdAt),
        date: customFormatDate(charge.createdAt),
        operationCode: charge.operationCode || '',
        cashier: `${charge.cashier?.firstName} ${charge.cashier?.lastName}`,
      });
    }
  }, [charge]);

  return (
    <Details
      buttons={{
        cancel: false,
        confirm: true,
        share: false,
        close: false,
      }}
      handleSharePress={() => handleSharePress(charge?.imageUrl || '')}
      loading={loading}
      header="Cobro exitoso"
      chargeInfo={payload}
    />
  );
};

export default SuccessModal;
