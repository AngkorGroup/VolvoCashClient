import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  View,
} from 'react-native';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface ButtonProps {
  onPress(): void;
  title: string;
  style?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
  icon?: JSX.Element;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  style,
  loading,
  disabled,
  icon,
}) => {
  const buttonStyle = [styles.container, style];
  const buttonTextStyle = [styles.buttonText] as any[];
  if (loading || disabled) {
    buttonStyle.push(theme.disabledSurface);
    buttonTextStyle.push(theme.secondary);
  }
  if (icon) {
    buttonStyle.push(styles.containerWithIcon);
    buttonTextStyle.push(styles.textWithIcon);
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      disabled={disabled || loading}>
      <View style={styles.textContainer}>
        <Text style={buttonTextStyle} numberOfLines={icon ? 2 : 1}>
          {loading ? 'Cargando' : title}
        </Text>
      </View>
      {!!icon && <View style={{ marginRight: unit(10) }}>{icon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.surface,
    ...theme.shadow,
    height: unit(40),
    width: unit(200),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: unit(20),
  },
  textContainer: {
    flex: 1,
  },
  containerWithIcon: {
    width: unit(160),
    height: unit(60),
  },
  textWithIcon: {
    fontSize: theme.small.fontSize,
    textAlign: 'left',
    marginLeft: unit(10),
  },
  buttonText: {
    ...theme.accent,
    ...theme.medium,
    textAlign: 'center',
  },
});

export default Button;
