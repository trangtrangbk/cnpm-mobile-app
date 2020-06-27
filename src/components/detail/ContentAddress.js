import React from 'react';
import { Image,StyleSheet, View, Dimensions } from 'react-native';

var { width,height } = Dimensions.get('window');


import { Text } from '../../components';

import icMap1 from '../../assets/icons/ic_map.png';
import icCall1 from '../../assets/icons/ic_outgoing-call-detail.png';
  export const ContentAddress = ({ address, phone }) =>{
    return(
    <View style = {styles.info2} >
        <Text style={{ marginBottom: 6 , marginLeft : 15, marginTop: 8, fontSize: 21}}>
          Địa chỉ
        </Text>
        <View style = {{flexDirection: 'row', marginLeft: 15}}>
          <Image source={icMap1} style={styles.icon}/>
          <Text style = {{marginLeft: 8,lineHeight: 25, width: width-80}}> {address}</Text>
        </View>
        <View style = {{flexDirection: 'row', marginLeft: 15, marginBottom: 10}}>
          <Image source={icCall1} style={[styles.icon, {marginTop: 5}]}/>
          <Text style = {{marginLeft: 12, marginTop: 6}}>{phone}</Text>
        </View>
    </View>      
    );
  }
  const styles = StyleSheet.create({
    info2: {
      backgroundColor: 'white', 
      borderRadius: 10 , 
      width: width-25 , 
      marginTop: 10
    },
    icon: {
      width: 20,
      height: 20,
    },
  });
   