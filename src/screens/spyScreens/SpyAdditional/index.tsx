import React, {useState} from 'react';
import {BackHandler, ScrollView, StatusBar, View} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {t} from 'i18next';

import {Screen, Button} from '@ui';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {SpyHeader, WheelCard} from '@components';

export const SpyAdditional: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {data} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(Screens.spyHome);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const [spyHint, setSpyHint] = useState(false);
  const [roles, setRoles] = useState(false);
  const [discloseRoles, setDiscloseRoles] = useState(false);

  const handleNext = () => {
    navigation.navigate(Screens.spyLocations, {
      data: {...data, spyHint, roles, discloseRoles},
    });
  };

  const backHandler = () => navigation.goBack();

  const setSpyHintIndex = (index: number) => {
    const isOn = index === 0 ? false : true;
    setSpyHint(isOn);
  };

  const setRolesIndex = (index: number) => {
    const isOn = index === 0 ? false : true;
    setRoles(isOn);
  };

  const setDiscloseRolesIndex = (index: number) => {
    const isOn = index === 0 ? false : true;
    setDiscloseRoles(isOn);
  };

  return (
    <>
      <Screen style={{backgroundColor: colors.aliasBlack}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />
        <SpyHeader
          title={t('spy:additional')}
          subtitle={t('spy:additionalSub')}
          style={{marginBottom: 30}}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <WheelCard
            title={t('spy:additional1')}
            subtitle={t('spy:additional1Sub')}
            backgroundColor={colors.spyRed}
            wheelData={['Off', 'On']}
            onItemSelected={setSpyHintIndex}
          />

          <WheelCard
            title={t('spy:additional2')}
            subtitle={t('spy:additional2Sub')}
            backgroundColor={colors.spyRed}
            wheelData={['Off', 'On']}
            onItemSelected={setRolesIndex}
          />

          <WheelCard
            title={t('spy:additional3')}
            subtitle={t('spy:additional3Sub')}
            backgroundColor={colors.spyRed}
            wheelData={['Off', 'On']}
            onItemSelected={setDiscloseRolesIndex}
          />
        </ScrollView>

        <View style={styles.buttons}>
          <Button
            title={t('alias:back')}
            style={{...styles.nextButton, backgroundColor: colors.white}}
            textStyle={{color: colors.aliasBlack}}
            containerStyle={styles.buttonContainer}
            onPress={backHandler}
          />
          <Button
            title={t('spy:next')}
            style={styles.nextButton}
            containerStyle={styles.buttonContainer}
            onPress={handleNext}
          />
        </View>
      </Screen>
    </>
  );
};
