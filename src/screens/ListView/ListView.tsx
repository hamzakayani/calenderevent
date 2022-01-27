import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity, Alert, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Card, Icon } from 'react-native-elements';
import styles from '../../assets/css/style';
import DropDownPicker from 'react-native-dropdown-picker';
import { AppButton } from '../../components/AppButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appColors } from '../../utils/colors';
import moment from 'moment';


export default function ListView() {
    const navigation = useNavigation();
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
            console.log('old data',JSON.parse(olddata));
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
        console.log(value);
        setlistData(value ? listData.filter((x:any)=> JSON.parse(x).eventType==value) : listData)
    }, [value]);

    useEffect(() => {
        setOpen(false);
    }, [listData]);

  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#ffffff'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:20,paddingBottom:0}}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Filter'}
                containerStyle={{
                    width:Dimensions.get('screen').width/2
                }}
                style={{
                    width:Dimensions.get('screen').width/2-40
                }}
            />
            <AppButton
                text="Create Event"
                buttonProps={{
                    onPress() {
                        navigation.navigate('CreateEvent')
                    },
                    style: { height: 50, width: Dimensions.get('screen').width/2-40},
                }}
                innerTextProps={{
                    style: {color: '#FFFFFF', fontSize: 18},
                }}
            />
        </View>
        <FlatList
        data={listData}
        contentContainerStyle={{paddingBottom:20}}
        ListEmptyComponent={
            <Text style={{textAlign: 'center'}}>
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

export function Cards ({data,list,index,setlistData}:any) {
    const alertToShow = (title:any) =>
    Alert.alert(
        title,
      "Are you sure?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
            if(title=='Delete'){
                Delete()
            }
            console.log("OK Pressed")} }
      ]
    );
    const Delete=async()=>{
        list.splice(index, 1);
        console.log(list);
        setlistData(list)
        let listtoJSON=JSON.stringify(list);
        await AsyncStorage.setItem('ListData', listtoJSON)
    }

    return (
          <Card containerStyle={{ borderRadius:10,borderColor:appColors.purple }}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Card.Title>{data.name.toUpperCase()}</Card.Title>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{alertToShow('Delete')}}>
                        <Icon name='delete' color={appColors.red} tvParallaxProperties={undefined}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{alertToShow('Edit')}}>
                        <Icon name='edit' color={appColors.darkGrey} tvParallaxProperties={undefined}/>
                    </TouchableOpacity>
                    
                </View>
            </View>
            <Card.Divider color={appColors.purple}/>
            <Text style={{ marginBottom: 10 }}>
            
            {moment(data.date).format('MM-DD-y h:mm a').toString()}
            </Text>
            {data?.description && (
                <Text style={{ marginBottom: 10 }}>
                {data?.description} 
                </Text>
            )}
            {data?.attachment && (
                <Card.Image
                style={{ padding: 0 }}
                source={{
                    uri:
                    data.attachment
                }}
                />
            )}
          </Card>
    )
}