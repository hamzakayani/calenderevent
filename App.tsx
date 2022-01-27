/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalenderView from './src/screens/CalenderView/CalenderView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListView from './src/screens/ListView/ListView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateEvent from './src/screens/CreateEvent/CreateEvent';
import { Icon } from 'react-native-elements';
import { appColors } from './src/utils/colors';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function CalenderViewStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CalenderView" component={CalenderView} options={{ title: 'Calender View' }}/>
      <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ title: 'Create Event' }}/>
    </Stack.Navigator>
  );
}
function ListViewStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListView" component={ListView} options={{ title: 'List View' }}/>
      <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ title: 'Create Event' }}/>
    </Stack.Navigator>
  );
}
const App = () => {
  return (
        <NavigationContainer>
          <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName='';
  
              if (route.name === 'ListView') {
                iconName = focused
                  ? 'list'
                  : 'list';
              } else if (route.name === 'CalenderView') {
                iconName = focused ? 'calendar' : 'calendar';
              }
  
              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} tvParallaxProperties={undefined} type='font-awesome' />;
            },
            tabBarActiveTintColor: appColors.purple,
            tabBarInactiveTintColor: appColors.darkGrey,
          })}
          >
          <Tab.Screen name="ListView" component={ListViewStackScreen} options={{headerShown:false }}/>
          <Tab.Screen name="CalenderView" component={CalenderViewStackScreen} options={{headerShown:false }} />
          </Tab.Navigator>
        </NavigationContainer>
  );
};

export default App;
