import React from 'react';
import { Image,StyleSheet, View, Dimensions } from 'react-native';


import moment from 'moment';

let viLocale = require('moment/locale/vi');
moment.locale('vi',viLocale)
var { width,height } = Dimensions.get('window');


import { Text } from '../../components';


import icCalendar from '../../assets/icons/ic_calendar-detail.png';

export const ContentCreateDate = ({createDay}) =>{
    return(
      <View style = {styles.info3} >
        <Text style={{ marginBottom: 6 , marginLeft : 15, marginTop: 8, fontSize: 21}}>Ngày đăng </Text>
        <View style = {{flexDirection: 'row', marginLeft: 15, marginBottom: 10}}>
          <Image source={icCalendar} style={[styles.icon, {marginTop: 5}]}/>
          <Text style = {{marginLeft: 12, marginTop: 6}}>{moment(createDay).fromNow()} - {moment(createDay).format('DD/MM/YYYY')}</Text>
        </View>
      </View>
      );
  }

  const styles = StyleSheet.create({
    info3:{
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
   