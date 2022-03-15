import {ProfileItemProps} from '@components';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {H3, H5} from '@Typography';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const ProfileModalItem: React.FC<ProfileItemProps> = ({
  showLine = true,
  color,
  icon,
  title,
  onPress,
}) => {
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const textColor = darkTheme ? colors.white : colors.black;

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.profileItem}>
          <Icon name={icon} size={25} color={color} />

          <H3 fontWeight="600" style={{marginLeft: 5, color: textColor}}>
            {title}
          </H3>
        </View>
      </TouchableOpacity>
      {showLine && (
        <View style={{...styles.line, backgroundColor: textColor}} />
      )}
    </>
  );
};
