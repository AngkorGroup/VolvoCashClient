import { useNavigation } from '@react-navigation/native';
import Icon from 'components/icon/Icon';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface CloseButton {
  onClose?(): void;
}

const CloseButton: React.FC<CloseButton> = ({ onClose }) => {
  const navigation = useNavigation();
  const defaultOnPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={onClose || defaultOnPress}>
      <Icon family="MaterialIcon" name="close" />
    </TouchableOpacity>
  );
};

export default CloseButton;
