import React from 'react';
import { View, StyleSheet, Text, Image ,Dimensions, TextInput, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Textarea from 'react-native-textarea';
import { Formik } from 'formik'
import * as yup from 'yup'

var { width,height } = Dimensions.get('window');

import { Button, Block } from '../../../components';
import  changeInfo  from '../../../api/changeinfo';
import getToken from '../../../api/getToken';
import Route from '../../../constants/Route';
import saveToken from '../../../api/saveToken';
import saveUser from '../../../api/saveUser';
import { AuthContext } from '../../../contexts/AuthContext' 


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  name: yup.string().label('name').required('Name is a required field'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
})

const ChangeInfo = async (values , navigation, chanInfo) =>{
  getToken()
    .then(token =>{
      console.log(token)
      changeInfo(token, values.name,  values.address, values.phone)
      .then(res => {
        if(res.msg === 'Success') {
          saveToken(res.token)
          saveUser(res.user)
          chanInfo();
          onSuccess(navigation)
        }
        else onFail();
      })
    })
}

const onSuccess = (navigation) =>{
  Alert.alert(
    'Notice',
    'ChangeInfo on Successfully',
    [
      { text:'OK', onPress: () => navigation.navigate(Route.DASHBOARD) }
    ],
    {cancelable: false}
  )
}
const onFail = () => {
  Alert.alert(
    'Notice',
    'An error occurred'
    [
      { text:'OK', onPress: { }}
    ],
  )
}
export const Information = ({route, navigation}) => {
  const { chanInfo } = React.useContext(AuthContext);
  return (
    <View style = {{flex: 1 }}>
      <KeyboardAwareScrollView style = {styles.main}>
        <View>
          <Image
          style = {styles.img}
          source={require('../../../assets/image-background.png')} 
          /> 
        </View>
        <View style={styles.icon}>
          <Image 
          source={{
            uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
            height: 100,
            width: 100,
            scale: 0.5,
          }}
          style = {styles.avatar}/>
          <Text style={styles.txtName}>{route.params.user.username}</Text>
        <Text style={styles.txtEmail}>{route.params.user.email}</Text>
        </View>
        <View style={ styles.content}> 


        <Formik
        initialValues = {route.params.user}
        validationSchema = {validationSchema}>

        {formikProps => (
          <Block>
            <Text style={styles.labelName}>Name:</Text>

            <TextInput 
            style={styles.input}
            formikProps = {formikProps}
            label='username'
            value={formikProps.values.username}
            onChangeText = {formikProps.handleChange('username')}
            onBlur = {formikProps.handleBlur('username')}
            />
            <Text style = {styles.txtError}>
              {formikProps.touched['username'] && formikProps.errors['username']} 
            </Text>
            <Text style={styles.labelPhone} >Phone: </Text>

            <TextInput 
            style={styles.input} 
            keyboardType = 'phone-pad'
            placeholder={'Please enter your number phone! '}
            label = 'phone'
            formikProps = {formikProps}
            value={formikProps.values.phone}
            // formikKey = 'phone'
            onChangeText = {formikProps.handleChange('phone')}
            onBlur = {formikProps.handleBlur('phone')}
            />
            <Text style = {styles.txtError}>
              {formikProps.touched['phone'] && formikProps.errors['phone']} 
            </Text>
            <Text style={styles.labelAddress}>Address: </Text>

            <Textarea
                style={styles.textarea}
                maxLength={120}
                placeholder={'Please enter your address! '}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
                value={formikProps.values.address}
                formikProps = {formikProps}
                label='address'
                formikKey = 'address'
                onChangeText = {formikProps.handleChange('address')}
                onBlur = {formikProps.handleBlur('address')}
            />

            <Button 
              style={styles.buttonSave}
              onPress={ ()=> ChangeInfo(formikProps.values, navigation, chanInfo)}>
              <Text button style={styles.txtSave}> Lưu thông tin</Text>
            </Button>
          </Block>
        )}
        </Formik>
        </View>
        
      </KeyboardAwareScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  txtSave: {
    color: 'white', 
    fontSize: 18}
  ,
  main: {
    height: height - height/10,
  },
  icon: { 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  textarea:{
    marginLeft: 50,
    marginRight: 50,
  },
  labelName:{
    marginLeft: 50,
    marginTop: 20, 
    fontSize: 15
  },
  labelPhone: {
    marginLeft: 50,
    marginTop: 15,
    color: 'black'
  },
  labelAddress:{marginLeft: 50,
    marginTop: 15
  },
  btnSave:{ 
    marginBottom: 20 , 
    marginLeft: 50, 
    marginRight: 50
  },
  buttonSave:{
    borderRadius: 25,
    marginBottom: 20,
    marginLeft: 50,
    marginRight: 50,
  }
  ,
  input:{
    marginLeft: 50,
    marginRight: 50,
    borderColor:'#F2F2F2',
    borderBottomColor: 'red',
    borderWidth: 1
  },
  txtError: {
    color: 'red', 
    marginTop: -20, 
    marginLeft: 50
  }
  ,
  content:{
    flexDirection:'column',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  avatar: {
    marginTop: -40,
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    marginLeft: 15,
  },
  txtName: {
    marginTop: -10,
    color: '#717C81',
    fontSize: 18
  },
  txtEmail: {
    fontSize: 15,
    color: 'pink'
  },
  img : {
    height: height/3+15,
    width: width,
  },
});