import React, { useEffect, useState } from 'react';
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
import Details from 'components/detail';
import { initialState } from 'utils/redux/ui/movement-detail-screen/movement-detail-screen-reducer';
import { customFormatDate, customFormatHour } from 'utils/moment';

const ConfirmationModal = () => {
  const loading = useSelector(selectLoading);
  const confirmLoading = useSelector(selectConfirmLoading);
  const charge = useSelector(selectCharge);
  const chargeId = useSelector(selectChargeId);
  const [payload, setPayload] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (chargeId) {
      dispatch(getChargeDetailCall(chargeId));
    }
  }, [dispatch, chargeId]);

  const handleClose = () => {
    dispatch(closeConfirmationModal());
  };

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
        cancel: true,
        confirm: true,
        share: false,
        close: true,
      }}
      onCancel={() => {
        if (chargeId) {
          dispatch(confirmChargeCall(chargeId, false, { replace: true }));
        }
      }}
      onClose={handleClose}
      onConfirm={() => {
        if (chargeId) {
          dispatch(confirmChargeCall(chargeId, true, { replace: true }));
        }
      }}
      loading={loading}
      header="Confirmar cobro"
      chargeInfo={payload}
    />
  );
};

export default ConfirmationModal;
