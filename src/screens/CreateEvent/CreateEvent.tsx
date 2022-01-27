import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { AppTextInput } from '../../components/AppTextInput';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppTextArea } from '../../components/AppTextArea';
import { AppDatePicker } from '../../components/AppDatePicker';
import AppAttachment from '../../components/AppAttachment';
import { AppButton } from '../../components/AppButton';
import styles from '../../assets/css/style';
import AppDropdown from '../../components/AppDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export interface ICreate {
  name?: string;
  date: string;
  eventType:string;
  attachment?: string;
  description?: any;
}
const schema = yup.object().shape({
  name: yup.string().required('Name is Required'),
  eventType: yup.string().required('Event Type is Required'),
  date: yup.string().required('Date is Required'),

});
export default function CreateEvent() {
  const navigation = useNavigation();
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors},
  } = useForm<ICreate>({resolver: yupResolver(schema)});
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  const [currentState, setcurrentState] = useState<any>();
  const items = [
      {label: 'Event', value: 'event'},
      {label: 'Out of Office', value: 'outofoffice'},
      {label: 'Task', value: 'task'}
  ];
  const [selectedDate, setSelectedDate] = useState('');
  const onSubmit = handleSubmit(values => {
    storeData(values)
  });
  
  const storeData = async (value:any) => {
    // console.log(value);
    let datatopush=[];
    const jsonValue = JSON.stringify(value);
    datatopush.push(jsonValue);
    try {
      let olddata = await AsyncStorage.getItem('ListData')
      console.log('old data',olddata);
      if(olddata !== null) {
        olddata= JSON.parse(olddata);
        olddata?.map((item)=>{
          return datatopush.push(item);
        })
      }
      datatopush=JSON.stringify(datatopush)
      console.log(datatopush);
      await AsyncStorage.setItem('ListData',datatopush)
      navigation.goBack()
    } catch (e) {
      console.log('sdaasds',e);
    }
  }
  return (
    <View style={{padding:20,backgroundColor:'#ffffff'}}>
        <AppTextInput
          name="name"
          control={control}
          textInputProps={{
            placeholder: 'Name',
            style: {fontSize: 18},
          }}
        />
        {errors.name && (
            <Text style={[styles.errorField, {marginTop: 5}]}>
              {errors.name?.message}
            </Text>
          )}
        <AppTextArea
          name={'description'}
          control={control}
          textInputProps={{maxLength:1000, placeholder: 'Description', style: {fontSize: 18}}}
        />
        <AppDatePicker
          name="date"
          control={control}
          textInputProps={{placeholder: 'Date'}}
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        {errors.date && (
            <Text style={[styles.errorField, {marginTop: 5}]}>
              {errors.date?.message}
            </Text>
          )}
          <AppDropdown
              name="eventType"
              control={control}
              dropdownInputProps={{placeholder: 'Event Type'}}
              data={items ?? []}
              setCurrentValue={setcurrentState}
              currentValue={currentState}
              outerViewProps={{
                style:{marginVertical:5}
              }}
            />
            {errors.eventType && (
            <Text style={[styles.errorField, {marginTop: 5}]}>
              {errors.eventType?.message}
            </Text>
          )} 
        <AppAttachment
          outerViewProps={{style: {height: 150}}}
          control={control}
          name="attachment"
        />

        <AppButton
          text="Create Event"
          buttonProps={{
            onPress: onSubmit,
            style: { height: 50, width: '100%', marginVertical:10 },
          }}
          innerTextProps={{
            style: {color: '#FFFFFF', fontSize: 18},
          }}
        />
    </View>
  );
}
