import { View, Text, SafeAreaView, ScrollView, Dimensions, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppButton } from '../../components/AppButton';
import { Cards } from '../ListView/ListView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../assets/css/style';
import moment from 'moment';

export default function CalenderView() {
    const navigation = useNavigation();
    const [selectedDate, setselectedDate] = useState(moment(new Date()).format('y-MM-DD').toString());
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [listData, setlistData] = useState([]);
    const [items, setItems] = useState([
        {label: 'Event', value: 'event'},
        {label: 'Out of Office', value: 'outofoffice'},
        {label: 'Task', value: 'task'}
    ]);

    const storeData = async () => {
        try {
            let olddata = await AsyncStorage.getItem('ListData')
            if(olddata !== null) {
            setlistData(JSON.parse(olddata))
            }
        } catch (e) {
            console.log('sdaasds',e);
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            storeData()
        }, []),
    );
    useEffect(() => {
        console.log(selectedDate);
        setlistData(selectedDate ? listData.filter((x:any)=> moment(JSON.parse(x).date).format('y-MM-DD').toString()==selectedDate) : listData)
    }, [selectedDate]);

    
  return (
    <SafeAreaView style={{flex: 1,}}>
        <AppButton
                text="Create Event"
                buttonProps={{
                    onPress() {
                        navigation.navigate('CreateEvent')
                    },
                    style: { height: 30, width: Dimensions.get('screen').width/2-40,alignSelf: 'flex-end',margin:10},
                }}
                innerTextProps={{
                    style: {color: '#FFFFFF', fontSize: 18},
                }}
            />
      <Calendar
        current={new Date().toDateString()}
        minDate={new Date().toDateString()}
        onDayPress={day => {
            console.log('selected day', day);
            setselectedDate(day.dateString)
        }}
        monthFormat={'yyyy MM'}
        onMonthChange={month => {
            console.log('month changed', month);
        }}
        enableSwipeMonths={true}
        />
            <FlatList
                data={listData}
                contentContainerStyle={{paddingBottom:20}}
                ListEmptyComponent={
                    <Text style={{textAlign: 'center',padding:20}}>
                    No events to show yet
                    </Text>
                }
                renderItem={({item,index}) =>
                (<Cards data={JSON.parse(item)} list={listData} index={index} setlistData={setlistData}/>)
                }
                keyExtractor={(item, index) => '' + index}
            />
    </SafeAreaView>
  );
}
