import React, {useEffect } from 'react';
import { 
  View,
  StyleSheet, 
  Text, 
  Dimensions, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Button } from 'react-native';
import NumberFormat from 'react-number-format';
import { Formik } from 'formik'
import * as yup from 'yup'
var { width, height } = Dimensions.get('window');


import geCities from '../../api/apiPlaces/getCities'
import getDistricts from '../../api/apiPlaces/getDistrict';
import getWards from '../../api/apiPlaces/getWards'
import Route from '../../constants/Route';
import getContentFilter from '../../storage/getContentFilter';
import saveContentFilter from '../../storage/saveContentFilter';

import { set } from 'react-native-reanimated';


export const FilterScreen = ({navigation , route}) => {
  const [data, setData] = React.useState([]); //list địa chỉ
  let {filter, city, district, ward, price, area } = route.params;
  const {_handleLoadDataFilter} = route.params;
  const [current, setCurrent] = React.useState(-1);
  const [hide, setHide] = React.useState(0);

  const [content , setContent] = React.useState('');
  useEffect(() => {
    if(filter === 1) {
      geCities().then(res => setData(res))
      setCurrent(city.code)
    }
    else if(filter === 2 && city.code !== -1) {
      getDistricts(city.code).then(res => setData(res))
      setCurrent(district.code)
    }
    else if(filter === 3 && city.code !== -1 && district.code !== -1 ){
      getWards(city.code, district.code).then(res =>setData(res))
      setCurrent(ward.code)
    }    
    else if(filter === 4){
      setHide(price.code)
    }
    else if(filter === 5) {
      setHide(area.code)
    }

    return () => {
      _handle();
      console.log("Filters____________________Component-Will-Un-mount");
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
  }
  const _handleOnClickPrice = async(min, max , iHide) => {
    const {_handleFilter} = route.params;
    if(iHide === hide) {
      setHide(0)
      saveContentFilter('')
      _handleFilter({code: -1, title: ''})
    }
    else {
      setHide(iHide)
      saveContentFilter(`${min},${max}`)
      _handleFilter({code: iHide, title: `${min},${max}`})
    }
    
  }

  const _handleOnClickArea = (min, max , iHide) => {
    
    const {_handleFilter} = route.params;
    if(iHide === hide) {
      setHide(-1)
      saveContentFilter('')
      _handleFilter({code: -1, title: ''})
    }else {
      setHide(iHide)
      saveContentFilter(`${min},${max}`)
      _handleFilter({code: iHide, title: `${min},${max}`})
    }
  }

  const _onAddPrice = (values, hide) =>{
    setHide(hide)
    const {_handleFilter} = route.params;
    _handleFilter({code: hide, title: `${values.min},${values.max}`})
    navigation.navigate(Route.HOME)
  }
  const _onAddArea = (values, hide) =>{ 
    setHide(hide)
    const {_handleFilter} = route.params;
    _handleFilter({code: hide, title: `${values.min},${values.max}`})
    navigation.navigate(Route.HOME)
  }
  const _showTopToolbar = () =>{
    return(
      <View style={styleTopBars.view}>
        <Text>{route.params.title}</Text>
      </View>
    )
  }

  const _showViewFilterArea = (hide) =>{
    if(typeof hide ==='undefined') hide = _hide;
    return(
      <View style = {{ marginLeft: 10}}>
        <TouchableOpacity style={hide == 1?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickArea(0, 20, 1)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center'}}>Dưới 20m2</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={hide == 2?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickArea(20, 40, 2)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center'}}>Từ 20 đến 40m2</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={hide == 3?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickArea(40, 60, 3)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center'}}>Từ 40 đến 60m2</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <Formik
          initialValues = {{min: '', max: ''}}
          onSubmit = {(values) => {
            _onAddArea(values, 4)
        }}>
          {formikProps => (
            <TouchableOpacity style={hide == 4?styleTFilters.active:styleTFilters.unactive} onPress = {() => _onAddPrice({}, 4)}>
              <View style = {styles.p_a}>
                <View style={styles.item}>
                  <Text style={styles.label}>Diện tích từ:</Text>
                    <TextInput
                    keyboardType='numeric'
                    style={{marginLeft: 10}}
                    formikProps = {formikProps}
                    label='min'
                    placeholder={'Ví dụ: 100'}
                    value={formikProps.values.min}
                    onChangeText = {formikProps.handleChange('min')}
                    onBlur = {formikProps.handleBlur('min')}/>
                  <Text style = {styles.txtError}>
                      {formikProps.touched['min'] && formikProps.errors['min']} 
                  </Text>
                </View>
                <View style={{ width: 3*width/16, marginTop: 10, height: height/10}}>
                    <Text style={{marginTop:height/25, fontSize: 20}}>m2</Text>
                </View>   
              </View>
              <View style = {styles.p_a}>
                <View style={styles.item}>
                  <Text style={styles.label}>Diện tích đến:</Text>
                      <TextInput
                      keyboardType='numeric'
                      style={{marginLeft: 10}}
                      formikProps = {formikProps}
                      label='max'
                      placeholder={'Ví dụ: 150'}
                      value={formikProps.values.max}
                      onChangeText = {formikProps.handleChange('max')}
                      onBlur = {formikProps.handleBlur('max')}/>
                  <Text style = {styles.txtError}>
                      {formikProps.touched['max'] && formikProps.errors['max']} 
                  </Text>
                  </View>
                  <View style={{ width: 3*width/16, marginTop: 10, height: height/10}}>
                      <Text style={{marginTop:height/25, fontSize: 20}}>m2</Text>
                  </View>   
                </View>
            
              <TouchableOpacity onPress={ formikProps.handleSubmit}>
                <Text>Áp dụng</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </Formik>
      <View style={styleTFilters.divider} />
     </View>
    )
  }

  const _showViewFilterPrice = (hide) =>{
    if(typeof hide ==='undefined') hide = _hide;
    return(
      <View style = {{ marginLeft: 10}}>
        <TouchableOpacity style={ hide === 1 ?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickPrice(0, 1000000, 1)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center', marginTop: 2}}>Dưới 1,000,000 VND</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={ hide === 2 ?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickPrice(1000000, 2000000,2)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center', marginTop: 2}}>Từ 1,000,000 đến 2,000,000 VND</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <TouchableOpacity style={ hide === 3 ?styleTFilters.active:styleTFilters.unactive} onPress = { () => _handleOnClickPrice(5000000, 10000000,3)}>
          <View style={styleTFilters.title}>
            <Text style={{alignSelf: 'center', marginTop: 2}}>Từ 5,000,000 đến 10,000,000 VND</Text>
          </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
        <Formik
          initialValues = {{min: '', max: ''}}
          onSubmit = {(values) => {
           _onAddPrice(values, 4)
        }}>
          {formikProps => (
            <TouchableOpacity style={hide === 4?styleTFilters.active:styleTFilters.unactive} onPress = {() => _onAddPrice({}, 4)}>
              <View style = {styles.p_a}>
                <View style={styles.item}>
                  <Text style={styles.label}>Giá từ:</Text>
                    <NumberFormat
                      value={formikProps.values.min}
                      displayType={'text'}
                      thousandSeparator={true}
                      renderText={value => (
                        <TextInput
                          keyboardType='numeric'
                          style={{marginLeft: 10}}
                          placeholder={'Ví dụ: 1,500,000'}
                          formikProps = {formikProps}
                          label='min'
                          onChangeText = {formikProps.handleChange('min')}
                          onBlur = {formikProps.handleBlur('min')}
                          value= {value}/>
                        )}/>
                        <Text style = {styles.txtError}>
                          {formikProps.touched['min'] && formikProps.errors['min']} 
                  </Text>
                </View>
                  <View style={{width: 3*width/16, marginTop: 10, height: height/10}}>
                    <Text style={{marginTop:height/25, fontSize: 20}}>VND</Text>
                  </View>
              </View>

              <View style = {styles.p_a}>
                <View style={styles.item}>
                  <Text style={styles.label}>Giá đến:</Text>
                    <NumberFormat
                      value={formikProps.values.max}
                      displayType={'text'}
                      thousandSeparator={true}
                      renderText={value => (
                      <TextInput
                        keyboardType='numeric'
                        style={{marginLeft: 10}}
                        placeholder={'Ví dụ: 2,500,000'}
                        formikProps = {formikProps}
                        label='max'
                        onChangeText = {formikProps.handleChange('max')}
                        onBlur = {formikProps.handleBlur('max')}
                        value= {value}/>
                      )}/>
                  <Text style = {styles.txtError}>
                    {formikProps.touched['max'] && formikProps.errors['max']} 
                  </Text>
                </View>
                <View style={{width: 3*width/16, marginTop: 10, height: height/10}}>
                  <Text style={{marginTop:height/25, fontSize: 20}}>VND</Text>
                </View>
              </View>
              <TouchableOpacity onPress={ formikProps.handleSubmit}>
                <Text>Áp dụng</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        </Formik>
      <View style={styleTFilters.divider} />
     </View>
    )
  }


  const ItemFilter = ({item}) =>{
    let status = false;
    if( current === item.code)  {
      status = true
    }

    return (
      <View style={{
        width: width-20,
        marginLeft: 10,
        borderRadius: 10,
      }}>
        <TouchableOpacity style={status?styleTFilters.active:styleTFilters.unactive} onPress = {() => _handleOnClick(item)}>
            <View style={styleTFilters.title}>
              <Text style={{alignSelf: 'center'}}>{item.title}</Text>
            </View>
        </TouchableOpacity>
        <View style={styleTFilters.divider} />
      </View>

  );
  }
  return (
    <View style = {styles.container}>
        {_showTopToolbar()}
        <View style={styles.divider}/>
        {
          filter ===1 || filter===2 ||filter ===3 ?
          <FlatList
            data={data}
            renderItem={({ item }) => <ItemFilter item ={item}/>}
            keyExtractor={item => item._id}/>
          : 
           filter === 4 ?
            _showViewFilterPrice(hide)
            : 
            _showViewFilterArea(hide)
        } 
    </View>
  );
};
const styles = StyleSheet.create({
  txtError: {
    fontSize: 12,
    color: 'red', 
    marginTop: -20, 
    paddingBottom: 7,
    marginLeft: 16
  },
  item:{
    marginLeft: 10,
    width: 2*width/3+20,
    height: height/10,
  },
  p_a:{
    width: width-40, 
    flexDirection: 'row'
  },
  label: {
    fontSize: 17,
  },
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
const styleTopBars = StyleSheet.create({
  view: {height: 60, width: width, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}

}); 

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
})