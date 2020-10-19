import { useNavigation } from '@react-navigation/native';
import Icon from 'components/icon/Icon';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon family="MaterialIcon" name="arrow-back-ios" />
    </TouchableOpacity>
  );
};

export default BackButton;
