import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { store } from '../store/redux';
import { logOutUser } from '../store/userSlice';
function onError(error: Error){
  if(error.message=='Unauthorized'){
    store.dispatch(logOutUser());
  }
  else{
    Alert.alert('Error',error.message)
  }
}
export {onError}