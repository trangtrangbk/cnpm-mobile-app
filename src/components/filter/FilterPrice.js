import React from 'react';
import { 
  View,
  Text, 
  Dimensions, 
  TouchableOpacity, 
  Image, 
  StyleSheet
 } from 'react-native';
var { width, height } = Dimensions.get('window');

import Button from '../../components/Button'
import icGear from '../../assets/icons/gear.png'
export const FilterPrice = ({hide, price ,setShowForm , handleOnChoseValues}) =>{
  let arr = price.title.split(',');
  let min  = Number(arr[0]).toFixed(0).replace(new RegExp('\\d(?=(\\d{3})+$)', 'g'), '$&,');
  let max  = Number(arr[1]).toFixed(0).replace(new RegExp('\\d(?=(\\d{3})+$)', 'g'), '$&,');
    return(
      <View style = {{ marginLeft: 10}}>
        <TouchableOpacity style={ hide === 1 ?styleTFilters.active:styleTFilters.unactive} onPress = { () => handleOnChoseValues(0, 1000000, 1)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center', marginTop: 2}}>Dưới 1,000,000 VND</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={ hide === 2 ?styleTFilters.active:styleTFilters.unactive} onPress = { () => handleOnChoseValues(1000000, 2000000,2)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center', marginTop: 2}}>Từ 1,000,000 đến 2,000,000 VND</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={ hide === 3 ?styleTFilters.active:styleTFilters.unactive} onPress = { () => handleOnChoseValues(2000000, 5000000,3)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center', marginTop: 2}}>Từ 2,000,000 đến 5,000,000 VND</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={ hide === 4 ?styleTFilters.active:styleTFilters.unactive}
          onPress = {() => {if(hide === 4) handleOnChoseValues(0, 0, 4)}}>
          <View style={[styleTFilters.title,{flexDirection: 'row', marginLeft: width/3}]} >
            <Text style={{ textAlign: 'center'}}>{price.title!==''&& hide ===4 ? `${min} đến ${max}` : '... đến ...'}</Text>
            <Button style={[price.title !== ''&& hide ===4 ? {backgroundColor:'#b3ccff', marginLeft: 20}:{backgroundColor:'white', marginLeft: 70},{width: 50, marginTop: -10, height: 40}]} 
            onPress = {() => setShowForm(true)}>
              <Image source={icGear} style ={styleTFilters.icon}/>
            </Button>
          </View>
        </TouchableOpacity>
      <View style={styleTFilters.divider} />
     </View>
    )
  }
  const styleTFilters = StyleSheet.create({
    active:{
      borderRadius: 10,
      backgroundColor: '#b3ccff'
    },
    unactive: {
      borderRadius: 10,
      backgroundColor: 'white'
    },
    title: {
      marginTop: 10,
      height: height/20
    },
    divider:{
      width: width-20,
      height: 1,
      backgroundColor: '#DADBDC',
    },
    icon: {
      height: 25,
      width: 25
    }
  })