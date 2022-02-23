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
import {t} from 'i18next';

export const ReportScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const id = useAppSelector(state => state.user.id);
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;
  const color = darkTheme ? colors.blue : colors.darkBlue;

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
      <Screen type="ScrollView" style={{...styles.container, backgroundColor}}>
        <ProfileItemHeader
          title={t('profile:reportTitle')}
          description={t('profile:reportText')}
          titleColor={color}
        />

        {errorMessage && <H5 style={styles.error}>{errorMessage}</H5>}
        <ReportForm onSubmit={reportHandler} />
      </Screen>
    </>
  );
};
