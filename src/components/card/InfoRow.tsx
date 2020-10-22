import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    ...theme.secondary,
    ...theme.small,
  },
  value: {
    ...theme.primary,
    ...theme.mediumLight,
  },
  row: {
    flexDirection: 'row',
    marginVertical: unit(10),
  },
  labelContainer: {
    flex: 4.5,
  },
  valueContainer: {
    flex: 5,
  },
});

export default InfoRow;
