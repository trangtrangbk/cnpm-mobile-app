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
export const FilterArea = ({hide, area ,setShowForm , handleOnChoseValues}) =>{
  console.log(hide, area)
    return(
      <View style = {{ marginLeft: 10}}>
        <TouchableOpacity style={hide == 1?styleTFilters.active:styleTFilters.unactive} onPress = { () => handleOnChoseValues(0, 20, 1)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center'}}>Dưới 20m2</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={hide == 2?styleTFilters.active:styleTFilters.unactive} onPress = { () => handleOnChoseValues(20, 40, 2)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center'}}>Từ 20 đến 40m2</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={hide == 3?styleTFilters.active:styleTFilters.unactive} onPress = { () => handleOnChoseValues(40, 60, 3)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center'}}>Từ 40 đến 60m2</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={ hide === 4 ?styleTFilters.active:styleTFilters.unactive}
          onPress = {() => { if(hide === 4 ) {
            handleOnChoseValues(0, 0, 4)
          }}}>
          <View style={[styleTFilters.title,{flexDirection: 'row', marginLeft: width/3 }]} >
            <Text style={{textAlign: 'center', marginTop: 2, marginLeft: 30}}>{ area.title!==''&& hide === 4 ? area.title.replace(',',' đến '): '... đến ...'}</Text>
            <Button style={[area.title !== ''&& hide === 4 ? {backgroundColor:'#b3ccff', marginLeft: 20}:{backgroundColor:'white', marginLeft: 60},{width: 50, marginTop: -10, height: 40}]} 
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