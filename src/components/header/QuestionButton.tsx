import Alert from 'components/alert/Alert';
import Icon from 'components/icon/Icon';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const QuestionButton = () => {
  const [alert, setAlert] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setAlert(true)}>
        <Icon family="AntDesign" name="questioncircleo" />
      </TouchableOpacity>
      <Alert
        visible={alert}
        title="¿Dudas o problemas?"
        message="Envía un correo a soporteO7@angkorperu.com o llama al 984924160"
        confirmText="Aceptar"
        onCancel={() => setAlert(false)}
        onConfirm={() => {
          setAlert(false);
        }}
      />
    </>
  );
};

export default QuestionButton;
