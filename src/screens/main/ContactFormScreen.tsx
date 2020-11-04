import Button from 'components/button/Button';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import Input from 'components/input/Input';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import { useForm, Controller } from 'react-hook-form';
import { IContact } from 'models/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { postContactDetailCall } from 'utils/redux/services/contact-actions';
import { selectLoading } from 'utils/redux/ui/contact-form-screen/contact-form-screen-reducer';

const ContactFormScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const { control, handleSubmit, formState } = useForm<IContact>({
    mode: 'all',
  });
  const onSubmit = (contact: IContact) => {
    dispatch(postContactDetailCall({ ...contact, documentType: 'DNI' }));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Nuevo contacto"
        alignment="left"
        leftButton={<BackButton />}
      />
      <View style={styles.contentContainer}>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: true }}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              placeholder="Nombres"
              containerStyle={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          rules={{ required: true }}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              placeholder="Apellidos"
              containerStyle={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          rules={{ required: true }}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              placeholder="Teléfono"
              containerStyle={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              placeholder="Correo electrónico"
              containerStyle={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="documentNumber"
          rules={{ required: true }}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              placeholder="DNI"
              containerStyle={styles.input}
            />
          )}
        />
        <Button
          title="Crear contacto"
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
  input: {
    width: '100%',
    marginBottom: unit(20),
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    margin: unit(30),
  },
});

export default ContactFormScreen;
