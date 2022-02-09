import {useLoginMutation} from '@api';
import {useNavigation} from '@react-navigation/native';
import {H5} from '@Typography';
import {CloseButton, Loading, Success} from '@ui';
import React, {useState} from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {LoginForm} from '../../../forms';
import {styles} from './styles';

export const LoginScreen: React.FC = () => {
  const navigation: any = useNavigation();

  const [login, {isLoading, error, data, isSuccess}]: any = useLoginMutation();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const goBackHandler = () => navigation.goBack();

  const loginHandler = async (values: {email: string; password: string}) => {
    setErrorMessage(null);

    try {
      await login(values);

      if (isSuccess) {
        setSuccess(true);

        setTimeout(() => {
          setSuccess(false);
        }, 1500);
      } else {
        setErrorMessage(error.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isLoading && (
        <Loading
          isActive={isLoading}
          style={{zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
        />
      )}
      {success && !error && <Success isActive={success && !error} />}
      <ImageBackground
        style={styles.container}
        source={require('@assets/images/authbg.jpg')}>
        <View style={styles.form}>
          <Image
            style={styles.image}
            source={require('@assets/images/logo.png')}
          />
          {errorMessage && <H5 style={styles.error}>{errorMessage}</H5>}
          <LoginForm onSubmit={loginHandler} />
          <CloseButton style={styles.closeButton} onPress={goBackHandler} />
        </View>
      </ImageBackground>
    </>
  );
};
