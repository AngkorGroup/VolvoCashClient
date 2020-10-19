import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

type Mode = 'positive' | 'negative';

interface ListItem {
  title: string;
  subtitle: string;
  value: string;
  mode: Mode;
}

const ListItem: React.FC<ListItem> = ({ title, subtitle, value, mode }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles[mode]}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.surface,
    flexDirection: 'row',
    padding: unit(5),
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  positive: {
    ...theme.small,
    ...theme.accent,
  },
  negative: {
    ...theme.small,
    ...theme.red,
  },
  title: {
    ...theme.small,
    ...theme.primary,
    marginBottom: unit(5),
  },
  subtitle: {
    ...theme.small,
    ...theme.secondary,
    marginBottom: unit(5),
  },
});

export default ListItem;
