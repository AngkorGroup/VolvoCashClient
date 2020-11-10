import React, { useEffect } from 'react';
import LoginNavigation from 'screens/auth/LoginNavigation';
import MainNavigation from 'screens/main/MainNavigation';
import * as routes from 'utils/routes';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken, setPushToken } from 'utils/redux/auth/auth-reducer';
import { setChargeId } from 'utils/redux/services/charge-detail-actions';
import ConfirmationModal from 'screens/modals/ConfirmationModal';
import SuccessModal from 'screens/modals/SuccessModal';
import { developmentApi } from 'utils/api';
import TransferSuccessModal from 'screens/modals/TransferSuccessModal';
import OneSignal from 'react-native-onesignal';
import { PUSH_TOKEN } from '@env';
import { navigate } from 'utils/navigation';

const RootStack = createStackNavigator();

// TODO: change AuthLoading name
// maybe RootStack or ModalStack (?)
const AuthLoading = () => {
  const authToken = useSelector(selectAuthToken);
  const dispatch = useDispatch();

  useEffect(() => {
    OneSignal.init(PUSH_TOKEN);
    console.log('PUSH_TOKEN: ', PUSH_TOKEN);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    return () => {
      OneSignal.removeEventListener('opened', onReceived);
      OneSignal.removeEventListener('ids', onOpened);
      OneSignal.removeEventListener('received', onIds);
    };
  }, []);

  function onOpened(notification: any) {
    const push = notification.payload?.additionalData;
    // TODO: redirect to confirmation screen
    console.log('onOpened', push);
  }

  function onIds(device: any) {
    console.log('device.userId: ', device.userId);
    dispatch(setPushToken(device.userId));
  }

  function onReceived(notification: any) {
    console.log('notification: ', notification);
    const { chargeId } = notification?.payload?.additionalData || {};
    if (chargeId) {
      dispatch(setChargeId(chargeId));
      navigate(routes.CONFIRMATION_MODAL);
    }
  }

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
