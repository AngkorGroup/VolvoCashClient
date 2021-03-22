import VolvoCard from 'components/card/VolvoCardItem';
import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
import React, { useCallback } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoading,
  selectSections,
  selectTotalBalance,
} from 'utils/redux/ui/card-list-screen/card-list-screen-reducer';
import {
  getCardListCall,
  goToCardDetail,
} from 'utils/redux/ui/card-list-screen/card-list-screen-actions';
import { unit } from 'utils/responsive';
import { theme, palette } from 'utils/styles';
import QuestionButton from 'components/header/QuestionButton';

const SECTION_NAME_MAP: { [key: string]: string } = {
  Primary: 'Principales',
  Secondary: 'Adicionales',
};

const CardListScreen = () => {
  const loading = useSelector(selectLoading);
  const sections = useSelector(selectSections);
  const totalBalance = useSelector(selectTotalBalance);

  const dispatch = useDispatch();

  const refresh = useCallback(() => {
    dispatch(getCardListCall());
  }, [dispatch]);

  useFocusEffect(refresh);

  return (
    <View style={styles.container}>
      <Header
        title={'Tarjetas'}
        alignment="center"
        rightButton={<ExitButton />}
        leftButton={<QuestionButton />}
      />
      {!!totalBalance?.label && (
        <Text style={styles.header}>
          {'Saldo global: ' + totalBalance.label}
        </Text>
      )}
      <SectionList
        refreshing={loading}
        onRefresh={refresh}
        contentInsetAdjustmentBehavior="always"
        stickySectionHeadersEnabled={false}
        style={styles.list}
        sections={sections}
        keyExtractor={({ id }) => id.toString()}
        renderItem={(section) => (
          <VolvoCard
            card={section.item}
            type={section.section.title}
            onPress={() => dispatch(goToCardDetail(section.item))}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...theme.background,
  },
  list: {
    borderLeftWidth: 5,
    flex: 2,
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
