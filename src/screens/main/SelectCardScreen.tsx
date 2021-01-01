import React, { useCallback } from 'react';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { theme, palette } from 'utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getCardListCall } from 'utils/redux/ui/card-list-screen/card-list-screen-actions';
import {
  selectCardList,
  selectLoading,
} from 'utils/redux/ui/select-card-screen/select-card-screen-reducer';
import { FlatList } from 'react-native-gesture-handler';
import VolvoCard from 'components/card/VolvoCardItem';
import { unit } from 'utils/responsive';
import Spacing from 'components/layout/Spacing';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as routes from 'utils/routes';
import { Contact } from 'models/Contact';

interface Params {
  contact: Contact;
}

const SelectCardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useSelector(selectLoading);
  const cards = useSelector(selectCardList);
  const { params } = useRoute();
  const { contact } = params as Params;

  const refresh = useCallback(() => {
    dispatch(getCardListCall(contact.id));
  }, [dispatch, contact]);

  useFocusEffect(refresh);

  return (
    <View style={styles.container}>
      <Header
        title="Selecciona cuenta de cargo"
        alignment="left"
        leftButton={<BackButton />}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        style={styles.list}
        data={cards}
        keyExtractor={(card) => card.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: card }) => (
          <VolvoCard
            card={card}
            onPress={() =>
              navigation.navigate(routes.TRANSFER_FORM_SCREEN, {
                card,
                contact,
              })
            }
          />
        )}
        ListHeaderComponent={() => (
          <View>
            <Spacing size={unit(30)} />
            <View style={styles.fullDivider} />
          </View>
        )}
        ListFooterComponent={() => <View style={styles.fullDivider} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
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
    flex: 2,
    borderLeftWidth: 5,
    borderLeftColor: palette.ocean,
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
});

export default SelectCardScreen;
