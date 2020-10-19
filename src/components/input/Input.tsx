import Icon, { IconFamily } from 'components/icon/Icon';
import React from 'react';
import { StyleSheet, TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface InputProps {
  placeholder: string;
  iconFamily: IconFamily;
  iconName: string;
}

const Input: React.FC<InputProps & TextInputProps> = ({
  placeholder,
  iconFamily,
  iconName,
  ...props
}) => {
  const containerStyles: any[] = [styles.container];
  if (props.editable === false) {
    containerStyles.push(theme.disabledSurface);
  }
  return (
    <View style={containerStyles}>
      <Icon family={iconFamily} name={iconName} style={styles.icon} />
      <TextInput
        style={styles.input}
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
});

export default Input;
