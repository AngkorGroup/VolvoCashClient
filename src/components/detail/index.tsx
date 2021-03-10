import React from 'react';
import CloseButton from 'components/header/CloseButton';
import Header from 'components/header/Header';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import Button from 'components/button/Button';
import ShareButton from 'components/button/Share';
import InfoRow from 'components/card/InfoRow';
import { theme, palette } from 'utils/styles';
import { getCurrentDate, getCurrentHour } from 'utils/moment';
import { MovementInfo } from 'utils/redux/ui/movement-detail-screen/movement-detail-screen-action';
import { ScrollView } from 'react-native-gesture-handler';

interface IButtons {
  cancel: boolean;
  confirm: boolean;
  share: boolean;
  close: boolean;
}

interface IDetail {
  header: string;
  loading: boolean;
  chargeInfo: MovementInfo;
  onCancel?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  buttons: IButtons;
  handleSharePress?: (imageUrl: string) => void;
}

const DetailScreen: React.FC<IDetail> = ({
  header,
  loading = false,
  chargeInfo,
  onCancel,
  onClose,
  onConfirm,
  buttons,
  handleSharePress,
}) => {
  return (
    <View style={styles.container}>
      <Header
        title={header}
        alignment="center"
        rightButton={
          buttons.close ? <CloseButton onClose={onClose} /> : <CloseButton />
        }
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={palette.ocean}
          animating={true}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.card}>
          {Boolean(chargeInfo.operationCode) && (
            <InfoRow label="Operación" value={`${chargeInfo.operationCode}`} />
          )}
          <InfoRow label="Monto" value={chargeInfo.amountLabel} />
          <InfoRow label="Concepto" value={chargeInfo.displayName || '-'} />
          <InfoRow label="Observación" value={chargeInfo.description} />
          {Boolean(chargeInfo.cashier) && (
            <InfoRow label="Cajero" value={chargeInfo.cashier} />
          )}
          <InfoRow label="Fecha" value={chargeInfo.date || getCurrentDate()} />
          <InfoRow label="Hora" value={chargeInfo.hour || getCurrentHour()} />

          {Boolean(buttons.share && chargeInfo.imageUrl) && (
            <View style={styles.shareContainer}>
              <ShareButton
                onPress={() => {
                  handleSharePress && handleSharePress(chargeInfo.imageUrl);
                }}
              />
            </View>
          )}
          <View style={styles.buttonsContainer}>
            {buttons.cancel && (
              <Button
                title="Rechazar"
                textStyle={theme.red}
                style={styles.button}
                onPress={onCancel}
              />
            )}
            {buttons.confirm && (
              <Button
                title="Confirmar"
                style={styles.button}
                onPress={onConfirm}
              />
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DetailScreen;
