import Button from 'components/button/Button';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import Input from 'components/input/Input';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import { useForm, Controller } from 'react-hook-form';

const ContactFormScreen = () => {
  const { control, handleSubmit, formState } = useForm({
    mode: 'onTouched',
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <View style={styles.container}>
      <Header
        title="Nuevo contacto"
        alignment="left"
        leftButton={<BackButton />}
      />
      <KeyboardAvoidingView
        style={styles.contentContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? unit(30) : 0}>
        <View>
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
        </View>
        <Button
          title="Crear contacto"
          onPress={handleSubmit(onSubmit)}
          disabled={!formState.isValid}
        />
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    margin: unit(30),
  },
});

export default ContactFormScreen;
