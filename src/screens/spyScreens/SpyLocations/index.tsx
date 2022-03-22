import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  BackHandler,
  FlatList,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {t} from 'i18next';
import * as RNLocalize from 'react-native-localize';

import {LocationCard, SpyHeader} from '@components';
import {Screen, Button} from '@ui';
import {colors, locations, Screens} from '@constants';
import {styles} from './styles';
import {useAppDispatch} from '@hooks';
import {setGameData} from '@store/slices/spySlice';
import {shuffle} from '@utilities';

export const SpyLocations: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch = useAppDispatch();

  const language = RNLocalize.getLocales()[0].languageCode;
  const {height, width} = useWindowDimensions();

  const [location, setLocation] = useState(0);
  const slidesRef: any = useRef(null);

  const coverTop = useRef(new Animated.Value(height)).current;
  const left = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    Animated.spring(left, {toValue: 0, useNativeDriver: false}).start();
  }, []);

  const {data} = route.params;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  // const onViewableItemsChanged = ({viewableItems}: any) => {
  //   setLocation(viewableItems[0].index);
  // };

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

  const handleNext = () => {
    Animated.timing(coverTop, {toValue: 0, useNativeDriver: false}).start(
      async () => {
        const {
          time,
          spyHint,
          spyHintNumber,
          roles,
          discloseRoles,
          players,
          spies,
        } = data;

        const locationsList = shuffle(
          locations[language][location].locations,
        ).slice(0, 10);

        const gameLocation = locationsList[0];

        const localsNumber = players - spies;
        const isRoles = roles
          ? shuffle(gameLocation.roles).slice(0, localsNumber)
          : [...Array(localsNumber).keys()].map(() => 'Local');

        const locationRoles = shuffle([
          ...isRoles,
          ...[...Array(spies).keys()].map(() => t('spy:spy')),
        ]);

        await dispatch(
          setGameData({
            time: time * 60,
            spyHint,
            spyHintNumber,
            roles,
            discloseRoles,
            locations: locationsList,
            rolesList: locationRoles,
            location: gameLocation,
          }),
        );
        navigation.navigate(Screens.spyStart, {
          data: {...data, location: locations[language][location]},
        });
      },
    );
  };

  const backHandler = () => navigation.goBack();

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: coverTop,
          left: 0,
          right: 0,
          backgroundColor: colors.aliasBlack,
          top: 0,
          zIndex: 100,
        }}
      />
      <Screen style={{backgroundColor: colors.aliasBlack}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />
        <SpyHeader
          title={t('spy:locations')}
          subtitle={t('spy:locationsSub')}
          style={{paddingBottom: 10}}
        />

        <Animated.ScrollView
          style={{left}}
          showsVerticalScrollIndicator={false}>
          <FlatList
            horizontal
            keyExtractor={item => item.id}
            data={locations[language]}
            renderItem={({item}) => <LocationCard key={item.id} item={item} />}
            bounces={false}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={32}
            viewabilityConfig={viewConfig}
            // onViewableItemsChanged={onViewableItemsChanged}
            ref={slidesRef}
          />
        </Animated.ScrollView>

        <View style={styles.buttons}>
          <Button
            title={t('alias:back')}
            style={{...styles.nextButton, backgroundColor: colors.white}}
            textStyle={{color: colors.aliasBlack}}
            containerStyle={styles.buttonContainer}
            onPress={backHandler}
          />
          <Button
            title={t('alias:start')}
            style={styles.nextButton}
            containerStyle={styles.buttonContainer}
            onPress={handleNext}
          />
        </View>
      </Screen>
    </>
  );
};
