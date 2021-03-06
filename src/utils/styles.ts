import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color';
import { unit } from 'utils/responsive';
import { Dimensions } from 'react-native';

export const palette = {
  ocean: '#16A6C9',
  white: '#FFFFFF',
  black: '#000000',
  granite: '#4D4E63',
  slate: '#919296',
  sky: '#BADCE6',
  fog: '#d8d7d5',
  orange: '#DD7610',
  raspberry: '#D84451',
  grass: '#78B833',
};

export const window = Dimensions.get('window');

export const theme = {
  opacity: 0.7,
  shadow: {
    // ios
    shadowOffset: { width: 0, height: 5 },
    shadowColor: Color(palette.black).alpha(0.1).toString(),
    shadowOpacity: unit(30),
    // android
    elevation: 3,
  },
  surface: {
    backgroundColor: palette.white,
  },
  disabledSurface: {
    backgroundColor: Color(palette.fog).alpha(0.5).toString(),
  },
  background: {
    backgroundColor: Color(palette.sky).alpha(0.1).toString(),
  },
  accent: {
    color: palette.ocean,
  },
  accepted: {
    backgroundColor: palette.grass,
  },
  primary: {
    color: palette.granite,
  },
  primaryOverDark: {
    color: palette.white,
  },
  secondary: {
    color: palette.slate,
  },
  red: {
    color: palette.raspberry,
  },
  header1: {
    fontSize: unit(70),
    fontFamily: 'VolvoNovum-Regular',
  },
  header2: {
    fontSize: unit(48),
    fontFamily: 'VolvoNovum-Regular',
  },
  header3: {
    fontSize: unit(28),
    fontFamily: 'VolvoNovum-Regular',
  },
  large: {
    fontSize: unit(24),
    fontFamily: 'VolvoNovum-Medium',
  },
  medium: {
    fontSize: unit(18),
    fontFamily: 'VolvoNovum-Medium',
  },
  mediumLight: {
    fontSize: unit(18),
    fontFamily: 'VolvoNovum-Regular',
  },
  small: {
    fontSize: unit(15),
    fontFamily: 'VolvoNovum-Regular',
  },
  tiny: {
    fontSize: unit(12),
    fontFamily: 'VolvoNovum-Medium',
  },
};

EStyleSheet.build({});
