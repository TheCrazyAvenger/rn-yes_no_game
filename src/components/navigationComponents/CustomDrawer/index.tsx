import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image, View} from 'react-native';

import {H3, H5} from '@Typography';
import {styles} from './styles';

export const CustomDrawer: React.FC = (props: any) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={require('@assets/images/logo.png')}
          />
          <View style={styles.contentContainer}>
            <H3 fontWeight="bold" style={styles.profileName}>
              Yes! No! Game
            </H3>
            <H5 fontWeight="600">The game you can't say No to!</H5>
          </View>
        </View>
        <View style={styles.items}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
