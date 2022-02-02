import React from 'react';
import 'react-native-gesture-handler';
import {AppNavigator} from '@navigation/AppNavigator';
import {Provider} from 'react-redux';
import {store} from '@store/store';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};
