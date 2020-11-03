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
      activeOpacity={theme.opacity}
      onPress={onPress}>
      <Text style={styles.primaryText}>{card.cardType.displayName}</Text>
      <Text style={styles.secondaryText}>
        {card.contact.type === 'Secondary' ? card.contact.fullName : ''}
      </Text>
      <Text style={styles.primaryText}>{card.balance.toString()}</Text>
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
    backgroundColor: 'red',
    textAlign: 'center',
  },
  secondaryText: {
    ...theme.header3,
    ...theme.primaryOverDark,
    lineHeight: unit(28),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: unit(28),
  },
});

export default VolvoCard;
