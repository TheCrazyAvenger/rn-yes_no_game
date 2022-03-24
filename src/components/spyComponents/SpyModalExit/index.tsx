import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import {
  setCurrentWord,
  setFee,
  setGame,
  setLastTeam,
  setPoints,
  setRound,
  setTeam,
  setTeamIndex,
  setTeams,
  setWords,
} from '@store/slices/aliasSlice';
import {H1, H2, H3} from '@Typography';
import {IconButton} from '@ui';
import {t} from 'i18next';
import React from 'react';
import {Modal, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

type SpyModalExitProps = {
  visible: boolean;
  rightButton: (...args: any) => any;
};

export const SpyModalExit: React.FC<SpyModalExitProps> = ({
  visible,
  rightButton,
}) => {
  const navigation: any = useNavigation();

  const handleNext = () => {
    navigation.replace(Screens.spyHome);
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalbg}>
        <BlurView style={styles.blur} blurAmount={10} />
        <View style={{...styles.winModal, backgroundColor: colors.dark}}>
          <H2 fontWeight="bold" style={styles.titleText}>
            {t('spy:modalTitle')}
          </H2>
          <H3 style={styles.text}> {t('spy:modalText')}</H3>
          <View style={styles.row}>
            <IconButton
              name="checkmark"
              size={25}
              color={colors.white}
              style={styles.button}
              onPress={handleNext}
            />
            <IconButton
              name="close"
              size={25}
              color={colors.white}
              style={styles.button}
              onPress={rightButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
