import React from 'react';
import { 
  Image,
  StyleSheet, 
  View, 
  Dimensions , 
  Linking, 
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var { width,height } = Dimensions.get('window');
import { Button, Text } from '../../components';

import {
  ContentImage, 
  ContentTitle, 
  ContentAddress, 
  ContentCreateDate, 
  ContentDescription, 
  ContentAvatar, 
  ButtonSave, 
  ButtonCall} from '../../components/detail'

import Route from '../../constants/Route';
import getNewsInStorage from '../../storage/getNewsInStorage';
import icNext from '../../assets/icons/next.png'

export const DetailScreen = ({navigation , route})=>{
  const [save, setSave] = React.useState(false);
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
    };
  }, []);

  const handleSave = () =>{
    const {toSave } = route.params;
    setSave(true)
    toSave()
  }
  const handleUnSave = () =>{
    const {unSave } = route.params;
    setSave(false)
    unSave();
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
  const _showImage = () =>{
    const {picture} = route.params.item;
    return(
      <ContentImage picture = {picture}/>
    )
  }
  const _showComment = () => {
    const {_id, title} = route.params.item;
    return (
      <View style = {[styles.info3]} >
        <Button style={{backgroundColor: 'white', flexDirection: 'row'}} onPress = {() => navigation.push(Route.COMMENT, {id: _id,name: title})}>
          <Text style={styles.txtCmt}>Bình luận</Text>
          <Image source = {icNext} style = {styles.btnNext}/>
        </Button>
      </View>
    )
  }
  const _showMain = () =>{
    const { name , avatar} =route.params.item.user;
    const { description, phone, address, price, area, title, createDay} =route.params.item;
    return(
    <View style = {styles.info}>
      <ContentTitle isShowText= {isShowText} price = {price} title ={ title} area = {area} />
      <ContentAddress phone={phone} address={address}/>
      <ContentCreateDate createDay = {createDay}/>
      <ContentDescription description = {description}/>
      {_showComment()}
      <ContentAvatar name={name} avatar={avatar}/>  
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
      <ButtonSave save ={save} handleSave = {handleSave} handleUnSave = {handleUnSave}/>
      <ButtonCall makeCall = {makeCall}/>
    </View>);
}
const styles = StyleSheet.create({
  txtCmt: { marginBottom: 4, marginLeft : 15, marginTop: 4, fontSize: 21, width: width -80 },
  btnNext: {
    height: 20,
    width: 20,
  },

  main: {
    height: height - height/10,
  },
  info: {
    flexDirection: 'column',
    backgroundColor: '#F6F7F9', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  info3:{
    backgroundColor: 'white', 
    borderRadius: 10 , 
    width: width-25 , 
    marginTop: 10}
   ,
  divider:{
    width: width, 
    height: 1 , 
    backgroundColor: '#E9E9E9'
  },
});

 


