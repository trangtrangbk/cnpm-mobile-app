import React from 'react';
import { StyleSheet, Dimensions, Alert } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Formik } from 'formik'
import * as yup from 'yup'

import Route from '../../../../constants/Route';
import { Button, Block, Text, Input } from '../../../../components/index';
import * as theme from '../../../../constants/theme';
import register from '../../../../api/register'

const { height } = Dimensions.get('window');
const validationSchema = yup.object().shape({
  name: yup.string().label('Full name').required('Name is a required field'),
  email: yup.string().label('Email').email().required('Email is a required field'),
  password: yup.string().label('Password').required().min(3, 'Seems a bit short...').max(10, 'We prefer insecure system, try a shorter password'),
  confirmPassword: yup.string().label('confirm password').test('passwords-match', 'Passwords must match ya fool', function(value) {
    return this.parent.password === value;
  }),
})
const SignUp = async (values, navigation) =>{
  register(values)
    .then(res => {
      if(res.name !=='') onSuccess(navigation)
      else onFail();
    })

}
const onSuccess = (navigation) =>{
  Alert.alert(
    'Thông báo',
    'Đăng ký thành công!',
    [
      { text:'OK', onPress: () => navigation.navigate(Route.LOGIN) }
    ],
    {cancelable: false}
  )
}
const onFail = () => {
  alert('Tài khoản đã tồn tại, vui lòng kiểm tra lại!')
}
export const LogupScreen = ({ navigation }) =>  {

  const [email, setEmail] = React.useState(''); 
    return (
      <KeyboardAwareScrollView 
      style={{ marginVertical: 60 }} 
      showsVerticalScrollIndicator={false}>
        <Formik
        initialValues = {{name :'',email: '' ,password: '', confirmPassword: ''}}
        onSubmit = {(values) => {
          SignUp( values ,navigation)
        }}
        validationSchema = {validationSchema}
        >
        {formikProps => (
          <Block center>
            <Text h3 style={{ marginBottom: 6 }}>
              Your account
            </Text>
            <Text paragraph color="black3">
              Please enter your credentials to proceed.
            </Text>
            <Block center style={{ marginTop: 25 }}>
              <Input
                full
                label = "Full name"
                style = {{ marginBottom: 25 }}
                formikProps = {formikProps}
                formikKey = 'name'
                autoFocus
              />
              <Input
                full
                email
                label = "Email"
                style = {{ marginBottom: 25 }}
                formikProps = {formikProps}
                formikKey = 'email'
              />
              <Input
                full
                password
                label = "Password"
                formikProps = {formikProps}
                formikKey = 'password'
                style={{ marginBottom: 25 }}
              />
              <Input
                full
                password
                label="confirm password"
                formikProps = {formikProps}
                formikKey = 'confirmPassword'
                style={{ marginBottom: 25 }}
              />

              <Button
                full
                onPress={ formikProps.handleSubmit}
                style={{ marginBottom: 12 }}
              >
                <Text button>Create Account</Text>
              </Button>
             <Text paragraph color="gray">
              Already have an account? 
                <Text height={18}
                  color="blue"
                  onPress={() => navigation.navigate(Route.LOGIN)}>  Sign in
                </Text>
            </Text>
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