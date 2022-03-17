import React, {useState} from 'react';
import {
  BackHandler,
  Modal,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {WheelPicker} from 'react-native-wheel-picker-android';
import * as RNLocalize from 'react-native-localize';
import {t} from 'i18next';

import {Screen, Button} from '@ui';
import {useAppSelector} from '@hooks';
import {colors, aliasWords, Screens} from '@constants';
import {H1, H2, H3, H4} from '@Typography';
import {styles} from './styles';
import {AliasChoose} from '../../aliasScreens/AliasChoose';
import {shuffle} from '@utilities';
import {AliasTeams} from '../../aliasScreens/AliasTeams';

export const SpySettings: React.FC = () => {
  const navigation: any = useNavigation();

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

  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const language = RNLocalize.getLocales()[0].languageCode;

  const backgroundColor = darkTheme ? colors.white : colors.aliasBlack;
  const color = darkTheme ? colors.aliasBlack : colors.white;
  const titleColor = !darkTheme ? colors.aliasBlack : colors.white;

  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState<any>(null);
  const [spies, setSpies] = useState(1);
  const [players, setPlayers] = useState(3);
  const [time, setTime] = useState(30);
  const [fee, setFee] = useState(false);

  const setVisibleHandler = () => setVisible(true);
  const categoryHandler = (name: string) => {
    setCategory(name);
    setVisible(false);
  };

  const handleStart = () => {
    // const teamsPoints = [...Array(teams).keys()].map(item => ({
    //   team: `${t('alias:team')} ${item + 1}`,
    //   points: 0,
    // }));
    // const gameCategory = aliasWords[category.en];
    // const categoryByLang = gameCategory[language];
    // navigation.replace(Screens.aliasStart, {
    //   teamsPoints,
    //   words: shuffle(categoryByLang),
    //   time,
    //   fee,
    //   category,
    //   points: words,
    //   round: 1,
    //   game: 1,
    //   teamIndex: 0,
    //   team: teamsPoints[0].team,
    //   lastTeam: teamsPoints[teamsPoints.length - 1].team,
    //   currentWord: 0,
    //   isStart: true,
    // });
  };

  const backHandler = () => navigation.navigate(Screens.spyHome);

  const setPlayersIndex = (index: number) => {
    setPlayers(index + 3);
  };

  const setTimeIndex = (index: number) => {
    const time = ['30', '60', '90', '120', '150', '180'];
    setTime(Number(time[index]));
  };

  const setSpiesIndex = (index: number) => {
    setSpies(index + 1);
  };

  const setPassFee = (index: number) => {
    const isOn = index === 0 ? false : true;
    setFee(isOn);
  };

  return (
    <>
      <Modal animationType="fade" visible={visible}>
        <AliasChoose setCategory={categoryHandler} />
      </Modal>
      <Screen type="ScrollView">
        <StatusBar
          barStyle={darkTheme ? 'light-content' : 'dark-content'}
          backgroundColor={darkTheme ? colors.dark : colors.white}
        />
        <View style={styles.header}>
          <H1 fontWeight="600" style={{...styles.title, color: titleColor}}>
            {t('alias:gameSettings')}
          </H1>
          <H3 style={{color: colors.spyRed}}> {t('alias:settingSub')}</H3>
        </View>

        <TouchableOpacity
          onPress={setVisibleHandler}
          style={{...styles.card, backgroundColor}}>
          <View style={styles.cardContent}>
            <H2 fontWeight="600" style={{...styles.cardTitle, color}}>
              Location
            </H2>
          </View>
          <Icon
            name="chevron-forward"
            size={30}
            style={{marginRight: 30}}
            color={color}
          />
        </TouchableOpacity>

        <View style={{...styles.card, backgroundColor: colors.spyRed}}>
          <View style={styles.cardContent}>
            <H2 fontWeight="600" style={styles.cardTitle}>
              Players
            </H2>
            <H4 style={styles.cardTitle}>Set number of players</H4>
          </View>

          <View style={{maxWidth: '41%'}}>
            <WheelPicker
              data={['3', '4', '5', '6', '7', '8']}
              itemTextFontFamily={'Nunito-Bold'}
              selectedItemTextSize={20}
              selectedItemTextColor={'white'}
              selectedItemTextFontFamily={'Nunito-ExtraBold'}
              hideIndicator
              onItemSelected={selectedItem => {
                setPlayersIndex(selectedItem);
              }}
            />
          </View>
        </View>

        <View style={{...styles.card, backgroundColor}}>
          <View style={{...styles.cardContent}}>
            <H2 fontWeight="600" style={{...styles.cardTitle, color}}>
              Spies
            </H2>
            <H4 style={{...styles.cardTitle, color}}>Set number of spies</H4>
          </View>

          <View style={{maxWidth: '41%'}}>
            <WheelPicker
              data={['1', '2', '3', '4']}
              itemTextFontFamily={'Nunito-Bold'}
              selectedItemTextSize={20}
              selectedItemTextColor={darkTheme ? 'black' : 'white'}
              selectedItemTextFontFamily={'Nunito-ExtraBold'}
              hideIndicator
              onItemSelected={selectedItem => setSpiesIndex(selectedItem)}
            />
          </View>
        </View>

        <View style={{...styles.card, backgroundColor: colors.spyRed}}>
          <View style={{...styles.cardContent, width: '59%'}}>
            <H2 fontWeight="600" style={styles.cardTitle}>
              Spy Hint
            </H2>
            <H4 style={{...styles.cardTitle}}>{t('alias:setting3sub')}</H4>
          </View>

          <View style={{maxWidth: '41%'}}>
            <WheelPicker
              data={['Off', 'On']}
              itemTextFontFamily={'Nunito-Bold'}
              selectedItemTextSize={20}
              selectedItemTextColor={'white'}
              selectedItemTextFontFamily={'Nunito-ExtraBold'}
              hideIndicator
              onItemSelected={selectedItem => {
                setPassFee(selectedItem);
              }}
            />
          </View>
        </View>

        <View style={styles.buttons}>
          <Button
            title={t('alias:back')}
            style={{...styles.nextButton, backgroundColor}}
            textStyle={{color}}
            containerStyle={styles.buttonContainer}
            onPress={backHandler}
          />
          <Button
            disabled={category === null}
            title={t('alias:start')}
            style={styles.nextButton}
            containerStyle={styles.buttonContainer}
            onPress={handleStart}
          />
        </View>
      </Screen>
    </>
  );
};
