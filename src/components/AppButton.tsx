/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {appColors} from '../utils/colors';

interface IAppButton {
  buttonProps?: TouchableOpacityProps;
  innerTextProps?: TextProps;
  text: string;
  isLoading?: boolean;
}
export function AppButton({
  buttonProps = {},
  innerTextProps = {},
  text,
  isLoading,
}: IAppButton) {
  const {style: buttonStyle, ...buttonRest} = buttonProps;
  const {style: textStyle, ...textRest} = innerTextProps;

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: appColors.purple,
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          borderRadius: 10,
        },
        buttonStyle,
      ]}
      {...buttonRest}>
        
      {isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text
          style={[
            {fontSize: 20, fontFamily: 'OpenSans-Regular', color: 'white'},
            textStyle,
          ]}
          {...textRest}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
