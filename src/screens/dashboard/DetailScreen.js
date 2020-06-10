import React, { Component } from 'react';
import { Image,StyleSheet, View, Dimensions , Linking, ViewComponent} from 'react-native';
import { Ionicons,  FontAwesome ,  MaterialCommunityIcons, EvilIcons} from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Moment from 'moment';
var { width,height } = Dimensions.get('window');
Moment.locale('en');
import {Button, Text, Block, Divider} from '../../components';
import ShowEnergy from '../../components/ShowEnergy';
import saveNew from '../../api/saveNew';
import getNewsInStorage from '../../api/getNewsInStorage';

import icEnergy from '../../assets/icons/ic_phone.png';

export const DetailScreen = ({navigation , route})=>{
  const [save, setSave] = React.useState(false);// data: list
  const [isShowText, setShowText] = React.useState(true);

  React.useEffect(() => {

     getNewsInStorage()
      .then(result => {
        if(result.find(item => item._id === route.params.item._id)) setSave(true);
      })

      let myVar = setInterval(async ()=>{
        await setShowText(isShowText =>  !isShowText)
      }, 500);


    return () => {
        clearInterval(myVar);
        console.log("Detail ____________________ Component-Will-Un-mount");
    };
  }, []);


  const handleSave = () =>{
    saveNew(route.params.item)
      .then(() => setSave(true));
  }

  const makeCall = () => {
    let number = route.params.item.phone;
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${'+number+'}';
    } else {
      phoneNumber = 'telprompt:${'+number+'}';
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <View style = {{flex: 1}}>
      <KeyboardAwareScrollView style = {styles.main}>
        <View>
          <Image
            style = {styles.img}
            source={require('../../assets/image-background.png')} 
          /> 
        </View>
        <View style = {{flexDirection: 'column', backgroundColor: '#F6F7F9', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
          <View style = {{backgroundColor: 'white', borderRadius: 10 , width: width-25}}>
            <Text style={{ marginBottom: 6 , marginLeft : 15, marginTop: 8, fontSize: 24}}>
              {route.params.item.title}
            </Text>
            <Block center middle style = {{flexDirection: 'column', marginTop: 10, marginBottom: 10, fontSize: 25 }}>
              <View style = {{flexDirection:'row'}}>

                <View style = { isShowText? styleEnergy.active : styleEnergy.un_active}>
                    <Image source={icEnergy} style={styleEnergy.icon}/>
                </View> 
                {/* <ShowEnergy/> */}

                <Text style = {{textTransform: 'uppercase', color: '#6E6E6E'}}> Giá: </Text>
                <Text style = {{ color: '#F83A89'}}> 16 triệu VND/căn</Text>
              </View>
              <View style =  {{ width: width-25, height: 1 , backgroundColor: '#E9E9E9', marginTop: 10}} />
              <View style = {{flexDirection:'row', marginTop: 10}}>
                <Block center middle style = {{flex: 1, flexDirection: 'column'}}>
                  <Text style = {{fontSize: 10 }}>CÒN PHÒNG</Text>
                  <Text style = {{fontSize: 15, color: '#F83A89'}}>Còn</Text>
                </Block>
                <Block center middle style = {{flex: 1, flexDirection: 'column'}}>
                  <Text style = {{fontSize: 10}}>DIỆN TÍCH</Text>
                  <Text style = {{fontSize: 15, color: '#F83A89'}}>{route.params.item.area} m2</Text>
                </Block>
              </View>
            </Block>
          </View>

          <View style = {{backgroundColor: 'white', borderRadius: 10 , width: width-25 , marginTop: 10}} >
            <Text style={{ marginBottom: 6 , marginLeft : 15, marginTop: 8, fontSize: 21}}>
              Địa chỉ
            </Text>
            <View style = {{flexDirection: 'row', marginLeft: 15}}>
              <MaterialCommunityIcons name = 'map-marker-outline' color = 'black' size = {22} style = {{marginTop: 8}} />
              <Text style = {{marginLeft: 8}}>{route.params.item.address}</Text>
            </View>
            <View style = {{flexDirection: 'row', marginLeft: 15, marginBottom: 10}}>
              <Ionicons name = 'ios-call' color = 'black' size = {21} style = {{marginTop: 5, marginLeft: 3}}/>
              <Text style = {{marginLeft: 12, marginTop: 6}}>{route.params.item.phone}</Text>
            </View>
          </View>

          <View style = {{backgroundColor: 'white', borderRadius: 10 , width: width-25 , marginTop: 10}} >
            <Text style={{ marginBottom: 6 , marginLeft : 15, marginTop: 8, fontSize: 21}}>
              Ngày đăng
            </Text>
            <View style = {{flexDirection: 'row', marginLeft: 15, marginBottom: 10}}>
              <EvilIcons name = 'calendar' color = 'black' size = {24}  size = {22} style = {{marginTop: 8, marginLeft: 3}}/>
              <Text style = {{marginLeft: 12, marginTop: 6}}>10 Ngày trước - {Moment(route.params.item.createDay).format('DD/MM/YYYY')}</Text>
            </View>
          </View>

          <View style = {{backgroundColor: 'white', borderRadius: 10 , width: width-25 , marginTop: 10}} >
            <Text style={{ marginBottom: 6 , marginLeft : 15, marginTop: 8, fontSize: 21}}>
              Chi tiết
            </Text>
            <View style = {{ marginLeft: 15, marginBottom: 10 }}>
              <Text style = {{fontSize: 14, lineHeight: 25}}>{route.params.item.description}</Text>
            </View>
          </View>

        </View>
      </KeyboardAwareScrollView>
      <View style =  {{width: width, height: 1 , backgroundColor: '#E9E9E9'}} />
      <View style = {styles.below}>
        <View style = {styles.box1}>
          <Button style = {styles.button_below} onPress={()=>makeCall()} >
            <Ionicons name = 'ios-call' color = '#C6D1D1' size = {24} />
            <Text button style = {[styles.button_text, styles.fontSize]}>Gọi</Text>
          </Button>
        </View>
        <View style = {styles.box1}>
         { !save ?<Button 
          style = {[styles.button_below, {backgroundColor: '#4D64F0'}]}
           onPress={() =>handleSave()}>
            <Text button style = {styles.fontSize}>Lưu tin</Text>
          </Button>
          :
          <Button 
          style = {[styles.button_below, {backgroundColor: '#4D64F0'}]}
           onPress={() =>handleSave()}>
            <Text button style = {styles.fontSize}>Đã lưu</Text>
          </Button>}
        </View>
        <View style = {styles.box1}>
          <Button style = {styles.button_below} >
            <Text button style = {[styles.button_text, styles.fontSize, {marginLeft: 0}]}>Vị trí</Text>
            <FontAwesome name = 'map-marker' color = '#C6D1D1' size = {24} style = {{marginLeft: 10 }} />
          </Button>
        </View>
      </View>
    </View>
  );
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
 


