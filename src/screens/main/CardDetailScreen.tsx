import { useRoute } from '@react-navigation/native';
import Button from 'components/button/Button';
import ListItem from 'components/card/ListItem';
import BackButton from 'components/header/BackButton';
import Header from 'components/header/Header';
import Icon from 'components/icon/Icon';
import Search from 'components/input/Search';
import Tab from 'components/tab/Tab';
import { Card } from 'models/Card';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';
import movements from 'mocks/movements';
import batches from 'mocks/batches';
import { formatDate } from 'utils/moment';

type CardDetailTab = 'Movimientos' | 'Vencimientos';

const Movements = () => {
  const [query, setQuery] = useState('');
  const [filteredMovements, setFilteredMovements] = useState(movements);

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

  return (
    <View style={styles.listContainer}>
      <Search
        value={query}
        onChangeText={handleChangeText}
        placeholder="Buscar en mis movimientos"
        style={styles.search}
      />
      <FlatList
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
  const [filteredBatches, setFilteredBatches] = useState(batches);

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

const CardDetailScreen = () => {
  const { params } = useRoute();
  const [tab, setTab] = useState<CardDetailTab>('Movimientos');

  if (!params) {
    return null;
  }

  const { card } = params as { card: Card };

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
          <Text style={styles.balanceText}>{card.money}</Text>
        </View>
        {card.ownerType === 'primary' && (
          <Button
            title="Generar código QR"
            onPress={() => {}}
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
