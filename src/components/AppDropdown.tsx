/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, memo} from 'react';
import {useController} from 'react-hook-form';
import {TextInputProps, ViewProps} from 'react-native';
import DropDownPicker, {
  DropDownPickerProps,
} from 'react-native-dropdown-picker';
import styles from '../assets/css/style';
interface AppDropdown {
  name?: any; //should be string
  control?: any;
  outerViewProps?: ViewProps;
  dropdownInputProps?: Partial<DropDownPickerProps>;
  textProps?: Partial<DropDownPickerProps>;
  data?: any;
  isLoading?: boolean;
  disabled?: boolean;
  setCurrentValue?: any;
  currentValue?: any;
}
export default function AppDropdown({
  name,
  control,
  outerViewProps = {},
  dropdownInputProps = {},
  textProps = {},
  data,
  isLoading,
  disabled,
  setCurrentValue,
  currentValue,
}: AppDropdown) {
  const {field} = useController({name, control});

  const [opendropdown, setopendropdown] = useState(false);
  const [valuedropdown, setvaluedropdown] = useState(currentValue ?? null);
  const [itemsdropdown, setitemsdropdown] = useState(data);
  const {textStyle: textPropsStyle, ...textRestProps} = textProps;
  const {style: outerViewStyle, ...outerViewRestProps} = outerViewProps;
  const {
    style: textInputStyle,
    open,
    value,
    setOpen,
    setValue,
    ...restOfdropdownInputProps
  } = dropdownInputProps;

  useEffect(() => {
    currentValue && setvaluedropdown(currentValue);
  }, [currentValue]);

  useEffect(() => {
    setitemsdropdown(data);
  }, [isLoading]);

  return (
    <DropDownPicker
      style={[styles.dropdownstyle, outerViewStyle]}
      labelStyle={{color: '#000000', fontSize: 18}}
      textStyle={[{color: '#000000', fontSize: 18}, textPropsStyle]}
      placeholderStyle={{color: '#000000'}}
      min={1}
      zIndex={3000}
      zIndexInverse={1000}
      open={opendropdown}
      value={valuedropdown}
      mode="SIMPLE"
      items={data}
      setValue={setvaluedropdown}
      setOpen={setopendropdown}
      setItems={setitemsdropdown}
      onChangeValue={value => {
        setCurrentValue && setCurrentValue(value);
        field.onChange(value);
        // console.log(value);
      }}
      loading={isLoading}
      disabled={isLoading || disabled}
      {...restOfdropdownInputProps}
    />
  );
}
