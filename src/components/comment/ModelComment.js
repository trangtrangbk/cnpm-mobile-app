import React  from 'react';
import { 
  View,
  Text, 
  Dimensions, 
  Image,
  TextInput,
  Modal,
  StyleSheet
} from 'react-native';

import { Formik } from 'formik'
import moment from 'moment';
import * as yup from 'yup'


let viLocale = require('moment/locale/vi');
moment.locale('vi',viLocale)
var { width, height } = Dimensions.get('window');
import Button from '../../components/Button';
import getUser from '../../storage/getUser';
import icCancel from '../../assets/icons/wrong.png';
import { set } from 'react-native-reanimated';


export const ModelComment  = ({showForm, name, setShowForm, PostComment}) => {
  const [ isLogin , setIsLogin ] = React.useState(false);
  React.useEffect(() => {
    getUser().then(user => {
      if(user) setIsLogin(true);
    })
    return () => {
      console.log("Filters____________________Component-Will-Un-mount");
    };
  }, []); 
    const validationSchema = yup.object().shape({
      name: yup.string().label('name').required('vui lòng nhập tên!'),
      comment: yup.string().label('comment').required('Vui lòng nhập nội dung'),
    })
    return (
      <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={showForm}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <View style = {{flexDirection: 'row',}}>
              <Text style = {styles.titleModel}>Để lại bình luận của bạn:</Text>
              <Button
              style={{backgroundColor: 'white', width: 40, height: 40, marginTop: -30}}
               onPress={() => {
                setShowForm(showForm => !showForm)
              }}>
                <Image source={icCancel} style={styles.cancel}/>
              </Button>
           </View>
              <Formik
                initialValues = {{name: name!==''?name:'',comment: ''}}
                onSubmit = {(values) => {
                PostComment(values)
              }}
                validationSchema = {validationSchema}>
                {formikProps => (
                    <View style={{borderRadius: 10, borderColor: '#DEE1E6', borderWidth: 1,width: width -60, backgroundColor: 'white'}} >
                      <TextInput
                        style={{marginLeft: 10, height: 40}}
                       
                        editable={isLogin? false: true}
                        formikProps = {formikProps}
                        label='name'
                        placeholder={'Nhập tên(bắt buộc)'}
                        value={formikProps.values.name}
                        onChangeText = {formikProps.handleChange('name')}
                        onBlur = {formikProps.handleBlur('name')}/> 
                      <Text style = {styles.txtError}>
                          {formikProps.touched['name'] && formikProps.errors['name']} 
                      </Text>
                      <View style={styles.dividerForm}/>
                      <TextInput
                        multiline={true}
                        placeholder={'Nhập nội dung(bắt buộc)'}
                        numberOfLines={10}
                        label='comment'
                        value={formikProps.values.comment}
                        onChangeText = {formikProps.handleChange('comment')}
                        onBlur = {formikProps.handleBlur('comment')}
                        style={{ height:120, textAlignVertical: 'top',marginLeft: 10,}}/>  
                      <Text style = {styles.txtError}>
                          {formikProps.touched['comment'] && formikProps.errors['comment']} 
                      </Text> 
                      <View style={styles.dividerForm}/>
                      <Button
                        onPress={ formikProps.handleSubmit}
                        style={{ marginBottom: 12 , marginTop: 15, marginLeft: width/6+10, borderRadius: 15, width: width/2, backgroundColor: '#4dc3ff'}}
                      >
                        <Text button >Gửi bình luận</Text>
                      </Button>         
                    </View>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
  const styles = StyleSheet.create({
    header: {
      marginTop: width/2
    },
    container1: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    cancel: {
      width: 20,
      height: 20,
    },
    titleModel:{
      width: width-100,
      textAlign: 'center',
      color: 'black' ,
      fontSize: 17, 
      marginBottom: 25, 
      marginTop: -10,},
    modalView: {
      width: width-30,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    dividerForm:{
      width: width -60,
      height: 1,
      backgroundColor: '#DADBDC',
      marginBottom: 10,
    },
    txtError: {
      fontSize: 12,
      color: 'red', 
      marginTop: -15, 
      paddingBottom: 7,
      marginLeft: 16
    },
  });

