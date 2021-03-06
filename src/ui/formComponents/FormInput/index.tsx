import React from 'react';
import {View} from 'react-native';
import {Input} from 'react-native-elements';
import {FormInputProps} from '@ui';
import {H5} from '@Typography';
import {colors} from '@constants';
import {styles} from './styles';

export const FormInput: React.FC<FormInputProps> = ({
  label,
  plaseholder,
  onChangeText,
  onFocus,
  onBlur,
  onChange,
  onInput,
  onContentSizeChange,
  height,
  value,
  errorMessage,
  isTouched,
  style,
  containerStyle,
  secureTextEntry,
  rightIcon,
  leftIcon,
  disabled,
  inputStyle,
  multiline,
  textAlignVertical,
  keyboardType = 'default',
  errorStyle,
  numberOfLines,
}) => {
  const inputContainerStyle = [
    styles.inputContainerStyle,
    containerStyle,
    errorMessage && isTouched ? styles.errorInput : null,
  ];
  const labelStyle = [
    styles.labelStyle,
    errorMessage && isTouched ? styles.errorLabel : null,
  ];

  return (
    <View>
      <Input
        autoCompleteType=""
        rightIcon={rightIcon}
        onFocus={onFocus}
        value={value}
        label={label}
        keyboardType={keyboardType}
        onBlur={onBlur}
        onContentSizeChange={onContentSizeChange}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={textAlignVertical}
        onChange={onChange}
        onTextInput={onInput}
        leftIconContainerStyle={{marginTop: 3}}
        secureTextEntry={secureTextEntry}
        placeholder={plaseholder}
        leftIcon={leftIcon}
        onChangeText={onChangeText}
        placeholderTextColor="gray"
        inputStyle={{...styles.inputStyle, ...inputStyle}}
        labelStyle={[...labelStyle, style]}
        inputContainerStyle={[
          ...inputContainerStyle,
          {height: height ? height : 'auto'},
        ]}
        disabled={disabled ? true : false}
      />

      {errorMessage && isTouched && (
        <H5 style={{...styles.error, ...errorStyle}}>{errorMessage}</H5>
      )}
    </View>
  );
};
