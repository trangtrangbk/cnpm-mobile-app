import React from 'react'
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import moment from 'moment';
var { width,height } = Dimensions.get('window');
import Text from '../Text';

let viLocale = require('moment/locale/vi');
moment.locale('vi',viLocale)
import icAvatar from '../../assets/icons/avatar.png';
export const ItemComment = ({item})=>{
  return (
    <View style={styles.container}>
        <View style={styles.content}> 
        <Image source = {icAvatar} style={styles.avatar}/>
        <View style={styles.name_day}> 
            <Text style={styles.txtName}>{item.nameWriter}</Text>
            <Text style={styles.txtDay}>{moment(item.createDay).fromNow()} - {moment(item.createDay).format('DD/MM/YYYY')}</Text>
        </View>
        </View>
        <Text style={styles.txtContent}>{item.comment}</Text>
    </View>    
  )
}
 
const styles = StyleSheet.create({
    container: {
        width: width-30,
        marginLeft: 15,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor:'#D3C1C1'
      },
      content: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
      },
      txtContent: {
        color:'#2B2B38',
        marginLeft: 70,
        marginBottom:20
      },
      name_day: {
        marginLeft: 10,
      },
      txtName: {
        flexDirection: 'column',
        color: 'black',
        fontSize: 20,
      },
      txtDay: {
        color:'#767676',
        fontSize: 15.
      },
      avatar:{
        width: 50,
        height: 50,
        borderRadius: 100
      },
});

