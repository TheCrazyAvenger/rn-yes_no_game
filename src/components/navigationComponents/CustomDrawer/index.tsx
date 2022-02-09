import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {H3} from '@Typography';
import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {styles} from './styles';

export const CustomDrawer: React.FC = (props: any) => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainer}>
        <ImageBackground
          source={require('@assets/images/bg.jpg')}
          style={styles.header}>
          <Image
            style={styles.profileImage}
            source={require('@assets/images/no-photo.jpg')}
          />
          <H3 fontWeight="600" style={styles.profileName}>
            Sign In
          </H3>
        </ImageBackground>
        <View style={styles.items}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
