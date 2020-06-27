import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

import icLocationFilter from '../../assets/icons/location2.png'
import icDown from '../../assets/icons/down-arrow.png'
import icArea from '../../assets/icons/area.png'
import icPrice from '../../assets/icons/price.png'

import Route from '../../constants/Route';
var { width,height } = Dimensions.get('window');
export const ShowFilter = ({ navigation ,isShowFilter, _handleLoadDataFilter }) => {

    const [ city, setCity ] = React.useState({code: -1, name: ''});
    const [ district, setDistrict ] = React.useState({code: -1, name:''});
    const [ ward, setWard ] = React.useState({code: -1, name:''});
    const [ price, setPrice ] = React.useState({code: -1, title: ''});
    const [ area, setArea ] = React.useState({code: -1, title: ''});

    const _handleFilterCity = (item) => {
      setCity({code: item.code, name: item.title})
      setDistrict({code: -1, name:''})
      setWard({code: -1, name: ''})
    }
    const _handleFilterDistrict = (item) => {
      setDistrict({code: item.code, name: item.title})
      setWard({code: -1, name: ''})
    }
    const _handleFilterWard = (item) => {
      setWard({code: item.code, name: item.title})
    }
    const _handleFilterArea = ({code, title}) => {
      setArea({code, title})
    }
    const _handleFilterPrice= ({code, title}) => {
      setPrice({code, title})
    }
    const _handleUnFilterCity = () => {
      setCity({code: -1, name: ''})
      _handleUnFilterDistrict();
    }
    const _handleUnFilterDistrict = () => {
      setDistrict({code: -1, name:''})
      _handleUnFilterWard();
    }
    const _handleUnFilterWard = () => {
      setWard({code: -1, name: ''})
    }
      if(isShowFilter) 
        return (
            <View style={styleFilters.container}>
              <View style = {{width:width/2-20, marginLeft: 15,}}>
                <TouchableOpacity
                onPress = {()=> navigation.push(Route.FILTER,
                  {
                    filter: 1, 
                    city ,
                    price,
                    area,
                    title: 'Chọn Tỉnh/Thành phố', 
                    _handleFilter: _handleFilterCity, 
                    _handleUnFilter: _handleUnFilterCity,
                    _handleLoadDataFilter
                  })}
                style = {styleFilters.item}>
                  <View  style={{marginLeft: 10, flexDirection: 'row'}} >
                    <Image source= {icLocationFilter} style ={styleFilters.icon}/>
                        <Text style={styleFilters.title}>{city.name ===''? 'Tỉnh/Thành Phố': city.name}</Text>
                    <Image source= {icDown} style ={styleFilters.icon1}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {()=> navigation.push(Route.FILTER,
                  {
                    filter: 2, 
                    city, 
                    district, 
                    price,
                    area,
                    title: 'Chọn Quận/Huyện',
                    _handleFilter: _handleFilterDistrict, 
                    _handleUnFilter: _handleUnFilterDistrict, 
                    _handleLoadDataFilter
                  })}
                style = {[styleFilters.item, {marginTop: 6}]}>
                  <View  style={{marginLeft: 10, flexDirection: 'row'}} >
                    <Image source= {icLocationFilter} style ={styleFilters.icon}/>
                      <Text style={styleFilters.title}>{district.name ===''? 'Quận/Huyện': district.name}</Text>
                    <Image source= {icDown} style ={styleFilters.icon1}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {()=> navigation.push(Route.FILTER,
                  {
                    filter: 3, 
                    city, 
                    district, 
                    ward, 
                    price,
                    area,
                    title: 'Chọn Phường/Xã', 
                    _handleFilter: _handleFilterWard, 
                    _handleUnFilter:_handleUnFilterWard, 
                    _handleLoadDataFilter
                  })}
                style = {[styleFilters.item, {marginTop: 6}]}>
                  <View  style={{marginLeft: 10, flexDirection: 'row'}} >
                    <Image source= {icLocationFilter} style ={styleFilters.icon}/>
                    <Text style={styleFilters.title} numberOfLines={1}>{ward.name ===''? 'Phường/Xã': ward.name}</Text>
                    <Image source= {icDown} style ={styleFilters.icon1}/>
                  </View>
                </TouchableOpacity>
              </View>

              <View style = {{width:width/2- 20, marginLeft: 5}}>
              <TouchableOpacity
                onPress = {()=> navigation.navigate(Route.FILTER,
                  {
                    filter: 4, 
                    title: 'Chọn khoảng giá',
                    city, 
                    district, 
                    ward, 
                    price,
                    area,
                    _handleFilter: _handleFilterPrice,
                    _handleLoadDataFilter
                  })}
                style = {styleFilters.item}>
                  <View  style={{marginLeft: 10, flexDirection: 'row'}} >
                    <Image source= {icPrice} style ={styleFilters.icon}/>
                      <Text style={styleFilters.title} numberOfLines={1} >{price.title === ''?'Chọn giá': 
                      `${Number(price.title.split(',')[0]).toFixed(0).replace(new RegExp('\\d(?=(\\d{3})+$)', 'g'), '$&,')} đến ${Number(price.title.split(',')[1]).toFixed(0).replace(new RegExp('\\d(?=(\\d{3})+$)', 'g'), '$&,')}`
                      }</Text>
                    <Image source= {icDown} style ={styleFilters.icon1}/>
                  </View>
                </TouchableOpacity>
              <TouchableOpacity
                onPress = {()=> navigation.navigate(Route.FILTER,
                  {
                    filter: 5, 
                    title: 'Chọn diện tích',
                    city, 
                    district, 
                    ward, 
                    price,
                    area,
                    _handleFilter: _handleFilterArea,
                    _handleLoadDataFilter
                  })}
                style = {[styleFilters.item, {marginTop: 6}]}>
                  <View  style={{marginLeft: 10, flexDirection: 'row'}} >
                    <Image source= {icArea} style ={styleFilters.icon}/>
                      <Text style={styleFilters.title} numberOfLines={1} >{area.title ===''? 'Chọn diện tích': area.title.replace(',', ' tới ')}</Text>
                    <Image source= {icDown} style ={styleFilters.icon1}/>
                  </View>
              </TouchableOpacity>
              </View>
            </View> 
         )
         else return null
  }
  const styles = StyleSheet.create({
    title: {
      marginTop: 5,
      marginBottom:20,
      fontSize: 28,
      marginLeft: width/20,
     },
   divider:{
     width: width,
     height: 1,
     backgroundColor: '#DADBDC',
     marginBottom: 10,
   },
   container: {
     flex: 1,
     backgroundColor: '#F2F2F2',
   },
   TopToolbar:{
     flexDirection: 'row', 
     backgroundColor:'#757575'
   },
   downButton: {
     opacity: 0.5,
     borderRadius: 50,
     backgroundColor:'rgba(255, 0, 0, 0.2)',
     position: 'absolute',
     width: 50,
     height: 50,
     alignItems: 'center',
     justifyContent: 'center',
     right: 10,
     top: 2*height/3,
   },
   downButtonImage: {
     opacity: 0.5,
     resizeMode: 'contain',
     width: 30,
     height: 30,
   },
 }); 
 const styleFilters = StyleSheet.create({
   icon1:{width: 17, height: 17, marginTop: 3},
   icon:{width: 15, height: 15, marginTop: 4},
   title: {width: width/3-20, marginLeft: 10, marginTop: 2},
   container: {
     flexDirection: 'row',
     height: 90,
     width: width,
   },
   item: {height: 25, backgroundColor: 'white',borderWidth: 1, borderColor: '#7EBFEF' ,borderRadius: 5},
 
 }); 
 
