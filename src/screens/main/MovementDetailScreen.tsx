import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { getChargeInfo } from 'utils/redux/ui/movement-detail-screen/movement-detail-screen-reducer';
import Details from 'components/detail';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const ConfirmationScreen = () => {
  const [loading, setLoading] = useState(false);
  const chargeInfo = useSelector(getChargeInfo);

  const handleSharePress = async (imageUrl: string) => {
    setLoading(true);
    RNFetchBlob.fetch('GET', imageUrl, {
      'Content-Type': 'multipart/form-data',
    })
      .then((res) => {
        const status = res.info().status;
        if (status === 200) {
          Share.open({
            url: `data:image/jpeg;base64,${res.base64()}`,
          })
            .then(() => {
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
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

  return (
    <Details
      buttons={{
        cancel: false,
        confirm: false,
        share: true,
        close: false,
      }}
      handleSharePress={handleSharePress}
      loading={loading}
      header="Detalle de moviento"
      chargeInfo={chargeInfo}
    />
  );
};

export default ConfirmationScreen;
