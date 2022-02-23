import {ProfileItemProps} from '@components';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {H3, H5} from '@Typography';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const ProfileItem: React.FC<ProfileItemProps> = ({
  showLine = true,
  color,
  icon,
  title,
  description,
  onPress,
}) => {
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const textColor = darkTheme ? colors.white : colors.black;

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.profileItem}>
          <Icon name={icon} size={33} color={color} />
          <View style={styles.itemText}>
            <H3 fontWeight="600" style={{color: textColor}}>
              {title}
            </H3>
            {description && <H5 style={{color: textColor}}>{description}</H5>}
          </View>
        </View>
      </TouchableOpacity>
      {showLine && <View style={styles.line} />}
    </>
  );
};
