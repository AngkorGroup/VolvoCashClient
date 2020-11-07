import ListItem from 'components/charge-list/ListItem';
import ExitButton from 'components/header/ExitButton';
import Header from 'components/header/Header';
import React, { useCallback, useEffect } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { theme } from 'utils/styles';
import { FlatList } from 'react-native-gesture-handler';
import {
  selectChargeList,
  selectLoading,
} from 'utils/redux/ui/charge-list-screen/charge-list-screen-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getChargeListCall } from 'utils/redux/services/charge-list-actions';

const ChargeListScreen = () => {
  const loading = useSelector(selectLoading);
  const chargeList = useSelector(selectChargeList);
  const dispatch = useDispatch();

  const refresh = useCallback(() => {
    dispatch(getChargeListCall());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <View style={styles.safeContainer}>
      <Header
        title={'Pagos pendientes'}
        alignment="center"
        rightButton={<ExitButton />}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        style={styles.list}
        data={chargeList}
        keyExtractor={(charge) => charge.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: charge }) => <ListItem charge={charge} />}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    ...theme.background,
  },
  list: {
    flex: 1,
  },
  divider: {
    height: 1.5,
    width: '100%',
    ...theme.disabledSurface,
  },
});

export default ChargeListScreen;
