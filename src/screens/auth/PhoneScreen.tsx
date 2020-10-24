import Button from 'components/button/Button';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import Input from 'components/input/Input';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  selectError,
} from 'utils/redux/ui/phone-screen/phone-screen-reducer';
import Alert from 'components/alert/Alert';
import {
  requestCodeCall,
  setPhone,
} from 'utils/redux/ui/phone-screen/phone-screen-actions';
import { selectPhone } from 'utils/redux/auth/auth-reducer';
import { dismissError } from 'utils/redux/actions';

const PhoneScreen = () => {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const phone = useSelector(selectPhone);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);

  const handleTextChange = (text: string) => {
    const valid = /^9\d{8}$/.test(text);
    if (valid) {
      dispatch(setPhone(text));
    }
    setDisabled(!valid);
  };

  const handleButtonPress = () => {
    dispatch(requestCodeCall(phone));
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeContainer}>
      <Header title={'Ingresa tu teléfono'} leftButton={<BackButton />} />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? unit(40) : 0}>
        <View style={styles.container}>
          <Text style={styles.text}>
            VOLVO CASH es una aplicación para usuarios frecuentes de Volvo.
            Ingresa tu teléfono para buscarte en el sistema.
          </Text>
          <Input
            placeholder="Teléfono"
            keyboardType="phone-pad"
            iconFamily="SimpleLineIcons"
            iconName="phone"
            onChangeText={handleTextChange}
          />
        </View>

        <Button
          title="Enviar SMS"
          onPress={handleButtonPress}
          loading={loading}
          disabled={disabled}
        />
      </KeyboardAvoidingView>
      <Alert
        visible={error}
        title="Teléfono no encontrado"
        message="Sólo los clientes registrados pueden utilizar Volvo Cash."
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
    margin: unit(40),
  },
  container: {
    alignItems: 'center',
  },
  text: {
    ...theme.small,
    ...theme.secondary,
    marginBottom: unit(20),
  },
});

export default PhoneScreen;
