import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as routes from 'utils/routes';
import PaymentsScreen from './PaymentsScreen';
import TransfersScreen from './TransfersScreen';
import { unit } from 'utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { theme } from 'utils/styles';
import Img from 'react-native-fast-image';
import CardNavigation from './CardNavigation';

const Tab = createBottomTabNavigator();

const AppTabNavigation = () => (
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
        name={routes.TRANSFERS_SCREEN}
        component={TransfersScreen}
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
        component={PaymentsScreen}
        options={{
          tabBarLabel: 'Pagos pendientes',
          tabBarIcon: ({ focused, size }) => (
            <Img
              source={
                focused
                  ? require('assets/images/payment-filled.png')
                  : require('assets/images/payment.png')
              }
              style={{
                width: size * 1.5,
                height: size * 1.5,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  </SafeAreaView>
);

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
  label: { fontFamily: 'VolvoBroadProDigital', fontSize: unit(16) },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    height: unit(50),
    marginVertical: unit(10),
  },
});

export default AppTabNavigation;
