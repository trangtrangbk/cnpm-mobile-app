import React from 'react';
import { 
  View,
  Text, 
  Dimensions, 
  TouchableOpacity, 
  StyleSheet
 } from 'react-native';
var { width, height } = Dimensions.get('window');
export const FilterItem = ({item, current, handleOnClick}) =>{
    let status = false;
    if( current === item.code)  {
      status = true
    }
    return (
      <View style={{
        width: width-20,
        marginLeft: 10,
        borderRadius: 10,
      }}>
        <TouchableOpacity style={status?styleTFilters.active:styleTFilters.unactive} onPress = {() =>  handleOnClick(item)}>
            <View style={styleTFilters.title}>
              <Text style={{alignSelf: 'center'}}>{item.title}</Text>
            </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
      </View>
    );
  }
  const styleTFilters = StyleSheet.create({
    active:{
      borderRadius: 10,
      backgroundColor: '#b3ccff'
    },
    unactive: {
      borderRadius: 10,
      backgroundColor: 'white'
    },
    title: {
      marginTop: 10,
      height: height/20
    },
    divider:{
      width: width-20,
      height: 1,
      backgroundColor: '#DADBDC',
    },
    icon: {
      height: 25,
      width: 25
    }
  })