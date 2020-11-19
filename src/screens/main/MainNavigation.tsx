import React, { useEffect, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as routes from 'utils/routes';
import ChargeListScreen from './ChargeListScreen';
import { unit } from 'utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { theme } from 'utils/styles';
import Img from 'react-native-fast-image';
import CardNavigation from './CardNavigation';
import TransferNavigation from './TransferNavigation';
import {
  selectChargeList
} from 'utils/redux/ui/charge-list-screen/charge-list-screen-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getChargeListCall } from 'utils/redux/services/charge-list-actions';
import IconWithBadge from '../../components/tab/IconWithBadge';

const Tab = createBottomTabNavigator();


const AppTabNavigation = () => {
  const chargeList = useSelector(selectChargeList);
  const items = chargeList.length;
  const dispatch = useDispatch();

  const refresh = useCallback(() => {
    dispatch(getChargeListCall());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <Tab.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          labelStyle: styles.label,
          style: styles.tabBar,
          tabStyle: styles.tab,
          activeTintColor: theme.accent.color,
          inactiveTintColor: theme.secondary.color,
        }}>
        <Tab.Screen
          name={routes.CARD_STACK}
          component={CardNavigation}
          options={{
            tabBarLabel: 'Tarjetas',
            tabBarIcon: ({ focused, size }) => (
              <Img
                source={
                  focused
                    ? require('assets/images/card-filled.png')
                    : require('assets/images/card.png')
                }
                style={{
                  width: size * 1.5,
                  height: size * 1.5,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name={routes.TRANSFER_STACK}
          component={TransferNavigation}
          options={{
            tabBarLabel: 'Transferencias',
            tabBarIcon: ({ focused, size }) => (
              <Img
                source={
                  focused
                    ? require('assets/images/transfer-filled.png')
                    : require('assets/images/transfer.png')
                }
                style={{
                  width: size * 1.5,
                  height: size * 1.5,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name={routes.PAYMENTS_SCREEN}
          component={ChargeListScreen}
          options={{
            tabBarLabel: 'Pagos pendientes',
            tabBarIcon: ({ focused, size }) => (
              <IconWithBadge name={focused
                ? require('assets/images/payment-filled.png')
                : require('assets/images/payment.png')}
                badgeCount={items}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBar: {
    height: unit(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'VolvoBroadProDigital',
    fontSize: unit(16),
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: unit(50),
    marginVertical: unit(10),
  },
});

export default AppTabNavigation;
