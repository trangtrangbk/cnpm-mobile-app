import React ,{useEffect} from 'react';
import { View, StyleSheet, Text, Image ,Dimensions, TextInput, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay';
import Textarea from 'react-native-textarea';
import { Formik } from 'formik'
import * as yup from 'yup'

var { width,height } = Dimensions.get('window');
import { Button, Block } from '../../../components';
import Route from '../../../constants/Route';
import icAvatar from '../../../assets/icons/avatar.png'

import { AuthContext } from '../../../contexts/AuthContext' 
import  changeInfo  from '../../../api/changeinfo';
import getToken from '../../../storage/getToken';
import getID from '../../../storage/getID';
import saveUser from '../../../storage/saveUser'
import saveNew from '../../../api/saveNew';

export const Information = ({route, navigation}) => {
  const {chanInfo } = React.useContext(AuthContext);
  const [id, setId] = React.useState('');
  const [token, setToken] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    getID().then(ID => setId(ID))
    getToken().then(token => setToken(token))
  }, []);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    name: yup.string().label('name').required('Name is a required field'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  })
  
  const ChangeInfo = async (id, token, values, navigation, chanInfo) =>{
    setLoading(true)
    saveUser(null)
    changeInfo( id ,token, values.name,  values.address, values.phoneNumber)
        .then(res => {
          saveUser({name:values.name, address:values.address, phoneNumber: values.phoneNumber })
            chanInfo();
            setLoading(false)
            onSuccess(navigation)})
        .catch(error=> {
          setLoading(false)
          onFail();
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
        { text:'OK'}
      ],
    )
  }

  const _showLoading = () =>{
    if(loading) 
      return <Spinner visible={loading}  textStyle={{color: '#FFF'}}/>
  }
  return (
    <View style = {{flex: 1 }}>
      <KeyboardAwareScrollView style = {styles.main}>
        {_showLoading()}
        <View>
          <Image
          style = {styles.img}
          source={require('../../../assets/image-background.png')} 
          /> 
        </View>
        <View style={styles.icon}>
        <Image source={icAvatar} style = {styles.avatar}/>
          <Text style={styles.txtName}>{route.params.user.name}</Text>
        <Text style={styles.txtEmail}>{route.params.user.email}</Text>
        </View>
        <View style={ styles.content}> 


        <Formik
        initialValues = {route.params.user}
        validationSchema = {validationSchema}>

        {formikProps => (
          <Block>
            <Text style={styles.labelName}>Họ tên:</Text>

            <TextInput 
            style={styles.input}
            formikProps = {formikProps}
            label='name'
            value={formikProps.values.name}
            onChangeText = {formikProps.handleChange('name')}
            onBlur = {formikProps.handleBlur('name')}
            />
            <Text style = {styles.txtError}>
              {formikProps.touched['name'] && formikProps.errors['name']} 
            </Text>
            <Text style={styles.labelPhone} >Số điện thoại: </Text>

            <TextInput 
            style={styles.input} 
            keyboardType = 'phone-pad'
            placeholder={'Please enter your number phone! '}
            label = 'phoneNumber'
            formikProps = {formikProps}
            value={formikProps.values.phoneNumber}
            formikKey = 'phoneNumber'
            onChangeText = {formikProps.handleChange('phoneNumber')}
            onBlur = {formikProps.handleBlur('phoneNumber')}
            />
            <Text style = {styles.txtError}>
              {formikProps.touched['phoneNumber'] && formikProps.errors['phoneNumber']} 
            </Text>
            <Text style={styles.labelAddress}>Địa chỉ: </Text>

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
              onPress={ ()=> ChangeInfo(id, token, formikProps.values, navigation, chanInfo)}>
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
    fontSize: 15,
    color: 'black'
  },
  labelPhone: {
    marginLeft: 50,
    marginTop: 15,
    color: 'black'
  },
  labelAddress:{
    marginLeft: 50,
    marginTop: 15,
    color: 'black'
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
    width: 100,
    height:100,

    marginTop: -40,
    borderRadius: 100,
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