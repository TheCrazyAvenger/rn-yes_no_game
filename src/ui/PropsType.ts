import {TextStyle, ViewStyle} from 'react-native';

export type ScreenProps = {
  type?: 'View' | 'ScrollView';
  style?: ViewStyle;
};

export type TextProps = {
  fontWeight?: 'bold' | '400' | '600';
  style?: TextStyle;
  numberOfLines?: number;
  onPress?: (...args: any) => void;
};

export type ButtonProps = {
  title: string;
  disabled?: boolean;
  onPress: (...args: any) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export type CloseButtonProps = {
  disabled?: boolean;
  onPress: (...args: any) => void;
  style?: any;
};
