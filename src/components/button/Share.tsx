import Icon from 'components/icon/Icon';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface ShareProps {
  onPress?(): void;
}

const Share: React.FC<ShareProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={theme.opacity}
      style={styles.container}
      onPress={onPress}>
      <Icon family="AntDesign" name="sharealt" style={styles.icon} />
      <Text style={styles.buttonText}>Compartir</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonText: {
    ...theme.accent,
    ...theme.medium,
  },
  icon: {
    marginRight: unit(10),
  },
});

export default Share;
