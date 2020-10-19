import React from 'react';
import { View } from 'react-native';

interface SpacingProps {
  size: number;
}

const Spacing: React.FC<SpacingProps> = ({ size }) => (
  <View style={{ height: size, width: size }} />
);

export default Spacing;
