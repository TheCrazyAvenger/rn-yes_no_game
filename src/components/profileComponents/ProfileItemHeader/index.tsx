import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ProfileItemHeaderProps} from '@components';
import {H1, H3} from '@Typography';
import {CloseButton} from '@ui';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {colors} from '@constants';

export const ProfileItemHeader: React.FC<ProfileItemHeaderProps> = ({
  title,
  description,
  titleColor,
  showCloseButton = true,
}) => {
  const navigation: any = useNavigation();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const color = darkTheme ? colors.white : colors.black;

  const handleGoBack = () => navigation.pop();

  return (
    <>
      <View style={styles.header}>
        <H1 style={{...styles.title, color}} fontWeight="600">
          {title}
        </H1>
        <H3 style={{...styles.description, color}}>{description}</H3>
      </View>

      {showCloseButton && (
        <CloseButton
          style={styles.closeButton}
          buttonColor={titleColor}
          onPress={handleGoBack}
        />
      )}
    </>
  );
};
