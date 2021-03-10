import Button from 'components/button/Button';
import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
import Icon from 'components/icon/Icon';
import Search from 'components/input/Search';
import Divider from 'components/layout/Divider';
import { Contact } from 'models/Contact';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getContactListCall } from 'utils/redux/services/contact-actions';
import {
  selectContactList,
  selectLoading,
  selectShowButton,
} from 'utils/redux/ui/transfers-screen/transfers-screen-reducer';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import * as routes from 'utils/routes';
import { useNavigation } from '@react-navigation/native';

const TransferListScreen = () => {
  const [query, setQuery] = useState('');
  const loading = useSelector(selectLoading);
  const showButton = useSelector(selectShowButton);
  const contacts = useSelector(selectContactList);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setFilteredContacts(contacts);
      setQuery('');
    }, [contacts]),
  );

  const refresh = useCallback(() => {
    dispatch(getContactListCall());
  }, [dispatch]);

  useFocusEffect(refresh);

  const handleChangeText = (text: string) => {
    setQuery(text);
    setFilteredContacts(
      contacts.filter(
        (contact: Contact) =>
          contact.fullName.includes(text) || contact.phone?.includes(text),
      ),
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Transferencias'}
        alignment="center"
        rightButton={<ExitButton />}
      />
      {showButton && (
        <View style={styles.infoContainer}>
          <Button
            title="Nuevo Contacto"
            onPress={() => {
              navigation.navigate(routes.CONTACT_FORM_SCREEN);
            }}
            icon={
              <Icon
                family="SimpleLineIcons"
                name="user-follow"
                size={unit(30)}
              />
            }
          />
        </View>
      )}
      <View style={styles.listContainer}>
        <Search
          value={query}
          onChangeText={handleChangeText}
          placeholder="Buscar en mis contactos"
          style={styles.search}
        />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
          style={styles.list}
          data={filteredContacts}
          keyExtractor={(contact) => contact.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: contact }) => (
            <TouchableOpacity
              activeOpacity={theme.opacity}
              containerStyle={styles.itemContainer}
              onPress={() =>
                navigation.navigate(routes.SELECT_CARD_SCREEN, { contact })
              }>
              <Text style={styles.itemLabel}>{contact.fullName}</Text>
              <Text style={styles.subtitleLabel}>{contact.client?.name}</Text>
              <Text style={styles.subtitleLabel}>{contact.phone}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={Divider}
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
    height: unit(70),
    padding: unit(10),
    marginVertical: unit(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    marginVertical: unit(5),
  },
  itemLabel: {
    ...theme.small,
    ...theme.primary,
  },
  subtitleLabel: {
    ...theme.small,
    ...theme.secondary,
  },
  listContainer: {
    flex: 1,
    padding: unit(10),
    paddingBottom: unit(0),
    ...theme.surface,
  },
  list: {
    flex: 1,
  },
  search: {
    marginVertical: unit(5),
  },
});

export default TransferListScreen;
