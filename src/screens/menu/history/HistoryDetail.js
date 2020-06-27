import React from 'react';
import { 
  Image,
  StyleSheet, 
  View, 
  Text,
  Dimensions} from 'react-native';

import Button from '../../../components/Button'  
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var { width,height } = Dimensions.get('window');
import {
  ContentImage, 
  ContentTitle, 
  ContentAddress, 
  ContentCreateDate, 
  ContentDescription, } from '../../../components/detail'

import icNext from '../../../assets/icons/next.png'
import Route from '../../../constants/Route'

export const HistoryDetail = ({navigation , route})=>{
  const [isShowText, setShowText] = React.useState(true);

  React.useEffect(() => {
      let myVar = setInterval(async ()=>{
        await setShowText(isShowText =>  !isShowText)
      }, 500);
    return () => {
        clearInterval(myVar);
    };
  }, []);
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
    const {description, phone, address, price, area, title, createDay} =route.params.item;
    return(
    <View style = {styles.info}>
      <ContentTitle isShowText= {isShowText} price = {price} title ={ title} area = {area} />
       <ContentAddress phone={phone} address={address}/>
      <ContentCreateDate createDay = {createDay}/>
      <ContentDescription description = {description}/>
     {_showComment()}
    </View>);
  }
  return (
    <View style = {{flex: 1}}>
      <KeyboardAwareScrollView style = {styles.main}>
        <View>
          {_showImage()}
        </View>
       
        {_showMain()}

      </KeyboardAwareScrollView>
      <View style =  {styles.divider} />
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
    marginBottom: 50,
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


