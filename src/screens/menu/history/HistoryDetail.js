import React, { Component } from 'react';
import { Image,StyleSheet, View, Dimensions , Linking, ViewComponent} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Swiper from 'react-native-swiper'

import moment from 'moment';

let viLocale = require('moment/locale/vi');
moment.locale('vi',viLocale)
var { width,height } = Dimensions.get('window');


import {Button, Text, Block, Divider} from '../../../components';
import saveNew from '../../../api/saveNew';
import getNewsInStorage from '../../../api/getNewsInStorage';
import icEnergy from '../../../assets/icons/energy.png';
import icMap1 from '../../../assets/icons/ic_map.png';
import icCall1 from '../../../assets/icons/ic_outgoing-call-detail.png';
import icCalendar from '../../../assets/icons/ic_calendar-detail.png';


export const HistoryDetail = ({navigation , route})=>{
  const [save, setSave] = React.useState(false);// data: list
  const [isShowText, setShowText] = React.useState(true);

  React.useEffect(() => {
    

      let myVar = setInterval(async ()=>{
        await setShowText(isShowText =>  !isShowText)
      }, 500);
    return () => {
        clearInterval(myVar);
    };
  }, []);
  const _showInfo1 = () =>{
    const { price, area} =route.params.item;
    return(
      <View style = {styles.info1}>
        <Text style={styles.title}>
            {route.params.item.title}
        </Text>
        <Block center middle style = {styles.f}>
          <View style = {{flexDirection:'row'}}>
              <View style = { isShowText? styleEnergy.active : styleEnergy.un_active}>
                  <Image source={icEnergy} style={styleEnergy.icon}/>
              </View> 
              <Text style = {{textTransform: 'uppercase', color: '#6E6E6E'}}> Giá: </Text>
              <Text style = {{ color: '#F83A89'}}> {price.toFixed(0).replace(new RegExp('\\d(?=(\\d{3})+$)', 'g'), '$&,')} VND/căn</Text>
          </View>
          <View style =  {styles.divider1} />
          <View style = {{flexDirection:'row', marginTop: 10}}>
            <Block center middle style = {{flex: 1, flexDirection: 'column'}}>
              <Text style = {{fontSize: 10 }}>CÒN PHÒNG</Text>
                <Text style = {{fontSize: 15, color: '#F83A89'}}>Còn</Text>
            </Block>
            <Block center middle style = {{flex: 1, flexDirection: 'column'}}>
              <Text style = {{fontSize: 10}}>DIỆN TÍCH</Text>
                <Text style = {{fontSize: 15, color: '#F83A89'}}> {area} m2 </Text>
            </Block>
          </View>
        </Block>
      </View>);
  }
  const _showInfo2 = () =>{
    const { phone, address} =route.params.item;
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
      </View>);
  }
  const _showInfo3 = () =>{
    const { createDay } =route.params.item;
    return(
      <View style = {styles.info3} >
        <Text style={{ marginBottom: 6 , marginLeft : 15, marginTop: 8, fontSize: 21}}>
          Ngày đăng
        </Text>
        <View style = {{flexDirection: 'row', marginLeft: 15, marginBottom: 10}}>
          <Image source={icCalendar} style={[styles.icon, {marginTop: 5}]}/>
          <Text style = {{marginLeft: 12, marginTop: 6}}>{moment(createDay).fromNow()} - {moment(createDay).format('DD/MM/YYYY')}</Text>
        </View>
      </View>);
  }
  const _showInfo4 = () => {
    const { description } =route.params.item;
    return(
      <View style = {styles.info4} >
        <Text style={{ marginBottom: 6 , marginLeft : 15, marginTop: 8, fontSize: 21}}>
          Chi tiết
        </Text>
        <View style = {{ marginLeft: 15, marginBottom: 10 }}>
          <Text style = {{fontSize: 14, lineHeight: 25}}>{description}</Text>
        </View>
      </View>);
  }
  const _showImage = () =>{

    return(
        <Swiper style= {{height: 250}} showsButtons={true}>
          {route.params.item.picture.map(item =>{
            return <Image
              style = {styles.img}
              source={{
                uri: item,
            }}/> 
          })}
        </Swiper>
    )
  }
  const _showMain = () =>{
    return(
    <View style = {styles.info}>
      { _showInfo1() }
      { _showInfo2() }
      { _showInfo3() }
      { _showInfo4() }
    </View>);
  }
  return (
    <View style = {{flex: 1}}>
      <KeyboardAwareScrollView style = {styles.main}>
        <View>
          {_showImage()}
        </View>
        { _showMain() }
      </KeyboardAwareScrollView>
      <View style =  {styles.divider} />
    </View>);
}
const styles = StyleSheet.create({
  main: {
    height: height - height/10,
  },
  img : {
    height: height/3+15,
    width: width,
  },
  below:{
    flexDirection: 'row',
    height: height/10,
  },
  box1: {
    flex: 1,
  },
  button_below: {
    borderRadius:18,
    borderWidth: 1,
    borderColor: '#C6D1D1',
    marginTop : 7,
    backgroundColor: 'white', 
    width: width/4, 
    marginLeft: width/30, 
    flexDirection: 'row',
  },
  fontSize:{
    fontSize: 18, 
  },
  button_text: {
    marginLeft : 10, 
    color: '#C6D1D1'
  },
  info: {
    flexDirection: 'column',
    backgroundColor: '#F6F7F9', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  info1: {
    backgroundColor: 'white', 
    borderRadius: 10 , 
    width: width-25
  },
  info2: {
    backgroundColor: 'white', 
    borderRadius: 10 , 
    width: width-25 , 
    marginTop: 10
  },
  info3:{
    backgroundColor: 'white', 
    borderRadius: 10 , 
    width: width-25 , 
    marginTop: 10}
   ,
   info4: {
    backgroundColor: 'white',
    borderRadius: 10 , 
    width: width-25 , 
    marginTop: 10
  }, 
  divider:{
    width: width, 
    height: 1 , 
    backgroundColor: '#E9E9E9'
  },
  title: { 
    marginBottom: 6 , 
    marginLeft : 15, 
    marginTop: 8, 
    fontSize: 24
  },
  divider1:{ width: width-25, height: 1 , backgroundColor: '#E9E9E9', marginTop: 10},
  f: {flexDirection: 'column', marginTop: 10, marginBottom: 10, fontSize: 25 },
  icon: {
    width: 20,
    height: 20,
  },

});
const styleEnergy = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  active: {
      opacity: 1, 
  },
  un_active: {
      opacity: 0, 
  },
}); 
 


