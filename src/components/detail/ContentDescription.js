import React from 'react';
import { Image,StyleSheet, View, Dimensions } from 'react-native';
var { width,height } = Dimensions.get('window');
import { Text } from '../../components';
export const ContentDescription = ({description}) =>{
    return(
    <View style = {styles.info4} >
        <Text style={{ marginBottom: 6 , marginLeft : 15, marginTop: 8, fontSize: 21}}>
          Chi tiết
        </Text>
        <View style = {{ marginLeft: 15, marginBottom: 10 }}>
          <Text style = {{fontSize: 14, lineHeight: 25}}>{description}</Text>
        </View>
    </View>
      );
  }
    const styles = StyleSheet.create({
    info4: {
        backgroundColor: 'white',
        borderRadius: 10 , 
        width: width-25 , 
        marginTop: 10
      }, 
  });