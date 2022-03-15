import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

import {ProfileItemHeader} from '@components';
import {ReportForm} from '../../../forms';
import {H5} from '@Typography';
import {useAppSelector} from '@hooks';
import {Loading, Screen, Success} from '@ui';
import {useSendReportMutation} from '@api';
import {styles} from './styles';
import {colors} from '@constants';
import {t} from 'i18next';
import {Animated} from 'react-native';

type ProfileProps = {
  closeWindow: (...ars: any) => any;
};

export const ReportScreen: React.FC<ProfileProps> = ({closeWindow}) => {
  const navigation: any = useNavigation();
  const id = useAppSelector(state => state.user.id);
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;
  const color = darkTheme ? colors.blue : colors.darkBlue;

  const scale = useRef(new Animated.Value(0)).current;

  const [sendReport] = useSendReportMutation();

  useEffect(() => {
    Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const reportHandler = async (values: any) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const {email, name, message, image} = values;
      const date = new Date().toLocaleString();

      const data = {email, name, message, date, sendBy: id};

      await sendReport(data).unwrap();

      await auth().signInAnonymously();
      await storage().ref(`reports/report ${date}`).putFile(image.uri);

      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        closeWindow();
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
      <Animated.View style={{flex: 1, transform: [{scale}]}}>
        <Screen
          type="ScrollView"
          style={{...styles.container, backgroundColor}}>
          <ProfileItemHeader
            showCloseButton={false}
            title={t('profile:reportTitle')}
            description={t('profile:reportText')}
            titleColor={color}
          />

          {errorMessage && <H5 style={styles.error}>{errorMessage}</H5>}
          <ReportForm onSubmit={reportHandler} />
        </Screen>
      </Animated.View>
    </>
  );
};
