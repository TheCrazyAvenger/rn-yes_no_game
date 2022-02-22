import {colors} from '@constants';
import {H2} from '@Typography';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Screen} from '../Screen';
import {styles} from './styles';

type ErrorModalProps = {
  onPress: (...args: any) => any;
  message: string | null;
};

export const ErrorModal: React.FC<ErrorModalProps> = ({onPress, message}) => {
  return (
    <Screen style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
        <Icon name="refresh-outline" color={colors.white} size={40} />
      </TouchableOpacity>
      <H2 fontWeight="600" style={styles.text}>
        {message}
      </H2>
    </Screen>
  );
};
