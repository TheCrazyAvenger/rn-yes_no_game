import React from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '@hooks';

import {H1, H4} from '@Typography';
import {styles} from './styles';
import {IconButton} from '@ui';
import {bg, colors} from '@constants';
import {logout} from '@store/asyncFuncs';

type ProfileHeaderProps = {
  isEdit?: boolean;
  onSubmit?: (...args: any) => any;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  isEdit = false,
  onSubmit,
}) => {
  const {name, email, image}: any = useAppSelector(state => state.user);
  const background = useAppSelector(state => state.user.bg);

  const dispatch = useAppDispatch();
  const logoutHandler = () => dispatch(logout());

  return (
    <ImageBackground style={styles.container} source={bg[background]}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image style={styles.image} source={{uri: image}} />
          <View style={styles.user}>
            <H1 style={styles.title} fontWeight="bold">
              {name}
            </H1>
            <H4 style={styles.title}>{email}</H4>
          </View>
        </View>
        {isEdit ? (
          <IconButton
            color={colors.white}
            style={{...styles.logout, backgroundColor: colors.green}}
            size={28}
            name="checkmark-outline"
            onPress={onSubmit}
          />
        ) : (
          <IconButton
            color={colors.white}
            style={styles.logout}
            size={28}
            name="log-out-outline"
            onPress={logoutHandler}
          />
        )}
      </View>
    </ImageBackground>
  );
};
