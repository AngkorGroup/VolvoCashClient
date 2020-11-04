import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as routes from 'utils/routes';
import TransferListScreen from './TransferListScreen';
import ContactFormScreen from './ContactFormScreen';

const TransferStack = createStackNavigator();

const TransferNavigation = () => (
  <TransferStack.Navigator headerMode="none">
    <TransferStack.Screen
      name={routes.TRANSFERS_SCREEN}
      component={TransferListScreen}
    />
    <TransferStack.Screen
      name={routes.CONTACT_FORM_SCREEN}
      component={ContactFormScreen}
    />
  </TransferStack.Navigator>
);

export default TransferNavigation;
