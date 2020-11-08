import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'models/Card';
import { unit } from 'utils/responsive';
import { palette, theme } from 'utils/styles';
import Icon from 'components/icon/Icon';

const width = Dimensions.get('window').width;

interface VolvoCardProps {
  card: Card;
  onPress(): void;
}

export const getCurrency = (val: string) => {
  if (val === 'PEN') {
    return 'Soles';
  } else {
    return 'Dólares';
  }
};

const VolvoCardItem: React.FC<VolvoCardProps> = ({ card, onPress }) => {
  const bgColor = {
    color: card.color,
  };
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <Icon
          family="Ionicons"
          name="md-card-outline"
          style={[styles.icon, bgColor]}
        />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.subtitle}>
            {card.cardType.displayName} {getCurrency(card.cardType.currency)}
          </Text>
          <Text ellipsizeMode={'tail'} numberOfLines={1} style={styles.title}>
            {card.calculatedBalance.label}
          </Text>
          <Text style={styles.info}>Saldo disponible</Text>
        </View>
        <Icon
          style={styles.arrow}
          family="MaterialIcon"
          name="arrow-forward-ios"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.surface,
    flexDirection: 'row',
    padding: unit(10),
    paddingBottom: unit(0),
    alignItems: 'center',
    flex: 1,
    paddingRight: 30,
  },
  infoContainer: {
    justifyContent: 'space-between',
    width: width * 0.8,
    alignContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  arrow: {
    marginRight: 15,
    fontSize: 15,
    color: palette.ocean,
  },
  icon: {
    fontSize: 45,
    marginRight: 10,
  },
  title: {
    ...theme.primary,
    ...theme.medium,
    fontSize: unit(20),
    marginBottom: unit(5),
    alignSelf: 'flex-start',
    fontWeight: '600',
    color: palette.black,
    lineHeight: unit(20),
  },
  subtitle: {
    ...theme.small,
    ...theme.secondary,
    marginBottom: unit(5),
    color: palette.black,
    alignSelf: 'flex-start',
  },
  info: {
    ...theme.secondary,
    marginBottom: unit(5),
    lineHeight: unit(12),
    fontSize: unit(12),
  },
});

export default VolvoCardItem;
