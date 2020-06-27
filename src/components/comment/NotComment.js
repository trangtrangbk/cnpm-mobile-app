import React from 'react';
import { 
  View,
  StyleSheet, 
  Text, 
  Dimensions
} from 'react-native';

var { width, height } = Dimensions.get('window');
export const NotComment = () =>{
    return(
    <View style = {styles.container1}>
        <Text style = {styles.header}>Chưa có bình luận nào</Text>
    </View>
    )
  }
  const styles = StyleSheet.create({
    header: {
      marginTop: width/2
    },
    container1: {
      alignItems: 'center',
      justifyContent: 'center'
    },
})