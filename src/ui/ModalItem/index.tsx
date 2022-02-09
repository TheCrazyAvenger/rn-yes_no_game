import React from 'react';
import {Modal, ModalProps, View} from 'react-native';

import {styles} from './styles';

export const ModalItem: React.FC<ModalProps> = ({children, visible}) => {
  return (
    <Modal
      visible={visible}
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}>
      <View style={styles.background}>
        <View style={styles.modal}>{children}</View>
      </View>
    </Modal>
  );
};
