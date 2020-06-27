import React from 'react';
import { 
  View,
  Text, 
  Dimensions, 
  StyleSheet
 } from 'react-native';
var { width, height } = Dimensions.get('window');
export const TopToolbar = ({title}) =>{
    return(
      <View style={styleTopBars.view}>
        <Text>{title}</Text>
      </View>
    )
}
const styleTopBars = StyleSheet.create({
    view: {height: 60, width: width, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}
  });