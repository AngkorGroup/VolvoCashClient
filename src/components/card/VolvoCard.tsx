import { Card } from 'models/Card';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface VolvoCardProps {
  card: Card;
  onPress(): void;
}

const VolvoCard: React.FC<VolvoCardProps> = ({ card, onPress }) => {
  const bgColor = {
    backgroundColor: card.color,
  };
  return (
    <TouchableOpacity
      style={[styles.container, bgColor]}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={styles.primaryText}>{card.cardType.displayName}</Text>
      <Text style={styles.secondaryText}>
        {card.ownerType === 'secondary' ? card.ownerName : ''}
      </Text>
      <Text style={styles.primaryText}>{card.money}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: unit(200),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: unit(10),
    borderRadius: unit(20),
    ...theme.shadow,
  },
  primaryText: {
    ...theme.header1,
    ...theme.primaryOverDark,
    lineHeight: unit(60),
    fontFamily: 'VolvoBroadProDigital',
    marginTop: unit(5),
  },
  secondaryText: {
    ...theme.header3,
    ...theme.primaryOverDark,
    lineHeight: unit(28),
    alignItems: 'center',
    justifyContent: 'center',
    height: unit(28),
  },
});

export default VolvoCard;
