import React from 'react';
import LoginNavigation from 'screens/auth/LoginNavigation';
import MainNavigation from 'screens/main/MainNavigation';
import * as routes from 'utils/routes';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { selectAuthToken } from 'utils/redux/auth/auth-reducer';
import ConfirmationModal from 'screens/modals/ConfirmationModal';
import SuccessModal from 'screens/modals/SuccessModal';
import { developmentApi } from 'utils/api';
import TransferSuccessModal from 'screens/modals/TransferSuccessModal';

const RootStack = createStackNavigator();

// TODO: change AuthLoading name
// maybe RootStack or ModalStack (?)
const AuthLoading = () => {
  const authToken = useSelector(selectAuthToken);

  if (authToken) {
    developmentApi.setHeader('Authorization', `Bearer ${authToken}`);
  }
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      {!authToken ? (
        <RootStack.Screen
          name={routes.LOGIN_STACK}
          component={LoginNavigation}
        />
      ) : (
        <>
          <RootStack.Screen name={routes.APP_TAB} component={MainNavigation} />
          <RootStack.Screen
            name={routes.CONFIRMATION_MODAL}
            component={ConfirmationModal}
          />
          <RootStack.Screen
            name={routes.SUCCESS_MODAL}
            component={SuccessModal}
          />
          <RootStack.Screen
            name={routes.TRANSFER_SUCCESS_MODAL}
            component={TransferSuccessModal}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default AuthLoading;
