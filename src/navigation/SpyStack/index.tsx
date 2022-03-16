import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {SpyHome} from '@screens';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

export const SpyStack: React.FC = () => {
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
        name={Screens.spyHome}
        options={{
          headerShown: false,
          animationEnabled: false,
        }}
        component={SpyHome}
      />
    </Stack.Navigator>
  );
};
