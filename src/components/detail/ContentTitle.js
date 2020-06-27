
import React from 'react';
import { Image,StyleSheet, View, Dimensions , Linking, TouchableOpacity} from 'react-native';

var { width,height } = Dimensions.get('window');
import {Text, Block} from '../../components';

import icEnergy from '../../assets/icons/energy.png';
  export const ContentTitle = ({isShowText, area, price, title}) =>{
    return(
      <View style = {styles.info1}>
        <Text style={styles.title}>
            {title}
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

  const styles = StyleSheet.create({
    info1: {
      backgroundColor: 'white', 
      borderRadius: 10 , 
      width: width-25
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
   