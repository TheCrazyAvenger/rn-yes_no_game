import {useSubmitStoryMutation} from '@api';
import {ProfileItemHeader} from '@components';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {H5} from '@Typography';
import {Loading, Screen, Success} from '@ui';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import {SubmitStoryForm} from '../../forms';
import {styles} from './styles';

export const SubmitStoryScreen: React.FC = () => {
  const token = useAppSelector(state => state.user.token);
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  const [submitStory, {isLoading}] = useSubmitStoryMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submitHandler = async (values: any) => {
    try {
      setErrorMessage(null);

      const {title, story, answer, image} = values;
      const date = new Date().toLocaleString();

      const formData = new FormData();

      formData.append('title', title.trim());
      formData.append('story', story.trim());
      formData.append('answer', answer.trim());
      formData.append('date', date);

      image &&
        formData.append('image', {
          name: image.fileName,
          type: image.type,
          uri:
            Platform.OS === 'ios'
              ? image.uri.replace('file://', '')
              : image.uri,
        });

      await submitStory({formData, token}).unwrap();

      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
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
      <Screen style={{...styles.container, backgroundColor}} type="ScrollView">
        <ProfileItemHeader
          showCloseButton={false}
          title="Submit a story"
          titleColor={colors.blue}
          description="Here you can create your own story, which will later be verified and be able to get into the application"
        />
        {errorMessage && <H5 style={styles.error}>{errorMessage}</H5>}
        <SubmitStoryForm onSubmit={submitHandler} />
      </Screen>
    </>
  );
};
