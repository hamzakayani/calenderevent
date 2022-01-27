/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View,ViewProps } from 'react-native';
import {SvgProps} from 'react-native-svg';
import {appColors} from '../utils/colors';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useController} from 'react-hook-form';

interface AppDatePicker {
  name: string;
  control?: any;
  outerViewProps?: ViewProps;
  textInputProps?: TextInputProps;
  icon?: React.FC<SvgProps>;
  minimumDate?:Date;
  selectedDate?:string; 
  setSelectedDate?:any
}

export function AppDatePicker({
  name,
  control,
  minimumDate,
  icon: Icon,
  outerViewProps = {},
  textInputProps = {},
  selectedDate, 
  setSelectedDate
}: AppDatePicker) {
  const {field} = useController({name, control});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [selectedDate, setSelectedDate] = useState('');
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    field.onChange(date);
    setSelectedDate(date.toDateString());
    hideDatePicker();
  };
  const {style: outerViewStyle, ...outerViewRestProps} = outerViewProps;
  const {style: textInputStyle, ...textInputRest} = textInputProps;
  return (
    <TouchableOpacity
      onPress={showDatePicker}
      style={[
        {
          flexDirection: 'row',
          height: 50,
          borderWidth: 1,
          marginVertical: 5,
          borderColor: appColors.purple,
          alignItems: 'center',
          borderRadius: 10,
        },
        outerViewStyle,
      ]}
      {...outerViewRestProps}>
      <TextInput
        editable={false}
        {...textInputRest}
        placeholderTextColor="#000000"
        style={[
          {fontSize: 18, padding: 12, flex: 1, color: '#000000'},
          textInputStyle,
        ]}
        value={selectedDate}
      />

      {!!Icon && (
        <View style={{flexShrink: 0, marginRight: 8}}>
          <Icon />
        </View>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        minimumDate={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </TouchableOpacity>
  );
}
