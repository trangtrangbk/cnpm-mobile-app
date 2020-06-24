import React, { Component } from 'react';
import { StyleSheet, Dimensions, Alert, ToastAndroid} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import changePassword from '../../../api/changepassword'
import getToken from '../../../api/getToken';
import Route from '../../../constants/Route';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik'
import * as yup from 'yup'
import { Button, Block, Text, Input } from '../../../components';
import * as theme from '../../../constants/theme';
const { height } = Dimensions.get('window');

const validationSchema = yup.object().shape({
  currentPassword: yup.string().label('Current Password').required(),
  password: yup.string().label('Password').required().min(3, 'Seems a bit short...').max(10, 'We prefer insecure system, try a shorter password'),
  confirmPassword: yup.string().label('Confirm password').test('passwords-match', 'Passwords must match ya fool', function(value) {
    return this.parent.password === value;
  }),
})

export const ChangePassword = ({ navigation }) =>{
  const [loading, setLoading] = React.useState(false);
  const changePass = async (values , navigation) =>{
    setLoading(true)
    getToken()
      .then(token => {
        changePassword( token, values.currentPassword, values.password)
          .then(res => {
            console.log(res)
            if(res.message === 'Password was changed') {
              setLoading(false)
              onSuccess(navigation)
            }
            else {
              setLoading(false)
              onFail();
            }
          });
        
      })
  }
  
  const onSuccess = (navigation) =>{
    Alert.alert(
      'Notice',
      'Change password on Successfully',
      [
        { text:'OK', onPress: () => navigation.navigate(Route.HOMEPAGE) }
      ],
      {cancelable: false}
    )
  }
  const onFail = () => {
    ToastAndroid.show("Wrong username or password!", ToastAndroid.SHORT);
  };
  const _showLoading = () =>{
    if(loading) 
      return <Spinner visible={loading}  textStyle={{color: '#FFF'}}/>
  }
    return (
      <KeyboardAwareScrollView 
      style={{ marginVertical: 60 }} 
      showsVerticalScrollIndicator={false}>
        {_showLoading()}
        <Formik
        initialValues = {{currentPassword :'', password: '', confirmPassword: ''}}
        onSubmit = {(values) => {
          changePass(values, navigation)
        }}
        validationSchema = {validationSchema}>
        {formikProps => (
          <Block center>
            <Text h3 style={{ marginBottom: 6, marginTop :25 }}>
              Change password
            </Text>
            <Block center style={{ marginTop: 25 }}>
              <Input
                full
                password
                label="Current Password"
                style={{ marginBottom: 25 }}
                formikProps = {formikProps}
                formikKey = 'currentPassword'
                autoFocus
              />
              <Input
                full
                password
                label="Password"
                style={{ marginBottom: 25 }}
                formikProps = {formikProps}
                formikKey = 'password'
              />
              <Input
                full
                password
                label="Confirm password"
                style={{ marginBottom: 25 }}
                formikProps = {formikProps}
                formikKey = 'confirmPassword'
              />

              <Button
                full
                style={{ marginBottom: 12 }}
                onPress={ formikProps.handleSubmit}
              >
                <Text button>Change Password</Text>
              </Button>
          </Block>
        </Block>
        
        )}
        </Formik>
        
      </KeyboardAwareScrollView>
    )
  }


const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    backgroundColor: theme.colors.white,
  },
  active: {
    borderColor: theme.colors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.lightblue,
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  icon: {
    flex: 0,
    height: 48,
    width: 48,
    borderRadius: 48,
    marginBottom: 15,
    backgroundColor: theme.colors.lightblue
  },
  check: {
    position: 'absolute',
    right: -9,
    top: -9,
  }
})