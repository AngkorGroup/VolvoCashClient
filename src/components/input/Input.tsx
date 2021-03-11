import Icon, { IconFamily } from 'components/icon/Icon';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface InputProps {
  placeholder?: string;
  iconFamily?: IconFamily;
  iconName?: string;
  containerStyle?: ViewStyle;
  innerLabel?: string;
  editableStyles?: boolean;
  onPress?: () => void;
}

const Input: React.FC<InputProps & TextInputProps> = ({
  placeholder,
  iconFamily,
  iconName,
  containerStyle,
  innerLabel,
  editableStyles = true,
  onPress,
  ...props
}) => {
  const containerStyles: any[] = [styles.container];
  const inputStyles: any[] = [styles.input];
  if (props.editable === false && editableStyles) {
    containerStyles.push(theme.disabledSurface);
  }
  if (containerStyle) {
    containerStyles.push(containerStyle);
  }
  if (!iconName && !iconFamily && !innerLabel) {
    inputStyles.push(styles.inputMargin);
  }
  return (
    <TouchableWithoutFeedback style={containerStyles} onPress={onPress}>
      {iconFamily && iconName && (
        <Icon family={iconFamily} name={iconName} style={styles.icon} />
      )}
      {innerLabel && <Text style={styles.inputMargin}>{innerLabel}</Text>}
      <View style={styles.wrapper} pointerEvents={onPress ? 'none' : undefined}>
        <TextInput
          style={inputStyles}
          numberOfLines={1}
          placeholder={placeholder}
          placeholderTextColor={theme.secondary.color}
          pointerEvents={onPress ? 'none' : undefined}
          {...props}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.surface,
    ...theme.shadow,
    height: unit(30),
    width: unit(200),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: unit(30),
  },
  icon: {
    marginHorizontal: unit(10),
  },
  input: {
    flex: 1,
    height: unit(30),
    padding: 0,
    ...theme.small,
    ...theme.primary,
  },
  inputMargin: {
    marginHorizontal: unit(10),
  },
  wrapper: {
    flex: 1,
  },
});

export default Input;
