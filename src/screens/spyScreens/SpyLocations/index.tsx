import React, {useState} from 'react';
import {
  BackHandler,
  ImageBackground,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {t} from 'i18next';

import {Screen, Button} from '@ui';
import {colors, Screens} from '@constants';
import {H1, H2, H3, H4} from '@Typography';
import {styles} from './styles';

export const SpyLocations: React.FC = () => {
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
    navigation.navigate();
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
        <View style={styles.header}>
          <H1 fontWeight="600" style={{...styles.title}}>
            {t('spy:locations')}
          </H1>
          <H3 style={{color: colors.spyRed}}> {t('spy:locationsSub')}</H3>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <ImageBackground
              borderTopLeftRadius={10}
              borderTopRightRadius={10}
              style={styles.cardImage}
              source={require('@assets/images/spy/1.png')}
            />
            <View style={styles.cardContent}></View>
          </View>
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
