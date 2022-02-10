import React from 'react';
import {Keyboard, TouchableWithoutFeedback, ViewStyle} from 'react-native';

export const KeyboardDismissView: React.FC<{style?: ViewStyle}> = ({
  children,
  style,
}) => {
  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} style={style}>
      {children}
    </TouchableWithoutFeedback>
  );
};
