import React from 'react';
import { 
  View,
  StyleSheet, 
  Text, 
  Dimensions, 
  TextInput,
  Image, 
  Modal 
 } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup'

var { width, height } = Dimensions.get('window');
import Button from '../../components/Button';
import icCancel from '../../assets/icons/wrong.png';

export const ModelArea = ({hide, area, showForm, setShowForm, handleAddValues}) => {
  let mMax =0, mMin =0; 
  if(area.title !=='') {{
    let arr = (area.title+'').split(',');
    mMin = Number(arr[0]);
    mMax = Number(arr[1]);
  }}
    const validationSchema = yup.object().shape({
      min: yup.string('Vui lòng nhập đúng!')
        .label('min')
        .required('Vui lòng nhập giá tiền!')
        .min(0, 'Vui lòng nhập đúng!'),
      max: yup.string()
        .label('max')
        .required('Vui lòng nhập nội dung')
        .test('area_max', 'Vui nhập lại giá trị', function(value) {
          return parseFloat(this.parent.min,10) < parseFloat(value,10);
      }),
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
              <Text style = {styles.titleModel}>Nhâp giá trị:</Text>
              <Button
                style={{backgroundColor: 'white', width: 40, height: 40, marginTop: -30}}
                onPress={() => {
                  setShowForm(false)
                }}>
                <Image source={icCancel} style={styles.cancel}/>
              </Button>
           </View>
              <Formik
                initialValues = { area.code === 4 && mMax!== 0 && hide!== 0 ? {min: `${mMin}`, max: `${mMax}`} : {min: '',max: ''}}
                onSubmit = {({min, max}) => {
                    setShowForm(false)
                    handleAddValues(parseFloat(min), parseFloat(max))
              }}
                validationSchema = {validationSchema}
                >
                {formikProps => (
                    <View style={{borderRadius: 10, borderColor: '#DEE1E6', borderWidth: 1,width: width -60, backgroundColor: 'white'}} >
                      <View style={{flexDirection: 'row', marginTop: 15}}>
                        <Text style={{fontSize: 18, marginTop: 5, color: 'black', marginLeft: 5}}>Diện tích từ:</Text>
                        <TextInput
                          keyboardType='numeric'
                          style={{marginLeft: 10, height: 40, fontSize: 16, width: width/2-30}}
                          formikProps = {formikProps}
                          label='area'
                          placeholder={'Ví dụ: 100'}
                          value={formikProps.values.min}
                          onChangeText = {formikProps.handleChange('min')}
                          onBlur = {formikProps.handleBlur('min')}/>
                        <Text style={{fontSize: 18, marginTop: 5, color: 'black', marginLeft: 5}}>m2</Text>
                      </View>
                      <Text style = {styles.txtError}>
                          {formikProps.touched['min'] && formikProps.errors['min']} 
                      </Text>
                      <View style={{flexDirection: 'row'}}> 
                        <Text style={{fontSize: 18, marginTop: 5, color: 'black', marginLeft: 5}}>Diện tích tới:</Text>
                        <TextInput
                          keyboardType='numeric'
                          style={{marginLeft: 10, height: 40, fontSize: 16, width: width/2-30}}
                          formikProps = {formikProps}
                          label='area'
                          placeholder={'Ví dụ: 100'}
                          value={formikProps.values.max}
                          onChangeText = {formikProps.handleChange('max')}
                          onBlur = {formikProps.handleBlur('max')}/>
                        <Text style={{fontSize: 18, marginTop: 5, color: 'black', marginLeft: 5}}>m2</Text>
                      </View>
                      <Text style = {styles.txtError}>
                          {formikProps.touched['max'] && formikProps.errors['max']} 
                      </Text>
                      <Button
                        onPress={ formikProps.handleSubmit}
                        style={{ marginBottom: 12 , marginTop: 15, marginLeft: width/6+10, borderRadius: 15, width: width/2, backgroundColor: '#4dc3ff'}}>
                        <Text button >Xác  nhập</Text>
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
    cancel: {
      width: 20,
      height: 20,
    },
    centeredView: {
      
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    titleModel:{
      width: width-100,
      textAlign: 'center',
      color: 'black' ,
      fontSize: 17, 
      marginBottom: 25, 
      marginTop: -10,
    },
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
    txtError: {
      fontSize: 12,
      color: 'red', 
      marginTop: -15, 
      paddingBottom: 7,
      marginLeft: 16
    },

  });