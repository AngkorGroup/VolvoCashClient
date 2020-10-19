import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import ReactNativeSplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'utils/redux/config-store';
import { navigationRef } from 'utils/navigation';
import AuthLoading from 'screens/auth/AuthLoading';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Sending onAnimatedValueUpdate']);

const App = () => {
  useEffect(() => {
    ReactNativeSplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <AuthLoading />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
