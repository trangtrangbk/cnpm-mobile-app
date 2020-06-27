
import React from 'react';
import { 
    View ,
    StyleSheet, 
    Dimensions, 
    TextInput, 
} from 'react-native';

import { Text } from '../../components/index'
var { width, height } = Dimensions.get('window');

export const PhoneContent = ({formikProps}) => {
    return (
    <View style={viewStyles.item}> 
        <View style = {[styles.item, { width: width-40}]}>
            <Text style={styles.label}>Số điện thoại:</Text>
            <TextInput
            style={{marginLeft: 10}}
            keyboardType='numeric'
            formikProps = {formikProps}
            label='phone'
            placeholder={'Ví dụ: 0123456789'}
            value={formikProps.values.phone}
            onChangeText = {formikProps.handleChange('phone')}
            onBlur = {formikProps.handleBlur('phone')}/>
            <Text style = {styles.txtError}>
                {formikProps.touched['phone'] && formikProps.errors['phone']} 
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
        borderRadius: 10,},
    divider: {
        height: 1,
        backgroundColor: '#DADBDC', 
        marginBottom: 10,
        width: width-40,
        marginTop: -8,},
  });