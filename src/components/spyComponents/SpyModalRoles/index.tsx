import {colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';

import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

import {H1, H2, H3} from '@Typography';
import {CloseButton} from '@ui';

import {t} from 'i18next';
import React from 'react';
import {Modal, useWindowDimensions, View} from 'react-native';

import {styles} from './styles';

type SpyModalRolesProps = {
  locations: any;
  visible: boolean;
  hideModal: () => void;
};

export const SpyModalRoles: React.FC<SpyModalRolesProps> = ({
  locations,
  visible,
  hideModal,
}) => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const {width} = useWindowDimensions();

  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const {name, roles} = locations;

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalbg}>
        <BlurView style={styles.blur} blurAmount={10} />
        <View style={{...styles.winModal, width: width - 100}}>
          <H1 fontWeight="600" style={styles.title}>
            {name}
          </H1>
          <H3 style={styles.text}>Roles:</H3>
          {roles.map((item: string, i: number) => (
            <H3 style={styles.text} key={item}>
              {i + 1}. {item}
            </H3>
          ))}
          <CloseButton
            style={styles.closeButton}
            buttonColor={colors.spyRed}
            onPress={hideModal}
          />
        </View>
      </View>
    </Modal>
  );
};
