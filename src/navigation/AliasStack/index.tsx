import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {
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
        name={Screens.aliasHome}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
        component={AliasHome}
      />
      <Stack.Screen name={Screens.aliasTeams} component={AliasTeams} />
      <Stack.Screen name={Screens.aliasSettings} component={AliasSettings} />
      <Stack.Screen name={Screens.aliasStart} component={AliasStart} />
      <Stack.Screen name={Screens.aliasGame} component={AliasGame} />
      <Stack.Screen name={Screens.aliasResults} component={AliasResults} />
    </Stack.Navigator>
  );
};
