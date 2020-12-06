import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as routes from 'utils/routes';
import TransferListScreen from './TransferListScreen';
import ContactFormScreen from './ContactFormScreen';
import SelectCardScreen from './SelectCardScreen';
import TransferFormScreen from './TransferFormScreen';
import SelectDocumentScreen from './SelectDocumentScreen';

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
    <TransferStack.Screen
      name={routes.SELECT_CARD_SCREEN}
      component={SelectCardScreen}
    />
    <TransferStack.Screen
      name={routes.TRANSFER_FORM_SCREEN}
      component={TransferFormScreen}
    />
    <TransferStack.Screen
      name={routes.SELECT_DOCUMENT_TYPE_SCREEN}
      component={SelectDocumentScreen}
    />
  </TransferStack.Navigator>
);

export default TransferNavigation;
