import React, {useState} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ProfileItemHeader} from '@components';
import {ReportForm} from '../../../forms';
import {H5} from '@Typography';
import {useAppSelector} from '@hooks';
import {Loading, Screen, Success} from '@ui';
import {useSendReportMutation} from '@api';
import {styles} from './styles';
import {colors} from '@constants';

export const ReportScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const id = useAppSelector(state => state.user.id);

  const [sendReport, {isLoading}] = useSendReportMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

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
        <ProfileItemHeader
          title="Send report"
          description="Whether you are looking for answers, would like to solve a problem
        or just want to let us know how we are doing, we would love to hear
        from you. Fill out the form below and a representative will reach
        out to you as soon as possible."
          titleColor={colors.darkBlue}
        />

        {errorMessage && <H5 style={styles.error}>{errorMessage}</H5>}
        <ReportForm onSubmit={reportHandler} />
      </Screen>
    </>
  );
};
