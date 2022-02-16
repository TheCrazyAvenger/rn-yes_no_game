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
  loading?: boolean;
  disabled?: boolean;
  onPress: (...args: any) => void;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export type IconButtonProps = {
  color: string;
  size: number;
  name: string;
  disabled?: boolean;
  onPressIn?: (...args: any) => void;
  onPressOut?: (...args: any) => void;
  onPress?: (...args: any) => void;
  style?: ViewStyle;
};

export type CloseButtonProps = {
  disabled?: boolean;
  onPress: (...args: any) => void;
  style?: any;
  buttonColor?: string;
};

export type NumberPickerProps = {
  value: number | string;
  setValue: (prevValue: any) => any;
  min: number;
  max: number;
  style?: ViewStyle;
};

export type LottieProps = {
  onAnimationFinish?: (...args: any) => void;
  style?: ViewStyle;
  isActive?: boolean;
};

export type FormInputProps = {
  label?: string;
  plaseholder: string;
  onChangeText: (...args: any) => void;
  onChange?: (...args: any) => void;
  onFocus?: (...args: any) => void;
  onBlur: (...args: any) => void;
  onInput?: (...args: any) => void;
  onContentSizeChange?: (...args: any) => void;
  height?: number;
  value: any;
  errorMessage?: any;
  isTouched: any;
  style?: {[key: string]: number | string};
  inputStyle?: {[key: string]: number | string};
  containerStyle?: {[key: string]: number | string};
  secureTextEntry?: boolean;
  multiline?: boolean;
  rightIcon?: any;
  leftIcon?: any;
  keyboardType?: any;
  disabled?: boolean;
  errorStyle?: {[key: string]: number | string};
};

export type ImagePickerProps = {
  style?: ViewStyle;
  image: any | null;
  onImage: (...args: any) => any;
};
