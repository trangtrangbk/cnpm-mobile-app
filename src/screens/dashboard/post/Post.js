import React, { Fragment }from 'react';
import { View ,StyleSheet, TouchableOpacity,SafeAreaView,
   Image, Dimensions, TextInput, Platform , ScrollView, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-crop-picker'; //
import ActionSheet from 'react-native-actionsheet';//
import NumberFormat from 'react-number-format';
import Textarea from 'react-native-textarea';
import { Formik } from 'formik';
import * as yup from 'yup';

import {Button, Block,Text ,Input } from '../../../components/index'
import icMenu from '../../../assets/icons/bars.png';
import Route from '../../../constants/Route';
import getToken from '../../../api/getToken';
import getDistrictByCity from '../../../api/apiPlaces/getDistrictByCity';
import { block } from 'react-native-reanimated';
var { width, height } = Dimensions.get('window');

export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            // city: '',
            // district:'',
            // ward:'',
            // cities: [],
            // districts: [],
            // wards: [],
            localPhotos: [],
            electedPhotoIndex: 0,
        };
    }
    componentDidMount = () =>{
        getToken()
            .then(token => {
                if(token !== '') this.setState({isLogin: true})
                else this.setState({isLogin: true})
            })
    }
    onPressAddPhotoBtn = () => {
        this.ActionSheetSelectPhoto.show();
    };
    showActionSheet = index => {
        this.setState({
        selectedPhotoIndex: index
        });
        this.ActionSheet.show();
    };

    onActionDeleteDone = index => {
        if (index === 0) {
        const array = [...this.state.localPhotos];
        array.splice(this.state.selectedPhotoIndex, 1);
        this.setState({ localPhotos: array });
        }
    };
    onActionSelectPhotoDone = index => {
        switch (index) {
            case 0:
                ImagePicker.openCamera({}).then(image => {
                this.setState({
                    localPhotos: [...this.state.localPhotos, image]
                });
                });
                break;
            case 1:
                ImagePicker.openPicker({
                multiple: true,
                maxFiles: 10,
                mediaType: 'photo'
                }).then(images => {
                images.forEach((image) => {
                    this.setState({
                    localPhotos: [...this.state.localPhotos, image]
                    });
                });
                }).catch(error => {
                alert(JSON.stringify(error));
                });
                break;
            default:
                break;
        }
    };
    
    renderListPhotos = localPhotos => {
        const photos = localPhotos.map((photo, index) => (
            <TouchableOpacity key={index}
                onPress={() => {
                this.showActionSheet(index);
            }}>
                <Image style={styles.photo} source={{ uri: photo.path }} />
            </TouchableOpacity>
        ));
    
        return photos;
    };
    
    renderSelectPhotoControl = localPhotos => {
        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Phần hình ảnh:</Text>
                <ScrollView style={styles.photoList} horizontal={true}>
                {this.renderListPhotos(localPhotos)}
                <TouchableOpacity onPress={this.onPressAddPhotoBtn.bind(this)}>
                    <View style={[styles.addButton, styles.photo]}>
                    <Text style={styles.addButtonText}>+</Text>
                    </View>
                </TouchableOpacity>
                </ScrollView>
            </View>
        );
    };

    render() {
    const { navigation } = this.props;
    const {isLogin } = this.state;
    return (
        
        isLogin ? <Fragment>
            <StatusBar barStyle="dark-content" />
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                onPress={() => navigation.openDrawer()}>
                <View  style={{marginLeft: 10}} >
                    <Image 
                    source= {icMenu}
                    style={{width: 25, height: 25, marginTop: 15}}/>
                </View>
                </TouchableOpacity>
                <Text style={styles.title}>Đăng Phòng</Text>
            </View>

            <View style={styles.divider}/>
            <SafeAreaView>
                <KeyboardAwareScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>

                    <Formik
                    initialValues = {{title:'' ,price: '' , area: '' , city: '', district:'', street: '', apartment_number:''}}
                    onSubmit = {(values) => {

                    alert(JSON.stringify(values)+ wards)
                    }}
                    //validationSchema = {validationSchema}
                    >
                        {formikProps => (
                            <View style={{backgroundColor: 'white'}}>
                                <View style={{backgroundColor: 'white', marginTop: 10}}>
                                    <Text style={{fontSize: 25, marginLeft: 20}}>Phần thông tin:</Text>
                                    <View style = {[styles.item, { width: width-40}]}>
                                    <Text style={styles.label}>Nhập tiêu đề:</Text>
                                    <TextInput
                                        style={{marginLeft: 10}}
                                        formikProps = {formikProps}
                                        label='title'
                                        placeholder={'Ví dụ: Cho thuê phòng có điều hòa'}
                                        value={formikProps.values.title}
                                        onChangeText = {formikProps.handleChange('title')}
                                        onBlur = {formikProps.handleBlur('title')}
                                    />
                                    <View style={{height: 1,backgroundColor: '#DADBDC', marginBottom: 10,width: width-40,marginTop: -10,}}/>
                                    </View>

                                    <View style = {[{width: width-40}, {flexDirection: 'row'}]}>
                                    <View style={styles.item}>
                                        <Text style={styles.label}>Diện tích:</Text>
                                        <TextInput
                                        keyboardType='numeric'
                                        style={{marginLeft: 10}}
                                        formikProps = {formikProps}
                                        label='price'
                                        placeholder={'Ví dụ: 100'}
                                        value={formikProps.values.area}
                                        onChangeText = {formikProps.handleChange('area')}
                                        onBlur = {formikProps.handleBlur('area')}
                                        />
                                        <View style={{height: 1,backgroundColor: '#DADBDC', marginBottom: 10,width: 2*width/3+20,marginTop: -10,}}/>
                                    </View>
                                    <View style={{ width: 3*width/16, marginTop: 10, height: height/10}}>
                                        <Text style={{marginTop:height/25, fontSize: 20}}>m2</Text>
                                    </View>
                                    
                                    </View>
                                    <View style = {[{width: width-40}, {flexDirection: 'row'}]}>
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
                                        />)}
                                        />
                                        <View style={{height: 1,backgroundColor: '#DADBDC', marginBottom: 10,width: 2*width/3+10,marginTop: -10,}}/>
                                    </View>
                                    <View style={{width: 3*width/16, marginTop: 10, height: height/10}}>
                                        <Text style={{marginTop:height/25, fontSize: 20}}>VND</Text>
                                    </View>
                                    </View>
                                    <View style = {[styles.item, {height: height/4, width: width-40}]}>
                                        <Text style={styles.label}>Mô tả:</Text>
                                        <Textarea
                                            style={styles.textarea}
                                            maxLength={120}
                                            placeholder={'Có gì mô tả đó ...'}
                                            placeholderTextColor={'#c7c7c7'}
                                            underlineColorAndroid={'transparent'}
                                            value={formikProps.values.address}
                                            formikProps = {formikProps}
                                            label='address'
                                            formikKey = 'address'
                                            onChangeText = {formikProps.handleChange('address')}
                                            onBlur = {formikProps.handleBlur('address')}
                                        />
                                    </View>
                                </View>
                                <View style={{backgroundColor: 'white', marginTop: 20}}>
                                    <Text style={{fontSize: 25, marginLeft: 20}}>Phần liên hệ:</Text>

                                    <View style = {[styles.item, { width: width-40}]}>
                                        <RNPickerSelect
                                        placeholder={{
                                        label: 'Chọn Thành Phố ...',
                                        // value: 'hockey',
                                        }}
                                        label='city'
                                        formikProps = {formikProps}
                                        onValueChange={(value) => {
                                        
                                            formikProps.values.city = value;
                                        }}
                                        style= {pickerSelectStyles}
                                        items={[
                                        { label: 'Đà Nẵng', value: '1',  },
                                        { label: 'Hà Nội', value: '2' },
                                        { label: 'Hồ Chí Minh', value: '3' }
                                        ]}
                                        hideIcon={Platform.OS === "ios" ? false : true}
                                        // disabled={!canSubmit}
                                    />
                                    <View style={{height: 1,backgroundColor: '#DADBDC', marginBottom: 10,width: width-40,marginTop: -10,}}/>
                                    </View>

                                    <View style = {[styles.item, { width: width-40}]}>
                                        <RNPickerSelect
                                        placeholder={{
                                            label: 'Chọn Quận/Huyện ...',
                                        }}
                                        style= {pickerSelectStyles}
                                        onValueChange={(value) => console.log(value)}
                                        items={[
                                        ]}
                                        hideIcon={Platform.OS === "ios" ? false : true}
                                        // disabled={!canSubmit}
                                    />
                                    <View style={{height: 1,backgroundColor: '#DADBDC', marginBottom: 10,width: width-40,marginTop: -10,}}/>
                                    </View>  

                                    <View style = {[styles.item, { width: width-40}]}>
                                        <RNPickerSelect
                                        placeholder={{
                                            label: 'Chọn Quận/Xã ...',
                                            value: null,
                                        }}
                                        onValueChange={(value) => {
                                        
                                        }}
                                        style= {pickerSelectStyles}
                                        items={[
                                            { label: 'Đà Nẵng',value: '1',  },
                                            { label: 'Hà Nội', value: '2' },
                                            { label: 'Hồ Chí Minh', value: '3' },
                                        ]}
                                        hideIcon={Platform.OS === "ios" ? false : true}
                                        // disabled={!canSubmit}
                                        />
                                    <View style={{height: 1,backgroundColor: '#DADBDC', marginBottom: 10,width: width-40,marginTop: -10,}}/>
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
                                        onBlur = {formikProps.handleBlur('street')}
                                        />
                                        <View style={{height: 1,backgroundColor: '#DADBDC', marginBottom: 10,width: width-40,marginTop: -10,}}/>
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
                                        onBlur = {formikProps.handleBlur('apartment_number')}
                                        />
                                        <View style={{height: 1,backgroundColor: '#DADBDC', marginBottom: 10,width: width-40,marginTop: -10,}}/>
                                    </View>               
                                </View>
                                <View style={styles.body}>
                                    {this.renderSelectPhotoControl(this.state.localPhotos)}
                                </View>
                                <View style={styles.divider}/>
                                <Button
                                    full
                                    style={{ marginBottom: 120, marginLeft: width/17, marginTop: 20 }}
                                    onPress={ formikProps.handleSubmit}>
                                    <Text button>Đăng bài viết</Text>
                                </Button>
                            </View>)}
                    </Formik>
                </KeyboardAwareScrollView>
                <ActionSheet ref={o => (this.ActionSheet = o)}
                    title={'Confirm delete photo'}
                    options={['Confirm', 'Cancel']}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={0}
                    onPress={index => {
                    this.onActionDeleteDone(index);}}/>
                <ActionSheet ref={o => (this.ActionSheetSelectPhoto = o)}
                    title={'Select photo'}
                    options={['Take Photo...', 'Choose from Library...', 'Cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={index => {
                    this.onActionSelectPhotoDone(index);}}/>
            </SafeAreaView>
          </Fragment>
          : 
          <Fragment>
            <StatusBar barStyle="dark-content" />
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                onPress={() =>navigation.openDrawer()}>
                <View  style={{marginLeft: 10}} >
                    <Image 
                    source= {icMenu}
                    style={{width: 25, height: 25, marginTop: 15}}/>
                </View>
                </TouchableOpacity>
                <Text style={styles.title}>Đăng Phòng</Text>
            </View>

            <View style={styles.divider}/>
            <View>
               <Text>Vui lòng đang nhập để thực hiện các tác vụ.</Text> 
            </View>
          </Fragment>
        );
      }
}
const styles = StyleSheet.create({
    item:{
     marginTop: 10,
     marginLeft: 20,
     width: 2*width/3+20,
     height: height/10,
    },
    input:{
     marginLeft: 50,
     marginRight: 50,
     borderColor:'#F2F2F2',
     borderBottomColor: 'red',
     borderWidth: 1
   },
    title: {
      marginBottom:20,
      fontSize: 30,
      marginLeft: width/6,
     },
     label: {
       fontSize: 17,
       
     },
     divider:{
       width: width,
       height: 1,
       backgroundColor: '#DADBDC',
       marginBottom: 10,
     },
     container: {
       flex: 1,
       backgroundColor: '#F2F2F2',
     },
     body: {
       backgroundColor: 'white',
     },
     sectionContainer: {
       marginTop: 32,
       paddingHorizontal: 24,
     },
     sectionTitle: {
       fontSize: 24,
       fontWeight: '600',
       color: 'black',
     },
     sectionDescription: {
       marginTop: 8,
       fontSize: 18,
       fontWeight: '400',
       color: 'red',
     },
     highlight: {
       fontWeight: '700',
     },
     section: {
       backgroundColor: 'white'
     },
     row: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 10
     },
     addPhotoTitle: {
   
       fontSize: 15,
   
       fontWeight: 'bold'
     },
     photoList: {
       height: 70,
       marginTop: 15,
       marginBottom: 15,
       marginRight: 10
     },
     photo: {
       marginRight: 10,
       width: 70,
       height: 70,
       borderRadius: 10
     },
   
     addButton: {
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: '#3399cc'
     },
     photoIcon: {
       width: 50,
       height: 50
     },
     addButtonContainer: {
       padding: 15,
       justifyContent: 'flex-end'
     },
     addButtonText: {
       color: 'white',
       fontWeight: 'bold',
       fontSize: 48
     }
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