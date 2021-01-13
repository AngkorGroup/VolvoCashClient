import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { unit } from 'utils/responsive';
import { theme, palette } from 'utils/styles';
import { Status } from 'models/Movement';

const width = Dimensions.get('window').width;

type Mode = 'positive' | 'negative';

interface ListItemProps {
  title: string;
  subtitle: string;
  value: string;
  status?: Status;
  mode: Mode;
}

const getStatusLabel = (status: Status) => {
  switch (status) {
    case 'Pending':
      return '⏳';
    case 'Rejected':
    case 'Canceled':
      return '❌';
    case 'Accepted':
    default:
      return '';
  }
};

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  value,
  mode,
  status = undefined,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {status && status !== 'Accepted' && <Text>{getStatusLabel(status)}</Text>}
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
    flex: 1,
    padding: unit(5),
    justifyContent: 'space-between',
  },
  leftContainer: {
    alignSelf: 'flex-start',
    width: width * 0.55,
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: unit(90),
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
    fontSize: unit(13),
    alignSelf: 'flex-start',
  },
  subtitle: {
    ...theme.small,
    ...theme.secondary,
    marginBottom: unit(5),
    fontSize: unit(11),
  },
  pending: {
    backgroundColor: palette.orange,
  },
  approved: {
    ...theme.small,
    ...theme.accepted,
  },
  rejected: {
    backgroundColor: palette.raspberry,
  },
  badge: {
    borderRadius: unit(20),
    width: unit(70),
    height: unit(18),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: 'white',
    ...theme.tiny,
  },
});

export default ListItem;
