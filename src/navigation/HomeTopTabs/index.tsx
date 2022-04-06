import React, {useEffect, useRef} from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import {IMAGES_URL} from '@env';
import {colors, Screens} from '@constants';
import {AliasScreen, SpyScreen, YesNoScreen} from '@screens';
import {useAppSelector} from '@hooks';
import {Animated, Image, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export const HomeTopTabs: React.FC = () => {
  const navigation: any = useNavigation();
  const insets = useSafeAreaInsets();
  const {darkTheme, image} = useAppSelector(state => state.user);

  const backgroundColor = darkTheme ? colors.dark : colors.white;

  const handleOpenMenu = () =>
    navigation.navigate(Screens.menuStack, {screen: Screens.profileModal});

  const screenOptions: MaterialTopTabNavigationOptions = {
    tabBarStyle: {height: 0},
  };

  return (
    <>
      <View style={{...styles.container, backgroundColor}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: insets.top + 20,
            left: 10,
            zIndex: 1,
          }}
          onPress={handleOpenMenu}>
          <Image
            source={{uri: `${IMAGES_URL}${image}`}}
            style={styles.leftIcon}
          />
        </TouchableOpacity>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name={Screens.yesNoScreen} component={YesNoScreen} />
          <Tab.Screen name={Screens.aliasScreen} component={AliasScreen} />
          <Tab.Screen name={Screens.spyScreen} component={SpyScreen} />
        </Tab.Navigator>
      </View>
    </>
  );
};
