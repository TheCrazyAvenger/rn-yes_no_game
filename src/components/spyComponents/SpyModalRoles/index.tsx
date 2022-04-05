import React from 'react';
import {Modal, useWindowDimensions, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {t} from 'i18next';

import {H1, H3} from '@Typography';
import {Button} from '@ui';
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
  const {width} = useWindowDimensions();

  const {name, roles} = locations;

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalbg}>
        <BlurView style={styles.blur} blurAmount={10} />
        <View style={{...styles.winModal, width: width - 100}}>
          <H1 fontWeight="600" style={styles.title}>
            {name}
          </H1>
          <H3 style={styles.text}>{t('spy:roles')}</H3>
          {roles.map((item: string, i: number) => (
            <H3 style={styles.text} key={item}>
              {i + 1}. {item}
            </H3>
          ))}
          <Button
            title={t('spy:close')}
            style={{...styles.nextButton}}
            containerStyle={styles.buttonContainer}
            onPress={hideModal}
          />
        </View>
      </View>
    </Modal>
  );
};
