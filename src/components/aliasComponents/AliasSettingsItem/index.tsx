import {colors} from '@constants';
import {H2, H3, H4} from '@Typography';
import {Button} from '@ui';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

type AliasSettingsItemProps = {
  title: string;
  subTitle: string;
  value: number;
  leftButton: (...args: any) => any;
  rightButton: (...args: any) => any;
  leftButtonTitle: string;
  rightButtonTitle: string;
  min: number;
  max: number;
};

export const AliasSettingsItem: React.FC<AliasSettingsItemProps> = ({
  title,
  subTitle,
  value,
  leftButton,
  rightButton,
  leftButtonTitle,
  rightButtonTitle,
  min,
  max,
}) => {
  return (
    <View>
      <View style={styles.settingsItem}>
        <View>
          <H3 style={styles.title} fontWeight="600">
            {title}
          </H3>
          <H4 style={{color: colors.darkGray}}>{subTitle}</H4>
        </View>
        <H2 style={{color: colors.aliasRed}} fontWeight="600">
          {value}
        </H2>
      </View>
      <View style={styles.buttons}>
        <Button
          disabled={value <= min}
          onPress={rightButton}
          containerStyle={styles.buttonContainer}
          style={styles.button}
          title={rightButtonTitle}
        />
        <Button
          disabled={value >= max}
          onPress={leftButton}
          containerStyle={styles.buttonContainer}
          style={{...styles.button, backgroundColor: colors.aliasRed}}
          title={leftButtonTitle}
        />
      </View>
      <View style={styles.line} />
    </View>
  );
};
