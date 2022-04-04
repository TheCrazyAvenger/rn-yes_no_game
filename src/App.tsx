import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as RNLocalize from 'react-native-localize';
import i18next from 'i18next';
import 'react-native-gesture-handler';

import {AppNavigator} from './navigation/AppNavigator';
import {store} from '@store/store';
import {setLanguage} from './utilities/setLanguage';
import './constants/DCSLocalize';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation',
]);

export const App: React.FC = () => {
  useEffect(() => {
    const language = RNLocalize.getLocales()[0].languageCode;
    i18next.changeLanguage(setLanguage(language));
  }, [RNLocalize.getLocales()[0].languageCode]);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};
