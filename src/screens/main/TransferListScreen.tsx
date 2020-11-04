import Button from 'components/button/Button';
import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
import Icon from 'components/icon/Icon';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

const TransferListScreen = () => {
  return (
    <View style={styles.container}>
      <Header
        title={'Transferencias'}
        alignment="center"
        rightButton={<ExitButton />}
      />
      <View style={styles.infoContainer}>
        <Button
          title="Nuevo Contacto"
          onPress={() => {
            console.log('hoal');
          }}
          icon={
            <Icon family="SimpleLineIcons" name="user-follow" size={unit(30)} />
          }
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
  infoContainer: {
    height: unit(90),
    padding: unit(20),
    marginVertical: unit(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransferListScreen;
