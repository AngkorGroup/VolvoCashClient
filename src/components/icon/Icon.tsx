import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ViewStyle } from 'react-native';
import { theme } from 'utils/styles';
import { unit } from 'utils/responsive';

const useIconFamily = (family: IconFamily): any => {
  switch (family) {
    case 'AntDesign':
      return AntDesign;
    case 'Octicons':
      return Octicons;
    case 'Ionicons':
      return Ionicons;
    case 'SimpleLineIcons':
      return SimpleLineIcons;
    case 'FeatherIcons':
      return FeatherIcons;
    case 'MaterialIcon':
      return MaterialIcon;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    case 'Entypo':
      return Entypo;
    case 'Fontisto':
      return Fontisto;
    default:
      return null;
  }
};

export type IconFamily =
  | 'Octicons'
  | 'Ionicons'
  | 'SimpleLineIcons'
  | 'FeatherIcons'
  | 'MaterialIcon'
  | 'MaterialCommunityIcons'
  | 'Entypo'
  | 'Fontisto'
  | 'AntDesign';

interface IconProps {
  family: IconFamily;
  name: string;
  style?: ViewStyle;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  family,
  name,
  style,
  size = unit(18),
  color = theme.primary.color,
}) => {
  const IconFamilyComponent = useIconFamily(family);
  return (
    <IconFamilyComponent name={name} size={size} style={style} color={color} />
  );
};

export default Icon;
