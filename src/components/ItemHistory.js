import React, { Component } from 'react'
import { Image, StyleSheet, View, Dimensions, Alert, TouchableOpacity } from 'react-native';
import moment from 'moment';

let viLocale = require('moment/locale/vi');
moment.locale('vi',viLocale)
var { width,height } = Dimensions.get('window');
import Text from './Text';
import Route from '../constants/Route';
import { Button } from '../components';
import icTick from  '../assets/icons/tick.png'
import icUnTick from '../assets/icons/icdelete.png'

import getKeyCode from '../api/apiPlaces/getKeyCode'
import removeNews from '../api/removeNews';
var box_height = height/5+10;

export default class ItemHistory extends Component {
  constructor(props){
    super (props);
    this.state = {
      city: -1,
      district: -1,
      ward: -1,
    }
  }
  componentDidMount = async() => {
    const {item} = this.props;
    console.log(item.address)
    await getKeyCode({address: item.address})
      .then( res => {
        this.setState({
          city: res.city,
          district: res.district,
          ward: res.ward
        })
      })
  }

  _handlerRemove = (id) =>{
    Alert.alert(
      "Hành động",
      "Bạn có chắc có muốn xóa bài viết này không. Sau khi xóa bài viết sẽ không hiển thị lại được!",
      [
        {
          text: "Hủy bỏ",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: ()=> this._doRemove(id)}
      ],
      { cancelable: false }
  )}
  _doRemove = async() => {
   const { navigation,  token, _handleRemove, item} = this.props;
   await removeNews(item._id, token)
    .then(res =>
      res.message ==='Deleted'? 
      Alert.alert(
        "Xóa bài viết",
        "Bài viết đã xóa thành công!",
        [
          { text: "OK"}
        ],
        { cancelable: false }
    )
    :
    Alert.alert(
      "Xóa bài viết",
      "Có một số lỗi xảy ra vui lòng kiểm tra lại!",
      [
        {
          text: "Ok",
          style: "cancel"
        }
      ],
      { cancelable: false }
  )).then(()=> _handleRemove(item))
  }

  render() {
    let {title, createDay, picture, status} =  this.props.item;
    let { navigation, route, item} = this.props;
    if(typeof route.params !== 'undefined' &&route.params.item._id ===item._id ) {
      item = route.params.item;
      title = route.params.item.title;
      picture = route.params.item.picture;
    }
    return (
    <View style={styles.item}>
     <View style={{alignItems: 'center'}}>
      <Image
          style = {styles.img}
          source={{
            uri: picture[0],
          }}
        />
     </View>
      <View style={styles.content}>
        <Text style={styles.name}  numberOfLines={2} >{title.toUpperCase()}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.time}>Ngày đăng:  {moment(createDay).fromNow()} - {moment(createDay).format('DD/MM/YYYY')}</Text>
          <View style={styles.viewImage}><Image source= {status? icTick: icUnTick} style={styles.icon}/></View>
        </View>
      </View> 
      <View style = {styles.below}>
          <View style = {styles.box1}>
            <TouchableOpacity style = {styles.button_below} onPress={()=> navigation.navigate('History Change', { item, ...this.state})}>
              <Text button style = {[styles.button_text, styles.fontSize]} >Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.box1}>
            <TouchableOpacity style = {[styles.button_below ]} onPress={()=>this._handlerRemove()}>
              <Text button style = {[styles.fontSize, styles.button_text ]} >Xóa</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.box1}>
            <TouchableOpacity style = {[styles.button_below ]} onPress={()=> navigation.navigate('History Detail', { item})}>
              <Text button style = {[styles.button_text, styles.fontSize, {marginLeft: 0}]} >Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
    );
  }
}
 
const styles = StyleSheet.create({
  content:{
    height: height/8,
    marginTop: 10,
    marginLeft: 20,
  },
  fontSize:{
    fontSize: 18, 
  },
  time:{
    flex: 5,
    fontSize: 15,
  },
  button_text: {
    color: '#18DA57'
  },
  button_below: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height/15,
    borderRadius:7 ,
    borderWidth: 1,
    borderColor: '#C6D1D1',
    marginTop : 7,
    backgroundColor: 'white', 
    width: width*2/7, 
    flexDirection: 'row',
  },
  box1: {
    flex: 1,
  },
  below:{
    marginLeft: height/70,
    marginTop:4,
    flex: 1,
    flexDirection: 'row',
    height: height/10,
  },
  name: {
    flex: 1,
    fontSize: 20,
  },
  item: {
    backgroundColor: '#E9EBEE',
    flex: 1,
    width: width- 20 ,
    height: height*4/7,
    borderWidth: 1, 
    borderColor: '#DADBDC', 
    borderRadius: 10, 
    marginBottom: 20,
  },
  img : {
    marginTop: 10,
    height: height/3-15,
    width: width-60,
  },
  viewImage: {
    flex: 1,
  },
  icon:{
    width: 30,
    height:30
  }
});

