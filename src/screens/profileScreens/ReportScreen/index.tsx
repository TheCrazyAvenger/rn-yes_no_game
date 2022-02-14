import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useSendReportMutation} from '@api';
import {H1, H3, H5} from '@Typography';
import {CloseButton, Loading, Screen, Success} from '@ui';
import {ReportForm} from '../../../forms';
import {styles} from './styles';
import {useAppSelector} from '@hooks';

export const ReportScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const id = useAppSelector(state => state.user.id);

  const [sendReport, {isLoading}] = useSendReportMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleGoBack = () => navigation.pop();

  const reportHandler = async (values: any) => {
    try {
      setErrorMessage(null);

      const {email, name, message, image} = values;
      const date = new Date().toLocaleString();

      const formData = new FormData();

      formData.append('email', email);
      formData.append('name', name);
      formData.append('message', message);
      formData.append('date', date);
      formData.append('sendBy', id);
      image &&
        formData.append('image', {
          name: image.fileName,
          type: image.type,
          uri:
            Platform.OS === 'ios'
              ? image.uri.replace('file://', '')
              : image.uri,
        });

      await sendReport(formData).unwrap();

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
      <Screen type="ScrollView" style={styles.container}>
        <View style={styles.header}>
          <H1 style={styles.title} fontWeight="bold">
            Send report
          </H1>
          <H3>
            Whether you are looking for answers, would like to solve a problem
            or just want to let us know how we are doing, we would love to hear
            from you. Fill out the form below and a representative will reach
            out to you as soon as possible.
          </H3>
        </View>
        <View style={styles.line} />
        {errorMessage && <H5 style={styles.error}>{errorMessage}</H5>}
        <ReportForm onSubmit={reportHandler} />

        <CloseButton style={styles.closeButton} onPress={handleGoBack} />
      </Screen>
    </>
  );
};
