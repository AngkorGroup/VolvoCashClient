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
import { formatDate } from 'utils/moment';
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
        title={card.cardType.displayName}
        alignment="left"
        leftButton={<BackButton />}
      />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.balanceLabel}>Saldo disponible</Text>
          <Text style={styles.balanceText}>{card.balance}</Text>
        </View>
        {card.contact.type === 'Primary' && (
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

  const handleChangeText = (text: string) => {
    setQuery(text);
    setFilteredMovements(
      movements.filter(
        (movement) =>
          movement.displayName.includes(text) ||
          formatDate(movement.date).includes(text) ||
          movement.money.toString().includes(text),
      ),
    );
  };

  const refresh = () => {
    dispatch(
      getCardDetailCall({ mockResponse: 'SUCCESS', mockData: cardDetail[1] }),
    );
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
        style-={styles.list}
        data={filteredMovements}
        keyExtractor={(movement) => movement.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: movement }) => (
          <ListItem
            title={movement.displayName}
            subtitle={formatDate(movement.date)}
            value={movement.money.toString()}
            mode={movement.type === 'in' ? 'positive' : 'negative'}
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

  const refresh = () => {
    dispatch(
      getCardDetailCall({ mockResponse: 'SUCCESS', mockData: cardDetail[1] }),
    );
  };

  const handleChangeText = (text: string) => {
    setQuery(text);
    setFilteredBatches(
      batches.filter(
        (batch) =>
          formatDate(batch.expiresAt).includes(text) ||
          batch.money.toString().includes(text),
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
        style-={styles.list}
        data={filteredBatches}
        keyExtractor={(batch) => batch.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: batch }) => (
          <ListItem
            title="Recarga"
            subtitle={formatDate(batch.expiresAt)}
            value={batch.money.toString()}
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
