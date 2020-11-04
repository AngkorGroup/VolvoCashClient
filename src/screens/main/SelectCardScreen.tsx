import React, { useCallback, useEffect } from 'react';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { theme } from 'utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getCardListCall } from 'utils/redux/ui/card-list-screen/card-list-screen-actions';
import {
  selectCardList,
  selectLoading,
} from 'utils/redux/ui/select-card-screen/select-card-screen-reducer';
import { FlatList } from 'react-native-gesture-handler';
import VolvoCard from 'components/card/VolvoCard';
import { unit } from 'utils/responsive';
import Divider from 'components/layout/Divider';
import Spacing from 'components/layout/Spacing';

const SelectCardScreen = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const cards = useSelector(selectCardList);

  const refresh = useCallback(() => {
    dispatch(getCardListCall());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

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
        keyExtractor={(contact) => contact.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: card }) => (
          <VolvoCard
            card={card}
            onPress={() => console.log('toque card', card)}
          />
        )}
        ListHeaderComponent={() => <Spacing size={unit(30)} />}
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
    marginHorizontal: unit(30),
  },
});

export default SelectCardScreen;
