import Button from 'components/button/Button';
import ListItem from 'components/card/ListItem';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import Icon from 'components/icon/Icon';
import Search from 'components/input/Search';
import Tab from 'components/tab/Tab';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCard,
  selectCardMovements,
  selectLoading,
  selectCardBatches,
} from 'utils/redux/ui/card-detail-screen/card-detail-screen-reducer';
import { getCardDetailCall } from 'utils/redux/ui/card-detail-screen/card-detail-screen-action';
import { useNavigation } from '@react-navigation/native';
import * as routes from 'utils/routes';
import { Batch } from 'models/Batch';

type CardDetailTab = 'Movimientos' | 'Vencimientos';

const CardDetailScreen = () => {
  const [tab, setTab] = useState<CardDetailTab>('Movimientos');
  const navigation = useNavigation();

  const card = useSelector(selectCard);

  if (!card) {
    return <ActivityIndicator animating={true} />;
  }

  return (
    <View style={styles.container}>
      <Header
        title={card.cardType?.displayName || '-'}
        alignment="left"
        leftButton={<BackButton />}
      />
      <View style={styles.infoContainer}>
        <View>
          {card.contact?.type === 'Secondary' && (
            <Text
              numberOfLines={1}
              style={[
                styles.balanceLabel,
                theme.tiny,
              ]}>{`${card.contact?.fullName}`}</Text>
          )}
          {!!card.contact?.client && (
            <Text
              numberOfLines={1}
              style={[
                styles.balanceLabel,
                theme.tiny,
              ]}>{`${card.contact?.client?.name}`}</Text>
          )}
          <Text style={styles.balanceText}>{card.balance.toString()}</Text>
        </View>
        {card.contact?.type === 'Primary' && (
          <Button
            title="Generar código QR"
            onPress={() => {
              navigation.navigate(routes.QR_SCREEN);
            }}
            icon={
              <Icon family="MaterialIcon" name="qr-code-2" size={unit(50)} />
            }
          />
        )}
      </View>
      <View style={styles.tabBar}>
        <Tab
          name="Movimientos"
          active={tab === 'Movimientos'}
          onPress={() => setTab('Movimientos')}
        />
        <Tab
          name="Vencimientos"
          active={tab === 'Vencimientos'}
          onPress={() => setTab('Vencimientos')}
        />
      </View>
      {tab === 'Movimientos' && <Movements />}
      {tab === 'Vencimientos' && <Batches />}
    </View>
  );
};

const Movements = () => {
  const [query, setQuery] = useState('');
  const movements = useSelector(selectCardMovements);
  const loading = useSelector(selectLoading);
  const [filteredMovements, setFilteredMovements] = useState(movements);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredMovements(movements);
    setQuery('');
  }, [movements]);

  const card = useSelector(selectCard);

  if (!card) {
    return <ActivityIndicator animating={true} />;
  }

  const handleChangeText = (text: string) => {
    setQuery(text);
    setFilteredMovements(
      movements.filter(
        (movement) =>
          movement.displayName.includes(text) ||
          movement.createdAt.includes(text) ||
          movement.amount.toString().includes(text),
      ),
    );
  };

  const refresh = () => {
    dispatch(getCardDetailCall(card.id));
  };

  return (
    <View style={styles.listContainer}>
      <Search
        value={query}
        onChangeText={handleChangeText}
        placeholder="Buscar en mis movimientos"
        style={styles.search}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        style={styles.list}
        data={filteredMovements}
        keyExtractor={(movement) => movement.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: movement }) => (
          <ListItem
            title={movement.displayName}
            subtitle={movement.createdAt}
            value={movement.amount.toString()}
            status={movement.charge?.status}
            mode={movement.amount.value >= 0 ? 'positive' : 'negative'}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </View>
  );
};

const Batches = () => {
  const [query, setQuery] = useState('');
  const loading = useSelector(selectLoading);
  const batches = useSelector(selectCardBatches);
  const [filteredBatches, setFilteredBatches] = useState(batches);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredBatches(batches);
    setQuery('');
  }, [batches]);

  const card = useSelector(selectCard);

  if (!card) {
    return <ActivityIndicator animating={true} />;
  }

  const refresh = () => {
    dispatch(getCardDetailCall(card.id));
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    setFilteredBatches(
      batches.filter(
        (batch: Batch) =>
          batch.expiresAt.includes(text) ||
          batch.balance.toString().includes(text),
      ),
    );
  };

  return (
    <View style={styles.listContainer}>
      <Search
        value={query}
        onChangeText={handleChangeText}
        placeholder="Buscar en mis vencimientos"
        style={styles.search}
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        style={styles.list}
        data={filteredBatches}
        keyExtractor={(batch: Batch) => batch.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: batch }) => (
          <ListItem
            title="Recarga"
            subtitle={batch.expiresAt}
            value={batch.balance.toString()}
            mode={
              new Date(batch.expiresAt) > new Date() ? 'positive' : 'negative'
            }
          />
        )}
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
  search: {
    marginVertical: unit(5),
  },
  infoContainer: {
    ...theme.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: unit(90),
    padding: unit(20),
    marginVertical: unit(15),
  },
  balanceLabel: {
    ...theme.small,
    ...theme.secondary,
  },
  balanceText: {
    ...theme.large,
    ...theme.primary,
    marginTop: unit(5),
  },
  tabBar: {
    flexDirection: 'row',
    height: unit(35),
  },
  list: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: unit(10),
    paddingBottom: unit(0),
    ...theme.surface,
  },
  divider: {
    height: 1.5,
    width: '100%',
    ...theme.disabledSurface,
  },
});

export default CardDetailScreen;
