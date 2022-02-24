import {useSubmitStoryMutation} from '@api';
import {ProfileItemHeader} from '@components';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {H5} from '@Typography';
import {Loading, Screen, Success} from '@ui';
import {t} from 'i18next';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import {SubmitStoryForm} from '../../forms';
import {styles} from './styles';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export const SubmitStoryScreen: React.FC = () => {
  const token = useAppSelector(state => state.user.token);
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  const [submitStory] = useSubmitStoryMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitHandler = async (values: any) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const {title, story, answer, image} = values;
      const date = new Date().toLocaleString();

      const data = {title, story, answer, date};

      await auth().signInAnonymously();
      await storage().ref(`stories/story ${title}`).putFile(image.uri);

      await submitStory({data, token}).unwrap();

      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
    } catch (e: any) {
      setIsLoading(false);
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
      <Screen style={{...styles.container, backgroundColor}} type="ScrollView">
        <ProfileItemHeader
          showCloseButton={false}
          title={t('navigation:submitStory')}
          titleColor={colors.blue}
          description={t('submitStory:submitText')}
        />
        {errorMessage && <H5 style={styles.error}>{errorMessage}</H5>}
        <SubmitStoryForm onSubmit={submitHandler} />
      </Screen>
    </>
  );
};
