import Icon, { IconFamily } from 'components/icon/Icon';
import React from 'react';
import { StyleSheet, TextInputProps, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface InputProps {
  placeholder: string;
  iconFamily?: IconFamily;
  iconName?: string;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps & TextInputProps> = ({
  placeholder,
  iconFamily,
  iconName,
  containerStyle,
  ...props
}) => {
  const containerStyles: any[] = [styles.container];
  const inputStyles: any[] = [styles.input];
  if (props.editable === false) {
    containerStyles.push(theme.disabledSurface);
  }
  if (containerStyle) {
    containerStyles.push(containerStyle);
  }
  if (!iconName && !iconFamily) {
    inputStyles.push(styles.inputMargin);
  }
  return (
    <View style={containerStyles}>
      {iconFamily && iconName && (
        <Icon family={iconFamily} name={iconName} style={styles.icon} />
      )}
      <TextInput
        style={inputStyles}
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor={theme.secondary.color}
        {...props}
      />
    </View>
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
});

export default Input;
