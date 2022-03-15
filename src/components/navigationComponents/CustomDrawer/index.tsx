import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image, View} from 'react-native';

import {H3} from '@Typography';
import {styles} from './styles';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';

export const CustomDrawer: React.FC = (props: any) => {
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const color = darkTheme ? colors.white : colors.black;
  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={require('@assets/images/main-logo.jpg')}
          />

          <H3 fontWeight="bold" style={{...styles.profileName, color}}>
            Board Games
          </H3>
        </View>
        <View style={{...styles.items, backgroundColor}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
