import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as routes from 'utils/routes';
import CardListScreen from './CardListScreen';
import CardDetailScreen from './CardDetailScreen';
import QrScreen from './QrScreen';
import MovementDetailScreen from './MovementDetailScreen';

const CardStack = createStackNavigator();

const CardNavigation = () => (
  <CardStack.Navigator headerMode="none">
    <CardStack.Screen
      name={routes.CARD_LIST_SCREEN}
      component={CardListScreen}
    />
    <CardStack.Screen
      name={routes.CARD_DETAIL_SCREEN}
      component={CardDetailScreen}
    />
    <CardStack.Screen name={routes.QR_SCREEN} component={QrScreen} />
    <CardStack.Screen
      name={routes.MOVEMENT_DETAIL_SCREEN}
      component={MovementDetailScreen}
    />
  </CardStack.Navigator>
);

export default CardNavigation;
