import React, { useCallback } from 'react';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { theme, palette } from 'utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Divider from 'components/layout/Divider';
import { unit } from 'utils/responsive';
import {
  selectClientList,
  selectLoading,
} from 'utils/redux/ui/select-client-screen/select-client-screen-reducer';
import { IClient } from 'models/Client';
import {
  getClientsCall,
  setClient,
} from 'utils/redux/ui/select-client-screen/select-client-screen-actions';

const SelectClientScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(selectLoading);
  const clients = useSelector(selectClientList);

  const refresh = useCallback(() => {
    dispatch(getClientsCall());
  }, [dispatch]);

  useFocusEffect(refresh);

  const handlePress = (client: IClient) => {
    dispatch(setClient(client));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Selecciona un cliente"
        alignment="left"
        leftButton={<BackButton />}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        style={styles.list}
        data={clients}
        keyExtractor={(client) => client?.id?.toString() || ''}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: client }) => (
          <TouchableOpacity
            onPress={() => handlePress(client)}
            containerStyle={styles.itemContainer}>
            <Text style={styles.itemText}>{client.name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={Divider}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...theme.background,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    ...theme.surface,
  },
  divider: {
    height: 1,
    width: '83%',
    alignSelf: 'flex-end',
    backgroundColor: palette.ocean,
  },
  fullDivider: {
    height: 1,
    alignSelf: 'flex-end',
    width: '100%',
    backgroundColor: palette.ocean,
  },
  itemText: {
    ...theme.mediumLight,
    ...theme.primary,
    margin: unit(5),
  },
});

export default SelectClientScreen;
