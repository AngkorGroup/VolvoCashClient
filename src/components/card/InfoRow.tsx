import React from 'react';
import { StyleSheet, Text, View, TextStyle } from 'react-native';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface InfoRowProps {
  label: string;
  value: string;
  textStyle?: TextStyle;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, textStyle }) => {
  const labelStyles = [styles.label];
  const valueStyles = [styles.value];
  if (textStyle) {
    labelStyles.push(textStyle);
    valueStyles.push(textStyle);
  }
  return (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label} :</Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={valueStyles}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    textAlign: 'right',
    ...theme.primary,
    ...theme.small,
    fontWeight: '700',
  },
  value: {
    ...theme.primary,
    ...theme.surface,
  },
  row: {
    flexDirection: 'row',
    marginVertical: unit(10),
  },
  labelContainer: {
    marginRight: unit(10),
    flex: 4.5,
  },
  valueContainer: {
    flex: 5,
  },
});

export default InfoRow;
