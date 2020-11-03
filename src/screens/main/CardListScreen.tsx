import VolvoCard from 'components/card/VolvoCard';
import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
import Spacing from 'components/layout/Spacing';
import React, { useCallback, useEffect } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  selectSections,
} from 'utils/redux/ui/card-list-screen/card-list-screen-reducer';
import {
  getCardListCall,
  goToCardDetail,
} from 'utils/redux/ui/card-list-screen/card-list-screen-actions';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import { Card } from 'models/Card';

const SECTION_NAME_MAP: { [key: string]: string } = {
  Primary: 'Principales',
  Secondary: 'Adicionales',
};

const CardListScreen = () => {
  const loading = useSelector(selectLoading);
  const sections = useSelector(selectSections);
  const dispatch = useDispatch();

  const refresh = useCallback(() => {
    dispatch(getCardListCall());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

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
          <VolvoCard
            card={card}
            onPress={() => dispatch(goToCardDetail(card))}
          />
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
