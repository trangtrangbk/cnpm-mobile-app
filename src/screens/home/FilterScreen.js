import React, {useEffect } from 'react';
import { 
  View,
  StyleSheet,  
  Dimensions, 
  FlatList } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  FilterPrice, 
  FilterArea, 
  FilterItem, 
  TopToolbar, 
  ModelPrice, 
  ModelArea } from '../../components/filter'

import geCities from '../../api/apiPlaces/getCities'
import getDistricts from '../../api/apiPlaces/getDistrict';
import getWards from '../../api/apiPlaces/getWards';

import getContentFilter from '../../storage/getContentFilter';
import saveContentFilter from '../../storage/saveContentFilter';

import Route from '../../constants/Route';
var { width, height } = Dimensions.get('window');

export const FilterScreen = ({navigation , route}) => {
  let {filter, city, district, ward, price, area } = route.params;
  const [data, setData] = React.useState([]); 
  const {_handleLoadDataFilter} = route.params;
  const [current, setCurrent] = React.useState(-1);
  const [hide, setHide] = React.useState(0);
  const [ isLoading, setLoading ] = React.useState(true);
  const [showForm, setShowForm] = React.useState(false);
  useEffect(() => {
    
    if(filter === 1) {
      geCities().then(res => {
        setData(res)
        setLoading(false)
      })
      setCurrent(city.code)
    }
    else if(filter === 2 && city.code !== -1) {
      getDistricts(city.code).then(res => {
        setData(res)
        setLoading(false)
      })
      setCurrent(district.code)
    }
    else if(filter === 3 && city.code !== -1 && district.code !== -1 ){
      getWards(city.code, district.code).then(res =>{
        setData(res)
        setLoading(false)
      })
      setCurrent(ward.code)
    }    
    else if(filter === 4){
      setLoading(false)
      setHide(price.code)
    }
    else if(filter === 5) {
      console.log(area);
      
      setLoading(false)
      setHide(area.code)
    }
    return () => {
      _handle();
    };
  }, []);

  const _handle = () =>{
    getContentFilter()
      .then(content => {
        if(filter ===1 ) {
          _handleLoadDataFilter({city:content}, {district: ''}, {ward: ''}, {price:price.title}, {area: area.title})
        }
        else if(filter ===2) {
          _handleLoadDataFilter({city:city.name}, {district: content}, {ward: ''}, {price:price.title}, {area: area.title})
        }
        else if(filter ===3) {
          _handleLoadDataFilter({city:city.name}, {district: district.name}, {ward: content}, {price:price.title}, {area: area.title})
        }
        else if(filter ===4) {
          _handleLoadDataFilter({city:city.name}, {district: district.name}, {ward: ward.name}, {price:content}, {area: area.title})
        }
        else if(filter === 5) {
          _handleLoadDataFilter({city:city.name}, {district: district.name}, {ward: ward.name}, {price:price.title}, {area: content})
        }
    })
  }
  //address
  const _handleContent = item =>{
    const { _handleFilter } = route.params;
    saveContentFilter(item.title)
    _handleFilter(item)
  }

  const _handleUnContent = () =>{
    const { _handleUnFilter } = route.params;
    saveContentFilter('')
    _handleUnFilter();
  }

  const _handleOnClick = item =>{
      if(current === item.code) {
        setCurrent(-1)
         _handleUnContent();
        return;
      }
     setCurrent(item.code)
    _handleContent(item);
    _handle();
    navigation.navigate(Route.HOMEPAGE)
  }
//price and area
  const _handleOnChoseValues = (min, max , iHide) => {
    const {_handleFilter} = route.params;
    if(iHide === hide) {
      setHide(-1)
      saveContentFilter('')
      _handleFilter({code: -1, title: ''})
    }else {
      setHide(iHide)
      saveContentFilter(`${min},${max}`)
      _handleFilter({code: iHide, title: `${min},${max}`})
      _handle();
      navigation.navigate(Route.HOMEPAGE)
    }
  }

  const _handleAddValues = (min, max ) =>{
    console.log(min, max, '_handleAddValues')
    const {_handleFilter} = route.params;
    setHide(4)
    saveContentFilter(`${min},${max}`)
    _handleFilter({code: 4, title: `${min},${max}`})
    _handle();
    navigation.navigate(Route.HOMEPAGE)
  }
  const _showLoading = () =>{
    if(isLoading) 
      return <Spinner visible={isLoading} textStyle={{color: '#FFF'}}/>
  }
  return (
    <View style = {styles.container}>
      {_showLoading()}
        <TopToolbar title = {route.params.title}/>
        <View style={styles.divider}/>
        {
          filter ===1 || filter===2 ||filter ===3 ?
          <FlatList
            data={data}
            renderItem={({ item }) => <FilterItem item ={item} current ={current} handleOnClick ={_handleOnClick}/>}
            keyExtractor={item => item._id}/>
          : 
           filter === 4 ?
            <View>
              <FilterPrice hide ={hide} price = {price} setShowForm = {setShowForm} handleOnChoseValues = {_handleOnChoseValues}/>
              <ModelPrice hide ={hide} price ={price} showForm ={showForm}  setShowForm ={setShowForm} handleAddValues = {_handleAddValues}/>
            </View>
            : 
            <View>
              <FilterArea hide ={hide} area = {area} setShowForm = {setShowForm} handleOnChoseValues = {_handleOnChoseValues} />
              <ModelArea hide ={hide} area ={area} showForm ={showForm}  setShowForm ={setShowForm} handleAddValues = {_handleAddValues}/>
            </View>  
        } 
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  divider:{
    width: width,
    height: 1,
    backgroundColor: '#DADBDC',
    marginBottom: 10,
  },
});