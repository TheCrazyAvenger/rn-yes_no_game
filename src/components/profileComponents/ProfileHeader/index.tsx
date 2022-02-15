import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {useAppSelector} from '@hooks';

import {IMAGES_URL} from '@env';
import {H1, H4} from '@Typography';
import {styles} from './styles';

export const ProfileHeader: React.FC = () => {
  const {name, email, image} = useAppSelector(state => state.user);

  return (
    <ImageBackground
      style={styles.container}
      source={require('@assets/images/authbg.jpg')}>
      <View style={styles.header}>
        <Image style={styles.image} source={{uri: `${IMAGES_URL}${image}`}} />
        <View style={styles.user}>
          <H1 style={styles.title} fontWeight="bold">
            {name}
          </H1>
          <H4 style={styles.title}>{email}</H4>
        </View>
      </View>
    </ImageBackground>
  );
};
