import React from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
var { width,height } = Dimensions.get('window');
import { Text } from '../../components';
import icAvatar from '../../assets/icons/avatar.png';

export const ContentAvatar = ({ name , avatar}) => {
    return(
      <View style = {styles.info5 } >
        <Image 
        source={!avatar?icAvatar:{uri: avatar}}
        style={styles.avatar}/>
        <Text style={styles.titleName}> {name}</Text>
      </View>);
  }
  const styles = StyleSheet.create({
    avatar: {
        marginLeft: 20,
        height: 60,
        width:60,
        borderRadius: 100,
        marginBottom: 16,
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
    },
    info5: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10 , 
        width: width-25 , 
        marginTop: 10
    },
    titleName: {
        marginTop: 10,
        marginLeft: 15
    },
})