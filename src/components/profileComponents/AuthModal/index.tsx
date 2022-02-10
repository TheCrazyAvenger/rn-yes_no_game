import React from 'react';
import {BlurView} from '@react-native-community/blur';
import {Image, View} from 'react-native';
import {H1, H3} from '@Typography';
import {Button} from '@ui';
import {colors} from '@constants';
import {styles} from './styles';

export const AuthModal: React.FC = () => {
  return (
    <View style={styles.auth}>
      <BlurView style={styles.absolute} blurType="light" blurAmount={1} />

      <View style={styles.authInfo}>
        <H1 fontWeight="600" style={styles.authTitle}>
          You're not logged in
        </H1>
        <View style={styles.row}>
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
            }}
            source={require('@assets/images/logo.png')}
          />
          <H3 fontWeight="600" style={styles.authText}>
            Sign in to rate stories, submit stories, earn achievements, and
            more...
          </H3>
        </View>
        <View style={styles.authButtons}>
          <Button
            onPress={() => {}}
            style={{...styles.authButton, backgroundColor: colors.white}}
            textStyle={{color: colors.blue}}
            title="Sign In"
          />
          <Button
            onPress={() => {}}
            style={styles.authButton}
            title="Sign Up"
          />
        </View>
      </View>
    </View>
  );
};
