import React from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks';
import {styles} from './styles';
import {H1, H4} from '@Typography';
import {IconButton} from '@ui';
import {colors} from '@constants';
import {logout} from '@store/asyncFuncs';

export const ProfileScreen: React.FC = () => {
  const {name, email, image} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const logoutHandler = () => dispatch(logout());

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        style={styles.container}
        source={require('@assets/images/authbg.jpg')}>
        <View style={styles.header}>
          <View style={styles.userHeader}>
            <Image style={styles.image} source={{uri: image!}} />
            <View style={styles.user}>
              <H1 style={styles.title} fontWeight="bold">
                {name}
              </H1>
              <H4 style={styles.title}>{email}</H4>
            </View>
          </View>
          <IconButton
            name="exit"
            onPress={logoutHandler}
            color={colors.white}
            size={30}
            style={styles.logoutButton}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
