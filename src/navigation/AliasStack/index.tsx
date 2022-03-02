import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {
  AliasChoose,
  AliasGame,
  AliasHome,
  AliasResults,
  AliasSettings,
  AliasStart,
  AliasTeams,
} from '@screens';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

export const AliasStack: React.FC = () => {
  const navigation: any = useNavigation();

  const handleGoBack = () => navigation.goBack();

  const screenOptions: StackNavigationOptions = {
    headerTitleStyle: styles.headerTitleStyle,
    headerStyle: styles.headerStyle,
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
        name={Screens.aliasHome}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
        component={AliasHome}
      />
      <Stack.Screen
        name={Screens.aliasChoose}
        options={{
          title: 'Choose game',
        }}
        component={AliasChoose}
      />
      <Stack.Screen
        name={Screens.aliasTeams}
        options={{
          title: 'Teams',
        }}
        component={AliasTeams}
      />
      <Stack.Screen
        name={Screens.aliasSettings}
        options={{
          title: 'Game settings',
        }}
        component={AliasSettings}
      />
      <Stack.Screen
        name={Screens.aliasStart}
        options={{
          headerShown: false,
        }}
        component={AliasStart}
      />
      <Stack.Screen
        name={Screens.aliasGame}
        options={{
          headerShown: false,
        }}
        component={AliasGame}
      />
      <Stack.Screen
        name={Screens.aliasResults}
        options={{
          title: 'Results',
        }}
        component={AliasResults}
      />
    </Stack.Navigator>
  );
};
