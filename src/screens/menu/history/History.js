import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { 
  StyleSheet, 
  Image,
  TouchableOpacity, 
  View} from 'react-native';;

import { HistoryView } from './HistoryView';
import { HistoryDetail } from './HistoryDetail';
import  HistoryChange  from './HistoryChange';
import { CommentScreen } from '../../home/CommentScreen';

import Route from '../../../constants/Route';
import icClose from '../../../assets/icons/close.png';
const Stack = createStackNavigator();

const HistoryStackScreen = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen name={Route.HISTORY} component={HistoryView} navigation ={navigation}
       options={{
        headerTransparent: true,
        title: null,
      }}
      />
      <Stack.Screen name={Route.HISTORY_DETAIL} component={HistoryDetail} 
       options={{
        headerTransparent: true,
        title: null,
      }}
      />
      <Stack.Screen name= {Route.HISTORY_CHANGE} component={HistoryChange} 
      options={{
        headerTransparent: true,
        title: 'Chỉnh sửa bài viết của bạn',
      }}
      />
    <Stack.Screen name= { Route.COMMENT } component={ CommentScreen } navigation ={navigation} 
       options={{
        headerTransparent: true,
        title: null,
        headerLeft: ()=>
        <TouchableOpacity
        style = {styles.touchableOpacity}
        onPress ={()=> navigation.navigate(Route.HISTORY_DETAIL)}>
          <View style={styles.box}> 
            <Image source ={icClose} style={styles.icon}/>
          </View>
        </TouchableOpacity>
        }}/>
    </Stack.Navigator>
  );
  export const History = ({navigation}) => {
    return (
      <HistoryStackScreen navigation={navigation}/>
    )
  }
  const styles = StyleSheet.create({
    icon: {
      marginTop: 10,
      marginLeft: 10,
      height: 30, 
      width: 30},
    touchableOpacity: {
      height: 50,
      width: 80
    },
    box: {width: 50,height: 50, backgroundColor: '#rgb(230, 238, 255)', marginLeft: 5, borderRadius: 50}
  })