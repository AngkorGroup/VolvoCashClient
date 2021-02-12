import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface ButtonProps {
  onPress?(): void;
  title: string;
  style?: ViewStyle;
  loading?: boolean;
  danger?: boolean;
  disabled?: boolean;
  small?: boolean;
  icon?: JSX.Element;
  textStyle?: TextStyle | Array<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  style,
  loading,
  disabled,
  icon,
  danger,
  small,
  textStyle,
}) => {
  const buttonStyle = [styles.container, style];
  const buttonTextStyle = [styles.buttonText] as any[];
  if (loading || disabled) {
    buttonStyle.push(theme.disabledSurface);
    buttonTextStyle.push(theme.secondary);
  }
  if (danger) {
    buttonTextStyle.push(theme.red);
  }
  if (icon) {
    buttonStyle.push(styles.containerWithIcon);
    buttonTextStyle.push(styles.textWithIcon);
  }
  if (small) {
    buttonStyle.push(styles.containerSmall);
    buttonTextStyle.push(styles.textSmall);
  }
  if (textStyle) {
    buttonTextStyle.push(textStyle);
  }
  return (
    <TouchableOpacity
      activeOpacity={theme.opacity}
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
  containerSmall: {
    width: unit(90),
    height: unit(18),
  },
  textSmall: {
    fontSize: theme.small.fontSize,
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
