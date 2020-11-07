import Alert from 'components/alert/Alert';
import Icon from 'components/icon/Icon';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from 'utils/redux/actions';

const ExitButton = () => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setAlert(true)}>
        <Icon family="Ionicons" name="exit-outline" />
      </TouchableOpacity>
      <Alert
        visible={alert}
        title="¿Está seguro que desea salir?"
        confirmText="Si"
        cancelText="No"
        onCancel={() => setAlert(false)}
        onConfirm={() => {
          setAlert(false);
          dispatch(logOut());
        }}
      />
    </>
  );
};

export default ExitButton;
