import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet , Image } from 'react-native';
import { Button } from 'expo-ui-kit';

import { HistoryView } from './HistoryView'
import { HistoryDetail } from './HistoryDetail'
import  HistoryChange  from './HistoryChange';


import icLeft from '../../../assets/icons/ic_left.png';

const Stack = createStackNavigator();

const HistoryStackScreen = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen name="History" component={HistoryView} navigation ={navigation}
       options={{
        headerTransparent: true,
        title: null,
      }}
      />
      <Stack.Screen name="History Detail" component={HistoryDetail} 
       options={{
        headerTransparent: true,
        title: null,
      }}
      />
      <Stack.Screen name="History Change" component={HistoryChange} 
      
      options={{
        headerTransparent: true,
        title: 'Chỉnh sửa bài viết của bạn',
      }}
      />
    </Stack.Navigator>
  );

  export const History = ({navigation}) => {
    return (
      <HistoryStackScreen navigation={navigation}/>
    )
  }