import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import Input from 'components/input/Input';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'components/alert/Alert';
import {
  selectLoading,
  selectError,
} from 'utils/redux/ui/sms-screen/sms-screen-reducer';
import { verifyCodeCall } from 'utils/redux/ui/sms-screen/sms-screen-actions';
import { selectPhone, selectPushToken } from 'utils/redux/auth/auth-reducer';
import { SMS_CODE_LENGTH } from 'utils/constants';
import { dismissError } from 'utils/redux/actions';

const SmsScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const phone = useSelector(selectPhone);
  const deviceToken = useSelector(selectPushToken);

  const handleTextChange = (text: string) => {
    if (text.length === SMS_CODE_LENGTH) {
      dispatch(
        verifyCodeCall({
          code: text,
          phone,
          deviceToken,
          devicePlatform: Platform.OS,
        }),
      );
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeContainer}>
      <Header title={'Ingresa el código SMS'} leftButton={<BackButton />} />
      <View style={styles.container}>
        <Text style={styles.text}>
          Te enviaremos un código por mensaje de texto (SMS). Ingresa el código
          para verificar tu número de teléfono.
        </Text>
        <Input
          placeholder="Código SMS"
          keyboardType="phone-pad"
          iconFamily="Entypo"
          iconName="typing"
          onChangeText={handleTextChange}
          editable={!loading}
        />
      </View>
      <Alert
        visible={error}
        title="Código inválido o expirado"
        message={`Asegúrate que has escrito bien el código o vuelve a solicitar un código${
          deviceToken ? '.' : ''
        }`}
        confirmText="OK"
        onConfirm={() => dispatch(dismissError())}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    ...theme.background,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    margin: unit(40),
  },
  text: {
    ...theme.small,
    ...theme.secondary,
    marginBottom: unit(20),
  },
});

export default SmsScreen;
