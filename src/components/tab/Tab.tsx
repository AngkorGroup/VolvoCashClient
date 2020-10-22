import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface TabProps {
  name: string;
  active: boolean;
  onPress(): void;
}

const Tab: React.FC<TabProps> = ({ name, active, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={theme.opacity}
      onPress={onPress}
      containerStyle={styles.button}
      style={styles.button}>
      <View
        style={[
          styles.container,
          active ? styles.containerActive : styles.containerInactive,
        ]}>
        <Text
          style={[
            styles.text,
            active ? styles.textActive : styles.textInactive,
          ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: unit(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerActive: {
    ...theme.surface,
    borderTopWidth: 2,
    borderTopColor: theme.accent.color,
  },
  containerInactive: {
    ...theme.disabledSurface,
  },
  text: {
    ...theme.tiny,
  },
  textActive: {
    ...theme.accent,
  },
  textInactive: {
    ...theme.secondary,
  },
});

export default Tab;
