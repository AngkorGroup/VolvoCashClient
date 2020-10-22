import { useNavigation } from '@react-navigation/native';
import Icon from 'components/icon/Icon';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const CloseButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon family="MaterialIcon" name="close" />
    </TouchableOpacity>
  );
};

export default CloseButton;
