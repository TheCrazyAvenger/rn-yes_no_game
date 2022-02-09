import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {AppNavigator} from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from '@store/store';

export const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
};
