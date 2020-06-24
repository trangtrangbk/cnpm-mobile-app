import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { 
  StyleSheet, 
  Image ,
  View ,
  TouchableOpacity
} from 'react-native';
import Route from '../../constants/Route';
import { HomeScreen } from './HomeScreen';
import { DetailScreen} from './DetailScreen';
import { CommentScreen } from './CommentScreen';
import { FilterScreen } from './FilterScreen';;
import  PostScreen  from './CreateNewScreen';
import { StorageScreen } from './StorageScreen';

import icClose from '../../assets/icons/close.png';

const Stack = createStackNavigator();
  const HomeStackMain = ({navigation}) => (
    <Stack.Navigator>
      <Stack.Screen name= {Route.HOMEPAGE} component={ HomeScreen } navigation ={navigation} 
      options={{
        headerTransparent: true,
        title: null,
        }}/>
      <Stack.Screen name= {Route.DETAIL} component={ DetailScreen } navigation ={navigation} 
      options={{
        headerTransparent: true,
        title: null,
        }}/>
      <Stack.Screen name= {Route.POST} component={ PostScreen } navigation ={navigation} 
      options={{
        headerTransparent: false,
        headerStyle: {backgroundColor: '#757575'},
        title: 'Đăng phòng',
        }}/>
      <Stack.Screen name= {Route.STORAGE} component={ StorageScreen } navigation ={navigation} 
       options={{
        headerTransparent: false,
        headerStyle: {backgroundColor: '#757575'},
        title: 'Danh sách đã lưu',
        }}/>
      <Stack.Screen name= {Route.FILTER} component={ FilterScreen } navigation ={navigation} 
       options={{
        headerTransparent: true,
        title: null,
        headerLeft: ()=>
        <TouchableOpacity
        style = {styles.touchableOpacity}
        onPress ={()=> navigation.navigate(Route.HOMEPAGE)}>
          <View style={styles.box}> 
            <Image source ={icClose} style={styles.icon}/>
          </View>
        </TouchableOpacity>
         }}/>

      <Stack.Screen name= {Route.COMMENT} component={ CommentScreen } navigation ={navigation} 
       options={{
        headerTransparent: true,
        title: null,
        headerLeft: ()=>
        <TouchableOpacity
        style = {styles.touchableOpacity}
        onPress ={()=> navigation.navigate(Route.DETAIL)}>
          <View style={styles.box}> 
            <Image source ={icClose} style={styles.icon}/>
          </View>
        </TouchableOpacity>
        }}/>

    </Stack.Navigator>
  );

  export const Home = ({navigation}) => {
    return (
      <HomeStackMain navigation={ navigation }/>
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