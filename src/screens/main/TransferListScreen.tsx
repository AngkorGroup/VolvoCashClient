import Button from 'components/button/Button';
import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
import Icon from 'components/icon/Icon';
import Search from 'components/input/Search';
import Divider from 'components/layout/Divider';
import { Contact } from 'models/Contact';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getContactListCall } from 'utils/redux/services/contact-actions';
import {
  selectContactList,
  selectLoading,
} from 'utils/redux/ui/transfers-screen/transfers-screen-reducer';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import * as routes from 'utils/routes';
import { useNavigation } from '@react-navigation/native';
import { selectContact } from 'utils/redux/auth/auth-reducer';

const TransferListScreen = () => {
  const [query, setQuery] = useState('');
  const loading = useSelector(selectLoading);
  const contacts = useSelector(selectContactList);
  const currentUser = useSelector(selectContact);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    setFilteredContacts(contacts);
    setQuery('');
  }, [contacts]);

  const refresh = useCallback(() => {
    dispatch(getContactListCall());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleChangeText = (text: string) => {
    setQuery(text);
    setFilteredContacts(
      contacts.filter((contact: Contact) => contact.fullName.includes(text)),
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Transferencias'}
        alignment="center"
        rightButton={<ExitButton />}
      />
      {currentUser?.type === 'Primary' && (
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
          style-={styles.list}
          data={filteredContacts}
          keyExtractor={(contact) => contact.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: contact }) => (
            <View>
              <Text style={styles.itemLabel}>{contact.fullName}</Text>
            </View>
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
  itemLabel: {
    ...theme.small,
    ...theme.primary,
    marginVertical: unit(5),
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
