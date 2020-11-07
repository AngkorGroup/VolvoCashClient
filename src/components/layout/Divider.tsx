import React from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from 'utils/styles';

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    height: 1.5,
    width: '100%',
    ...theme.disabledSurface,
  },
});

export default Divider;
