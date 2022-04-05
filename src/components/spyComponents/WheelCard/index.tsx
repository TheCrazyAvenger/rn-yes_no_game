import {colors} from '@constants';
import {H2, H4} from '@Typography';
import React from 'react';
import {View} from 'react-native';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {styles} from './styles';

type WheelCardProps = {
  backgroundColor: string;
  title: string;
  subtitle: string;
  wheelData: Array<string>;
  color?: string;
  initPosition?: number;
  onItemSelected: (...args: any) => any;
};

export const WheelCard: React.FC<WheelCardProps> = ({
  backgroundColor,
  title,
  subtitle,
  wheelData,
  color,
  initPosition,
  onItemSelected,
}) => {
  return (
    <View style={{...styles.card, backgroundColor}}>
      <View style={{...styles.cardContent}}>
        <H2
          fontWeight="600"
          style={{...styles.cardTitle, color: color ? color : colors.white}}>
          {title}
        </H2>
        <H4 style={{...styles.cardTitle}}>{subtitle}</H4>
      </View>

      <View style={styles.wheelContainer}>
        <WheelPicker
          initPosition={initPosition}
          data={wheelData}
          itemTextFontFamily={'Nunito-Bold'}
          selectedItemTextSize={20}
          selectedItemTextColor={'white'}
          selectedItemTextFontFamily={'Nunito-ExtraBold'}
          hideIndicator
          onItemSelected={selectedItem => {
            onItemSelected(selectedItem);
          }}
        />
      </View>
    </View>
  );
};
