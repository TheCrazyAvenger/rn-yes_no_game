import React, {useRef, useState} from 'react';
import {BackHandler, FlatList, ScrollView, StatusBar, View} from 'react-native';
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

export const SpyLocations: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const language = RNLocalize.getLocales()[0].languageCode;

  const [location, setLocation] = useState(0);
  const slidesRef: any = useRef(null);

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
    console.log({...data, location: locations[language][location]});
    // navigation.navigate();
  };

  const backHandler = () => navigation.goBack();

  return (
    <>
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

        <ScrollView showsVerticalScrollIndicator={false}>
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
