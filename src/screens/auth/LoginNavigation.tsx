import React from 'react';
import PhoneScreen from 'screens/auth/PhoneScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/auth/LoginScreen';
import * as routes from 'utils/routes';
import SmsScreen from 'screens/auth/SmsScreen';

const LoginStack = createStackNavigator();

const LoginNavigation = () => (
  <LoginStack.Navigator headerMode="none">
    <LoginStack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
    <LoginStack.Screen name={routes.PHONE_SCREEN} component={PhoneScreen} />
    <LoginStack.Screen name={routes.SMS_SCREEN} component={SmsScreen} />
  </LoginStack.Navigator>
);

export default LoginNavigation;
