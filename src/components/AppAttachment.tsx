import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {Image, Pressable, Text, TextInputProps, TouchableOpacity, View, ViewProps} from 'react-native';
import {SvgProps} from 'react-native-svg';
import styles from '../assets/css/style';
import {AppButton} from './AppButton';
import DocumentPicker from 'react-native-document-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { appColors } from '../utils/colors';

interface IAppAttachment {
  outerViewProps?: ViewProps;
  textInputProps?: TextInputProps;
  icon?: React.FC<SvgProps>;
  name?: any; //should be string
  control?: any;
}

export default function AppAttachment({
  name,
  control,
  icon: Icon,
  outerViewProps = {},
  textInputProps = {},
}: IAppAttachment) {
  const [att, setatt] = useState<any>([]);
  // const MultipleDelete = (uri: any) => {
  //   const viewAttachment = multipleAttach?.filter(
  //     (attach: any) => attach.uri !== uri,
  //   );
  //   setMultipleAttach(viewAttachment);

  //   const sendAttachment = attachment?.filter(
  //     (attach: any) => attach.uri !== uri,
  //   );
  //   setAttachment(sendAttachment);
  // };
  const listAtt = att.map((task: any) => (
    <View key={task.uri} style={{margin:5}}>
      <Image
        source={{uri: task.type=='video/mp4'?'http://18.117.38.42:4200/assets/images/play.png':task.uri}}
        style={{
          width: 100,
          height: 100,
          resizeMode: 'cover',
          opacity: 0.5,
          borderRadius:3,
          backgroundColor:'black'
        }}
      />
      <TouchableOpacity
        // onPress={() => MultipleDelete(task.uri)}
        style={{position: 'absolute', top: 10, right: 10}}>
        <FontAwesomeIcon icon={faTimesCircle} color={'white'} />
      </TouchableOpacity>
    </View>
  ));
  const {field} = useController({name, control});
  const upload = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
        att.push(res);
      }
      field.onChange(att);
    } catch (err) {
      // if (DocumentPicker.isCancel()) {
      //   // User cancelled the picker, exit any dialogs or menus and move on
      // } else {
      //   throw err;
      // }
    }
  };
  return (
    <>
      <AppButton
        text="Browse file (Optional)"
        buttonProps={{
          onPress: upload,
          style: {height: 50,backgroundColor:'white',borderColor:appColors.purple,borderWidth:1,marginVertical:5,borderRadius:10},
        }}
        innerTextProps={{
          style: {
            color: '#000000',
            fontSize: 16,
            fontFamily: 'OpenSans-Regular',
            // backgroundColor:white
          },
        }}
      />
      <View>{listAtt}</View>
    </>
  );
}
