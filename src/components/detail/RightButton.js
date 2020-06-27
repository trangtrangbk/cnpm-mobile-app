import React from 'react';
import { Image, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

import { Text } from '../../components';
var {width, height } = Dimensions.get('window');
import icCall from '../../assets/icons/phone.png';
import icHeart from '../../assets/icons/love.png';
import icHeartBr from '../../assets/icons/h.png';

export const ButtonSave = ({save, handleSave, handleUnSave }) =>{ 
    return (
      <TouchableOpacity
        onPress={() =>!save ? handleSave() : handleUnSave()}
        style={styles.downButtonSave}>
        <Image
          source={!save? icHeart: icHeartBr}
          style={styles.icon}
        />
        <Text style={styles.titleSave}>{!save? 'Lưu tin': 'Đã lưu'}</Text>
      </TouchableOpacity>
    )
  }
export const ButtonCall = ({makeCall}) =>{ 
    return (
      <TouchableOpacity
        onPress={() => makeCall()}
        style={styles.downButtonCall}>
        <Image
          source={icCall}
          style={styles.downButtonImage}
        />
        <Text></Text>
      </TouchableOpacity>
    )
  }
  const styles = StyleSheet.create({
    titleSave :{
      fontSize: 13,
    },
    downButtonCall: {
      opacity: 0.5,
      borderRadius: 50,
      backgroundColor:'#ff9966',
      position: 'absolute',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      right: 10,
      top: 2*height/3,
      right: 15,
    },
  
    downButtonSave: {
      opacity: 0.5,
      borderRadius: 50,
      backgroundColor:'#5cd65c',
      position: 'absolute',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      right: 10,
      top: 2*height/3+70,
      right: 15,
    },
    downButtonImage: {
      resizeMode: 'contain',
      marginTop: 20,
      width: 30,
      height: 30,
    },
    icon: {
      width: 20,
      height: 20,
    },
  
  });
  