import React, {useState} from 'react';

import {ProfileItemHeader} from '@components';
import {ProfileEditForm} from '../../../forms';
import {Loading, Screen, Success} from '@ui';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useEditUserMutation} from '@api';
import {H5} from '@Typography';
import {styles} from './styles';
import {editUserProfile} from '@store/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IMAGES_URL} from '@env';
import {colors} from '@constants';

export const ProfileEditScreen: React.FC = () => {
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();
  const {id, token, image: profileImage} = useAppSelector(state => state.user);

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

      await editUser({formData, token}).unwrap();
      await dispatch(
        editUserProfile({
          email,
          name,
          image: image ? image.uri : `${IMAGES_URL}${profileImage}`,
        }),
      );
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem(
        'image',
        image ? image.uri : `${IMAGES_URL}${profileImage}`,
      );

      setIsSuccess(true);
      setTimeout(() => {
        navigation.pop();
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
      <Screen style={styles.container} type="ScrollView">
        <ProfileItemHeader
          title="Edit profile"
          description="Here you can change the name, email and avatar of your profile."
          titleColor={colors.red}
        />

        {errorMessage && <H5 style={styles.error}>{errorMessage}</H5>}
        <ProfileEditForm onSubmit={editHandler} />
      </Screen>
    </>
  );
};
