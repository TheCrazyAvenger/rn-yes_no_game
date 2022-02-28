import {H1, H4} from '@Typography';
import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {styles} from './styles';

export const AliasScreen: React.FC = () => {
  return (
    <ImageBackground
      blurRadius={20}
      source={require('@assets/images/alias-logo.jpg')}
      style={styles.container}>
      <TouchableRipple
        onPress={() => {}}
        rippleColor="rgba(255, 255, 255, .32)"
        style={styles.content}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('@assets/images/alias-logo.jpg')}
            style={styles.logo}
          />
          <H1 fontWeight="bold" style={styles.text}>
            Alias
          </H1>
          <H4 fontWeight="bold" style={styles.text}>
            Click to play!
          </H4>
        </View>
      </TouchableRipple>
    </ImageBackground>
  );
};
