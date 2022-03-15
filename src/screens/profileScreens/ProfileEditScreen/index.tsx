import React, {useEffect, useRef, useState} from 'react';

import {ProfileItemHeader} from '@components';
import {ProfileEditForm} from '../../../forms';
import {Loading, Screen, Success} from '@ui';
import {Animated, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useEditUserMutation} from '@api';
import {H5} from '@Typography';
import {styles} from './styles';
import {editUserProfile} from '@store/slices/userSlice';
import {colors} from '@constants';
import {t} from 'i18next';

type ProfileProps = {
  closeWindow: (...ars: any) => any;
};

export const ProfileEditScreen: React.FC<ProfileProps> = ({closeWindow}) => {
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();
  const {id, token, image: profileImage} = useAppSelector(state => state.user);
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  const [editUser, {isLoading}] = useEditUserMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const editHandler = async (values: any) => {
    try {
      setErrorMessage(null);

      const {email, name, image} = values;

      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('id', id);
      image &&
        formData.append('image', {
          name: image.fileName,
          type: image.type,
          uri:
            Platform.OS === 'ios'
              ? image.uri.replace('file://', '')
              : image.uri,
        });

      const response: any = await editUser({formData, token}).unwrap();

      const userImage = await response.user.image;
      await dispatch(
        editUserProfile({
          email,
          name,
          image: image ? userImage : profileImage,
        }),
      );

      setIsSuccess(true);
      setTimeout(() => {
        closeWindow();
      }, 1500);
    } catch (e: any) {
      setErrorMessage(e.data.message);
    }
  };

  return (
    <>
      {isLoading && (
        <Loading
          style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
          isActive={isLoading}
        />
      )}
      {isSuccess && <Success isActive={isSuccess} />}
      <Animated.View style={{flex: 1, transform: [{scale}]}}>
        <Screen
          style={{...styles.container, backgroundColor}}
          type="ScrollView">
          <ProfileItemHeader
            showCloseButton={false}
            title={t('profile:editTitle')}
            description={t('profile:editText')}
            titleColor={colors.blue}
          />

          {errorMessage && <H5 style={styles.error}>{errorMessage}</H5>}
          <ProfileEditForm onSubmit={editHandler} />
        </Screen>
      </Animated.View>
    </>
  );
};
