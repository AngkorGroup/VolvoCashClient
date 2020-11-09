import VolvoCard from 'components/card/VolvoCardItem';
import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
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
import { theme, palette } from 'utils/styles';

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
      <View>
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
            <View>
              <Text style={styles.header}>{SECTION_NAME_MAP[title]}</Text>
              <View style={styles.fullDivider} />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          renderSectionFooter={() => <View style={styles.fullDivider} />}
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
  list: {
    borderLeftWidth: 5,
    borderLeftColor: palette.ocean,
  },
  header: {
    ...theme.primary,
    ...theme.medium,
    fontFamily: 'VolvoNovum-Regular',
    marginVertical: unit(10),
    marginLeft: unit(10),
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

export default CardListScreen;
