import React, {useState} from 'react';
import {BackHandler, ScrollView, StatusBar, View} from 'react-native';
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
        <View style={styles.header}>
          <H1 fontWeight="600" style={{...styles.title}}>
            {t('spy:additional')}
          </H1>
          <H3 style={{color: colors.spyRed}}> {t('spy:additionalSub')}</H3>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{...styles.card, backgroundColor: colors.spyRed}}>
            <View style={{...styles.cardContent}}>
              <H2 fontWeight="600" style={styles.cardTitle}>
                {t('spy:additional1')}
              </H2>
              <H4 style={{...styles.cardTitle}}>{t('spy:additional1Sub')}</H4>
            </View>

            <View style={styles.wheelContainer}>
              <WheelPicker
                data={['Off', 'On']}
                itemTextFontFamily={'Nunito-Bold'}
                selectedItemTextSize={20}
                selectedItemTextColor={'white'}
                selectedItemTextFontFamily={'Nunito-ExtraBold'}
                hideIndicator
                onItemSelected={selectedItem => {
                  setSpyHintIndex(selectedItem);
                }}
              />
            </View>
          </View>
          <View style={{...styles.card, backgroundColor: colors.spyRed}}>
            <View style={{...styles.cardContent}}>
              <H2 fontWeight="600" style={styles.cardTitle}>
                {t('spy:additional2')}
              </H2>
              <H4 style={{...styles.cardTitle}}>{t('spy:additional2Sub')}</H4>
            </View>

            <View style={styles.wheelContainer}>
              <WheelPicker
                data={['Off', 'On']}
                itemTextFontFamily={'Nunito-Bold'}
                selectedItemTextSize={20}
                selectedItemTextColor={'white'}
                selectedItemTextFontFamily={'Nunito-ExtraBold'}
                hideIndicator
                onItemSelected={selectedItem => {
                  setRolesIndex(selectedItem);
                }}
              />
            </View>
          </View>

          <View style={{...styles.card, backgroundColor: colors.spyRed}}>
            <View style={{...styles.cardContent}}>
              <H2 fontWeight="600" style={styles.cardTitle}>
                {t('spy:additional3')}
              </H2>
              <H4 style={{...styles.cardTitle}}>{t('spy:additional3Sub')}</H4>
            </View>

            <View style={styles.wheelContainer}>
              <WheelPicker
                data={['Off', 'On']}
                itemTextFontFamily={'Nunito-Bold'}
                selectedItemTextSize={20}
                selectedItemTextColor={'white'}
                selectedItemTextFontFamily={'Nunito-ExtraBold'}
                hideIndicator
                onItemSelected={selectedItem => {
                  setDiscloseRolesIndex(selectedItem);
                }}
              />
            </View>
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
