import React from 'react';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import { StyleSheet, View } from 'react-native';
import { theme } from 'utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { unit } from 'utils/responsive';
import Input from 'components/input/Input';
import Button from 'components/button/Button';
import { useRoute } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { Card } from 'models/Card';
import { Contact } from 'models/Contact';
import { selectContact } from 'utils/redux/auth/auth-reducer';
import { CURRENCY_SYMBOL_MAP } from 'models/Money';
import { postTransferDetailCall } from 'utils/redux/services/transfer-actions';
import { selectLoading } from 'utils/redux/ui/transfer-form-screen/transfer-form-screen-reducer';
import { Keyboard } from 'react-native';

interface Params {
  card: Card;
  contact: Contact;
}

interface Form {
  amount: number;
}

const TransferFormScreen = () => {
  const dispatch = useDispatch();
  const { params } = useRoute();
  const me = useSelector(selectContact);
  const loading = useSelector(selectLoading);
  const { control, handleSubmit, formState } = useForm({
    mode: 'all',
  });

  const onSubmit = (form: Form) => {
    Keyboard.dismiss();
    dispatch(
      postTransferDetailCall({
        amount: {
          currencyCode: card.balance.currencyCode,
          value: form.amount,
          label: card.calculatedBalance.label,
          currencyLabel: card.calculatedBalance.currencyLabel,
        },
        originCardId: card.id,
        contactId: contact.id,
      }),
    );
  };

  const { card, contact } = params as Params;

  return (
    <View style={styles.container}>
      <Header
        title="Transferencia"
        alignment="left"
        leftButton={<BackButton />}
      />
      <View style={styles.content}>
        <Input
          value={card.cardType?.displayName + ' - ' + me?.fullName}
          innerLabel="Desde"
          containerStyle={styles.input}
          editable={false}
          editableStyles={false}
        />
        <Input
          value={card.cardType?.displayName + ' - ' + contact.fullName}
          innerLabel="Hasta"
          containerStyle={styles.input}
          editable={false}
          editableStyles={false}
        />
        <Controller
          control={control}
          name="amount"
          rules={{ required: true }}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              placeholder="Monto"
              innerLabel={CURRENCY_SYMBOL_MAP[card.cardType?.currency || 'USD']}
              containerStyle={styles.input}
              keyboardType="numeric"
            />
          )}
        />
        <Button
          title="Transferir"
          onPress={handleSubmit(onSubmit)}
          disabled={!formState.isValid}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...theme.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    margin: unit(30),
  },
  input: {
    width: '100%',
    marginBottom: unit(20),
  },
});

export default TransferFormScreen;
