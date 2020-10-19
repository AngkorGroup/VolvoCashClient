import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Use iPhone6 as base size which is 375 x 667
// This is the size used in the figma mockups
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const unit = (size: number) => {
  const newSize = Math.ceil(size * scale);
  if (Platform.OS === 'ios') {
    return newSize + 2;
  }
  return newSize;
};
