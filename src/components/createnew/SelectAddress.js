import React from 'react';
import { View ,StyleSheet, Dimensions, TextInput, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import {Text } from '../index'
import getDistrict from '../../api/apiPlaces/getDistrict';
import geCities from '../../api/apiPlaces/getCities'
import getAddress from '../../api/apiPlaces/getAddress';
import getWard from '../../api/apiPlaces/getWards';
var { width, height } = Dimensions.get('window');

export const SelectAddress = ( { formikProps , setAddress}) => {
    const [city, setCity] = React.useState('');
    const [district, setDistrict] = React.useState('');
    const [ward, setWard] = React.useState('');
    const [cities, setListCity] = React.useState([]);
    const [districts, setListDistrict] = React.useState([]);
    const [wards, setListWard] = React.useState([]);

    React.useEffect(() => {
        let arrCity = [];
        geCities()
            .then(res => {
                for (let i =0; i< res.length ; i++) {
                    arrCity.push({label: res[i].title, value: res[i].code})
                }
                setListCity(arrCity)
            })
        return () => {
        };
      }, []);

    const onSelectCity = (value) =>{
        setListDistrict([]);
        setListWard([]);
        setCity(value)
        let arrDistrict = []
        getDistrict(value)
            .then(res => {
                for (let i =0; i< res.length ; i++) {
                    arrDistrict.push({label: res[i].title, value: res[i].code})
                }
                setListDistrict(arrDistrict)
            })
    }
    
    const onSelectDistrict = (value) =>{
        setListWard([]);
        setDistrict(value)
        let arrWard = [];
        if(value) 
            getWard(city, value)
            .then(res => {
                for (let i =0; i< res.length ; i++) {
                    arrWard.push({label: res[i].title, value: res[i].code})
                }
                setListWard(arrWard)
            })          
    }

    const onSelectWard = (value) =>{
        setWard(value)
        _handelAddress(value)
    }
    const _handelAddress = (localWard) =>{
        if(city && district && localWard)
            getAddress(city, district, localWard)
                .then(res => {
                    setAddress(res.str)
                })
    }
    return(
    <View style={viewStyles.item}>
        <View style = {[styles.item, { width: width-40}]}>
            <RNPickerSelect
            placeholder={{
                label: 'Chọn Thành Phố ...',
            }}
            label='city'
            formikProps = {formikProps}
            onValueChange={ (value ) => onSelectCity(value)}
            style= {pickerSelectStyles}
            items={cities}
            hideIcon={Platform.OS === "ios" ? false : true}/>
            <View style={viewStyles.divider}/>
        </View>

        <View style = {[styles.item, { width: width-40}]}>
            <RNPickerSelect
            placeholder={{
                label: 'Chọn Quận/Huyện ...',
            }}
            style= {pickerSelectStyles}
            onValueChange={(value) => onSelectDistrict(value)}
            items={districts}
            hideIcon={Platform.OS === "ios" ? false : true}/>
            <View style={viewStyles.divider}/>
        </View>  

        <View style = {[styles.item, { width: width-40}]}>
            <RNPickerSelect
            placeholder={{
                label: 'Chọn Phường/Xã ...',
                value: null,
            }}
            onValueChange={(value) => onSelectWard(value) }
            style= {pickerSelectStyles}
            items={wards}
            hideIcon={Platform.OS === "ios" ? false : true}/>
            <View style={viewStyles.divider}/>
        </View> 
        <View style = {[styles.item, { width: width-40}]}>
            <Text style={styles.label}>Nhập Tên Dường:</Text>
            <TextInput
            style={{marginLeft: 10}}
            formikProps = {formikProps}
            label='street'
            placeholder={'Ví dụ: Nguyễn Lương Bằng'}
            value={formikProps.values.street}
            onChangeText = {formikProps.handleChange('street')}
            onBlur = {formikProps.handleBlur('street')}/>
            <Text style = {styles.txtError}>
                {formikProps.touched['street'] && formikProps.errors['street']} 
            </Text>
            <View style={viewStyles.divider}/>
        </View>  
        <View style = {[styles.item, { width: width-40}]}>
            <Text style={styles.label}>Nhập số nhà:</Text>
            <TextInput
            style={{marginLeft: 10}}
            formikProps = {formikProps}
            label='apartment_number'
            placeholder={'Ví dụ: 54'}
            value={formikProps.values.apartment_number}
            onChangeText = {formikProps.handleChange('apartment_number')}
            onBlur = {formikProps.handleBlur('apartment_number')}/>
            <Text style = {styles.txtError}>
                {formikProps.touched['apartment_number'] && formikProps.errors['apartment_number']} 
            </Text>
            <View style={viewStyles.divider}/>
        </View>               
    </View>

    )
}

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
     label: {
       fontSize: 17,
     },
 }); 
  const viewStyles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        marginTop: 10, 
        paddingTop: 20,
        paddingBottom: 20 ,
        marginLeft: 10, 
        marginRight: 10, 
        borderWidth: 1, 
        borderColor: '#AAC4D6', 
        borderRadius: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#DADBDC', 
        marginBottom: 10,
        width: width-40,
        marginTop: -8,
    },
  });

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });