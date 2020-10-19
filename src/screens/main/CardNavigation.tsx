import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as routes from 'utils/routes';
import CardListScreen from './CardListScreen';
import CardDetailScreen from './CardDetailScreen';

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
  </CardStack.Navigator>
);

export default CardNavigation;
