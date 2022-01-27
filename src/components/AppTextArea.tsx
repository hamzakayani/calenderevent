/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput, TextInputProps, View, ViewProps} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {appColors} from '../utils/colors';
import {useController} from 'react-hook-form';

interface IAppTextInput {
  name?: any; //should be string
  control?: any;
  outerViewProps?: ViewProps;
  textInputProps?: TextInputProps;
  icon?: React.FC<SvgProps>;
  setCurrentValue?: any;
}

export function AppTextArea({
  name,
  control,
  icon: Icon,
  outerViewProps = {},
  textInputProps = {},
  setCurrentValue,
}: IAppTextInput) {
  const {field} = useController({name, control});

  const {style: outerViewStyle, ...outerViewRestProps} = outerViewProps;
  const {style: textInputStyle, ...textInputRest} = textInputProps;
  return (
    <View
      style={[
        {
          minHeight:100,
          backgroundColor:'white',
          borderWidth: 1,
          marginVertical: 5,
          borderColor: appColors.purple,
          borderRadius: 10,
        },
        outerViewStyle,
      ]}
      {...outerViewRestProps}>
      <TextInput
        {...textInputRest}
        onChangeText={e => {
          setCurrentValue && setCurrentValue(e);
          field.onChange(e);
        }}
        placeholderTextColor="#000000"
        multiline={true}
        scrollEnabled={false}
        value={field.value}
        style={[
          {
            fontSize: 18,
            padding: 12,
            flex: 1,
            textAlignVertical: 'top',
            color: '#000000',
          },
          textInputStyle,
        ]}
      />
      {!!Icon && (
        <View style={{flexShrink: 0, marginRight: 8}}>
          <Icon />
        </View>
      )}
    </View>
  );
}
