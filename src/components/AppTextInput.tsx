import React from 'react';
import {useController} from 'react-hook-form';
import {
  TouchableOpacity,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
  Image,
} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {appColors} from '../utils/colors';

interface IAppTextInput {
  name?: any; //should be string
  control?: any;
  outerViewProps?: ViewProps;
  textInputProps?: TextInputProps;
  icon?: React.FC<SvgProps>;
  startIcon?: React.FC<SvgProps>;
  IconProps?: any;
  setCurrentValue?: any;
  image?: any;
  url?: any;
}

export function AppTextInput({
  name,
  control,
  startIcon: RightIcon,
  icon: Icon,
  IconProps = {},
  outerViewProps = {},
  textInputProps = {},
  setCurrentValue,
  image,
  url,
}: IAppTextInput) {
  const {style: outerViewStyle, ...outerViewRestProps} = outerViewProps;
  const {style: textInputStyle, ...textInputRest} = textInputProps;
  const {style: IconStyle, ...IconRest} = IconProps;
  const {field} = useController({name, control});
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          borderWidth: 1,
          marginVertical: 5,
          borderColor: appColors.purple,
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor:'white'
        },
        outerViewStyle,
      ]}
      {...outerViewRestProps}>
      {!!RightIcon && (
        <View style={[{flexShrink: 0, marginLeft: 8}, IconStyle]}>
          <RightIcon />
        </View>
      )}
      <TextInput
        {...textInputRest}
        placeholderTextColor="#000000"
        onChangeText={e => {
          setCurrentValue && setCurrentValue(e);
          field.onChange(e);
        }}
        value={field.value}
        style={[
          {
            fontSize: 18,
            padding: 12,
            flex: 1,
            fontFamily: 'OpenSans-Regular',
            color: '#000000',
          },
          textInputStyle,
        ]}
      />
      {!!Icon && (
        <TouchableOpacity
          style={[{flexShrink: 0, marginRight: 8}, IconStyle]}
          {...IconRest}
          >
          <Icon width={18} height={18} />
        </TouchableOpacity>
      )}
      
    </View>
  );
}
