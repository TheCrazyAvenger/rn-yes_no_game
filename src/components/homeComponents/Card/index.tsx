import {H1, H3} from '@Typography';
import React from 'react';
import {ImageBackground, View} from 'react-native';
import {styles} from './styles';

export const Card: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.image}
          source={require('@assets/images/yesno/1.jpg')}>
          <H1 style={styles.headerTitle} fontWeight="bold">
            Drowned
          </H1>
        </ImageBackground>
      </View>
      <View style={styles.text}>
        <H3 fontWeight="600">
          After George tries to hug a person, he dies by drowning.
        </H3>
      </View>
    </View>
  );
};
