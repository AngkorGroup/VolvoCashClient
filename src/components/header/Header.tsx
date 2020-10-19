import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface HeaderProps {
  title: string;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
  alignment?: 'center' | 'left';
}

const JUSTIFY_ALIGNMENT = {
  left: 'flex-start',
  center: 'space-between',
};

const Header: React.FC<HeaderProps> = ({
  title,
  leftButton,
  rightButton,
  alignment = 'left',
}) => (
  <SafeAreaView style={styles.safeContainer} edges={['right', 'top', 'left']}>
    <View
      style={[
        styles.container,
        { justifyContent: JUSTIFY_ALIGNMENT[alignment] as any },
      ]}>
      <View style={styles.iconContainer}>{leftButton}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconContainer}>{rightButton}</View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeContainer: {
    ...theme.surface,
    ...theme.shadow,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    height: unit(60),
    paddingBottom: unit(15),
  },
  iconContainer: {
    width: unit(20),
    height: unit(20),
    marginHorizontal: unit(10),
  },
  title: {
    ...theme.medium,
    ...theme.primary,
  },
});

export default Header;
