import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'utils/styles';

const ContactFormScreen = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Nuevo contacto"
        alignment="left"
        leftButton={<BackButton />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...theme.background,
  },
});

export default ContactFormScreen;
