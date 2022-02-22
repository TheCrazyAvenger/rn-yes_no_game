import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image, View} from 'react-native';

import {H3, H4, H5} from '@Typography';
import {styles} from './styles';
import {colors} from '@constants';

export const CustomDrawer: React.FC = (props: any) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={require('@assets/images/logo.png')}
          />

          <H3 fontWeight="bold" style={styles.profileName}>
            <H3 fontWeight="bold" style={{color: colors.green}}>
              Yes!
            </H3>{' '}
            <H3 fontWeight="bold" style={{color: colors.red}}>
              No!
            </H3>{' '}
            Game
          </H3>
        </View>
        <View style={styles.items}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottom}>
        <H4 style={styles.version} fontWeight="600">
          Version: 0.0.1beta
        </H4>
      </View>
    </View>
  );
};
