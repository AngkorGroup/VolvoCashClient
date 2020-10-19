import VolvoCard from 'components/card/VolvoCard';
import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
import Spacing from 'components/layout/Spacing';
import { Card } from 'models/Card';
import React, { useCallback, useEffect } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  selectSections,
} from 'utils/redux/ui/card-list-screen/card-list-screen-reducer';
import { getCardListCall } from 'utils/redux/ui/card-list-screen/card-list-screen-actions';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import { useNavigation } from '@react-navigation/native';
import * as routes from 'utils/routes';

const DATA = [
  new Card({
    id: 1,
    cardType: {
      id: 1,
      name: 'Bono Urea',
      displayName: 'Bono Urea',
      color: theme.secondary.color,
    },
    balance: 7200.0,
    currency: 'PEN',
    ownerType: 'primary',
  }),
  new Card({
    id: 2,
    cardType: {
      id: 1,
      name: 'Volvo Cash',
      displayName: 'Volvo Cash',
      color: theme.accent.color,
    },
    balance: 2621.32,
    currency: 'PEN',
    ownerType: 'primary',
  }),
  new Card({
    id: 3,
    cardType: {
      id: 1,
      name: 'Volvo Cash',
      displayName: 'Volvo Cash',
      color: theme.accent.color,
    },
    balance: 2621.32,
    ownerName: 'José González',
    currency: 'PEN',
    ownerType: 'secondary',
  }),
  new Card({
    id: 4,
    cardType: {
      id: 1,
      name: 'Bono Urea',
      displayName: 'Bono Urea',
      color: theme.secondary.color,
    },
    balance: 7200.0,
    ownerName: 'José González',
    currency: 'PEN',
    ownerType: 'secondary',
  }),
];

const SECTION_NAME_MAP: { [key: string]: string } = {
  primary: 'Principales',
  secondary: 'Adicionales',
};

const CardListScreen = () => {
  const loading = useSelector(selectLoading);
  const sections = useSelector(selectSections);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const refresh = useCallback(() => {
    dispatch(getCardListCall({ mockResponse: 'SUCCESS', mockData: DATA }));
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const goToDetail = (card: Card) => {
    navigation.navigate(routes.CARD_DETAIL_SCREEN, { card });
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Tarjetas'}
        alignment="center"
        rightButton={<ExitButton />}
      />
      <SectionList
        refreshing={loading}
        onRefresh={refresh}
        stickySectionHeadersEnabled={false}
        style={styles.list}
        sections={sections}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item: card }) => (
          <VolvoCard card={card} onPress={() => goToDetail(card)} />
        )}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{SECTION_NAME_MAP[title]}</Text>
        )}
        ItemSeparatorComponent={() => <Spacing size={unit(15)} />}
        renderSectionFooter={() => <Spacing size={unit(20)} />}
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
    marginHorizontal: unit(30),
  },
  header: {
    ...theme.primary,
    ...theme.medium,
    fontFamily: 'VolvoNovum-Regular',
    marginVertical: unit(10),
  },
});

export default CardListScreen;
