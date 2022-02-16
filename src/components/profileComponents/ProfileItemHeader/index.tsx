import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ProfileItemHeaderProps} from '@components';
import {H1, H3} from '@Typography';
import {CloseButton} from '@ui';
import {styles} from './styles';

export const ProfileItemHeader: React.FC<ProfileItemHeaderProps> = ({
  title,
  description,
}) => {
  const navigation: any = useNavigation();

  const handleGoBack = () => navigation.pop();

  return (
    <>
      <View style={styles.header}>
        <H1 style={styles.title} fontWeight="bold">
          {title}
        </H1>
        <H3>{description}</H3>
      </View>
      <View style={styles.line} />
      <CloseButton style={styles.closeButton} onPress={handleGoBack} />
    </>
  );
};
