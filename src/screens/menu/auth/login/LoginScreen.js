import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik'
import * as yup from 'yup'

import { Button, Block, Text, Input } from '../../../../components';
import Route from '../../../../constants/Route';
import login from '../../../../api/login'
import saveToken from '../../../../api/saveToken'
import { AuthContext } from '../../../../contexts/AuthContext' 

const { height } = Dimensions.get('window');

const validationSchema = yup.object().shape({
  email: yup.string().label('Email').email().required('Please enter your email!'),
  password: yup.string().label('Password').required().min(3, 'Seems a bit short...').max(20, 'We prefer insecure system, try a shorter password')
})

const Login = async (values, navigation, signIn) =>{

  login(values)
    .then(res => {
      if(res.token)  {
        saveToken(res.token);
        signIn();
        navigation.navigate(Route.DASHBOARD) 
      }
      else console.log('Has not token')
    })
}
export const LoginScreen = ({ navigation }) => {
   const { signIn } = React.useContext(AuthContext);
    return (
      <KeyboardAwareScrollView
        enabled
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={height * 0.2}
      >
        <Formik
        initialValues = {{email : '', password: ''}}
      

        onSubmit = {(values) => {
          Login( values ,navigation, signIn)
        }}
        validationSchema = {validationSchema}
        >
          {formikProps => (
            <Block center middle style ={{marginTop: 100}}>
              <Block flex={2.5} center>
                <Text h3 style={{ marginBottom: 6 }}>
                  Sign in to Trohot
                </Text>
                <Text paragraph color="black3">
                  Please enter your credentials to proceed.
                </Text>
                <Block center style={{ marginTop: 44 }}>
                  <Input
                    full
                    email
                    label="Email"
                    style={{ marginBottom: 25 }}
                    formikProps = {formikProps}
                    formikKey = 'email'
                    autoFocus
                  />
                  <Input
                    full
                    password
                    label="Password"
                    style={{ marginBottom: 25 }}
                    rightLabel={
                      <Text
                        paragraph
                        color="gray"
                        onPress={() => navigation.navigate('Forgot')}
                      >
                        Forgot password?
                      </Text>
                    }
                    formikProps = {formikProps}
                    formikKey = 'password'
                  />
                  <Button
                    full
                    onPress={ formikProps.handleSubmit}
                    style={{ marginBottom: 12 }}
                  >
                  <Text button >Sign in</Text>
                  </Button>
                  <Text paragraph color="gray">
                    Don't have an account? <Text
                    height={18}
                    color="blue"
                    onPress={() => navigation.navigate(Route.LOGUP)}>
                    Sign up
                  </Text>
                </Text>
              </Block>
            </Block>
          </Block>
          )}
          
        </Formik>
      </KeyboardAwareScrollView>
    )
  }
