import React from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    Image, 
    Dimensions 
} from 'react-native';
import icMenu from '../../assets/icons/bars.png';
import icHeart from '../../assets/icons/h.png'
import icAddNew from '../../assets/icons/add_news.png'

import Route from '../../constants/Route';
var { width,height } = Dimensions.get('window');
export const TopToolbar = ({navigation}) =>{
    return <View style={styles.TopToolbar}>
        <TouchableOpacity
          style={{width: width/6}}
          onPress={() => navigation.openDrawer()}>
          <View  style={{marginLeft: 10}} >
            <Image
              source= {icMenu}
              style={{width: 25, height: 25, marginTop: 10}}/>
          </View>
        </TouchableOpacity>

        <Text style={[styles.title, {width: 7*width/15, color: 'black'}]}>Trang chủ</Text>

        <TouchableOpacity
          style={{width: width/12, width: 60}}
          onPress={() => navigation.navigate(Route.STORAGE)}>
          <View  style={{marginLeft: 10}} >
            <Image 
              source= {icHeart}
              style={{width: 25, height: 25, marginTop: 10}}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
         style={{width: width/12, width: 70}}
          onPress={() => navigation.navigate(Route.POST)}>
          <View  style={{marginLeft: 10}} >
            <Image 
              source= {icAddNew}
              style={{width: 40, height: 40, marginTop: 10}}/>
          </View>
        </TouchableOpacity>
      </View>
  }
  const styles = StyleSheet.create({
   TopToolbar:{
     flexDirection: 'row', 
     backgroundColor:'#757575'
   },
   title: {
    marginTop: 5,
    marginBottom:20,
    fontSize: 28,
    marginLeft: width/20,
   },
 }); 

