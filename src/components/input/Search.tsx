import Icon from 'components/icon/Icon';
import React from 'react';
import { StyleSheet, TextInputProps, View, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { unit } from 'utils/responsive';
import { theme } from 'utils/styles';

interface SearchProps {
  placeholder: string;
  style: ViewStyle;
}

const Search: React.FC<SearchProps & TextInputProps> = ({
  placeholder,
  style,
  ...props
}) => {
  const containerStyles: any[] = [styles.container];
  return (
    <View style={[containerStyles, style]}>
      <Icon family="Fontisto" name="search" style={styles.icon} />
      <TextInput
        {...props}
        style={styles.input}
        numberOfLines={1}
        placeholder={placeholder}
        placeholderTextColor={theme.secondary.color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...theme.disabledSurface,
    height: unit(30),
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

export default Search;
