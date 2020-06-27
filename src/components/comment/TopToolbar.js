import React from 'react';
import { 
  View,
  StyleSheet, 
  Text, 
  Dimensions
} from 'react-native';
var { width, height } = Dimensions.get('window');
export const TopToolbar = ({name}) =>{
    return(
      <View style={styleTopBars.view}>
        <Text numberOfLines={1}>Bình luận[ {name} ]</Text>
      </View>
    )
  }
  const styleTopBars = StyleSheet.create({
    view: {
      height: 60,
       width: width, 
       backgroundColor: 'white', 
       alignItems: 'center', 
       justifyContent: 'center'}
  }); 