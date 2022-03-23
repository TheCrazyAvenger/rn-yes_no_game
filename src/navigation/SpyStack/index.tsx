import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {
  SpyAdditional,
  SpyGame,
  SpyHome,
  SpyLocations,
  SpySettings,
  SpyStart,
} from '@screens';
import {colors, Screens} from '@constants';
import {styles} from './styles';

const Stack = createStackNavigator();

export const SpyStack: React.FC = () => {
  const navigation: any = useNavigation();

  const handleGoBack = () => navigation.goBack();

  const screenOptions: StackNavigationOptions = {
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
    headerShown: false,
    headerLeft: () => (
      <Icon
        name="arrow-back"
        size={25}
        onPress={handleGoBack}
        style={styles.leftIcon}
        color={colors.white}
      />
    ),
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Screens.spyHome}
        options={{animationEnabled: false}}
        component={SpyHome}
      />
      <Stack.Screen name={Screens.spySettings} component={SpySettings} />
      <Stack.Screen name={Screens.spyAdditional} component={SpyAdditional} />
      <Stack.Screen name={Screens.spyLocations} component={SpyLocations} />
      <Stack.Screen
        name={Screens.spyStart}
        options={{animationEnabled: false}}
        component={SpyStart}
      />
      <Stack.Screen
        name={Screens.spyGame}
        options={{animationEnabled: false}}
        component={SpyGame}
      />
    </Stack.Navigator>
  );
};
