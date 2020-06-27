import React from 'react';
import { View ,StyleSheet, Dimensions, TextInput} from 'react-native';
import NumberFormat from 'react-number-format';
import Textarea from 'react-native-textarea';


import {Text } from '../index'

var { width, height } = Dimensions.get('window');
export const Contact = ({formikProps}) =>{
    return (
    <View style={viewStyles.item}>
        <View style = {[styles.item, { width: width-40}]}>
            <Text style={styles.label}>Tiêu đề:</Text>
            <TextInput
                style={{marginLeft: 10}}
                formikProps = {formikProps}
                label='title'
                placeholder={'Ví dụ: Cho thuê phòng có điều hòa'}
                value={formikProps.values.title}
                onChangeText = {formikProps.handleChange('title')}
                onBlur = {formikProps.handleBlur('title')}/>
            <Text style = {styles.txtError}>
                {formikProps.touched['title'] && formikProps.errors['title']} 
            </Text>
            <View style={viewStyles.divider}/>
        </View>
        <View style = {viewStyles.p_a}>
            <View style={styles.item}>
                <Text style={styles.label}>Diện tích:</Text>
                <TextInput
                keyboardType='numeric'
                style={{marginLeft: 10}}
                formikProps = {formikProps}
                label='area'
                placeholder={'Ví dụ: 100'}
                value={formikProps.values.area}
                onChangeText = {formikProps.handleChange('area')}
                onBlur = {formikProps.handleBlur('area')}/>
            <Text style = {styles.txtError}>
                {formikProps.touched['area'] && formikProps.errors['area']} 
            </Text>
                <View style={viewStyles.divider}/>
            </View>
            <View style={{ width: 3*width/16, marginTop: 10, height: height/10}}>
                <Text style={{marginTop:height/25, fontSize: 20}}>m2</Text>
            </View>   
        </View>
        <View style = {viewStyles.p_a}>
            <View style={styles.item}>
                <Text style={styles.label}>Chi phí:</Text>
                <NumberFormat
                value={formikProps.values.price}
                displayType={'text'}
                thousandSeparator={true}
                renderText={value => (
                <TextInput
                    keyboardType='numeric'
                    style={{marginLeft: 10}}
                    placeholder={'Ví dụ: 1,500,000'}
                    formikProps = {formikProps}
                    label='price'
                    onChangeText = {formikProps.handleChange('price')}
                    onBlur = {formikProps.handleBlur('price')}
                    value= {value}
                />)}/>
            <Text style = {styles.txtError}>
                {formikProps.touched['price'] && formikProps.errors['price']} 
            </Text>
                <View style={viewStyles.divider}/>
            </View>
            <View style={{width: 3*width/16, marginTop: 10, height: height/10}}>
                <Text style={{marginTop:height/25, fontSize: 20}}>VND</Text>
            </View>
        </View>
        <View style = {viewStyles.description}>
            <Text style={styles.label}>Mô tả:</Text>
            <Textarea
                style={styles.textarea}
                maxLength={120}
                placeholder={'Có gì mô tả đó ...'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                value={formikProps.values.description}
                formikProps = {formikProps}
                label='description'
                formikKey = 'description'
                onChangeText = {formikProps.handleChange('description')}
                onBlur = {formikProps.handleBlur('description')}/>
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
        borderRadius: 10,},
    divider: {
        height: 1,
        backgroundColor: '#DADBDC', 
        marginBottom: 10,
        width: width-40,
        marginTop: -8,},
    p_a:{
        width: width-40, 
        flexDirection: 'row'
    },
    description: {
        marginTop: 10,
        marginLeft: 10,
        width: 2*width/3+20,
        height: height/10,
        height: height/4,
        width: width-40
    }
    
  });