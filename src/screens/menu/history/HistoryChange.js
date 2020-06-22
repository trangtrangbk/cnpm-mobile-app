// HistoryChange

import React, { Fragment }from 'react';
import { View ,StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions, TextInput, Platform , ScrollView, StatusBar, Alert, ToastAndroid} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-crop-picker'; //
import ActionSheet from 'react-native-actionsheet';//
import NumberFormat from 'react-number-format';
import Textarea from 'react-native-textarea';
import { Formik } from 'formik';
import * as yup from 'yup';

import {Button,Text } from '../../../components/index'
import Route from '../../../constants/Route';
var { width, height } = Dimensions.get('window');

import getToken from '../../../storage/getToken';
import geCities from '../../../api/apiPlaces/getCities'
import getDistrict from '../../../api/apiPlaces/getDistrict';
import getWard from '../../../api/apiPlaces/getWards';
import getAddress from '../../../api/apiPlaces/getAddress';
import postPicture from '../../../api/postPicture'; 
import changeNew from '../../../api/changeNew';

export default class HistoryChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            token: '',
            city: '',
            district:'',
            ward:'',
            cities: [],
            districts: [],
            wards: [],
            photos: [],
            localPhotos: [],
            electedPhotoIndex: 0,
            address:'',
            uploading : false,
            isPost: true,
            loading: false,
            count: 0,
        };
    }
    componentDidMount = async () =>{
        
        const {city, district, ward, item} = this.props.route.params;
        this.setState({city, district, ward, localPhotos: item.picture});
        getToken()
        .then(tk => {
            if(tk !== '') {
                this.setState({isLogin: true, token: tk})
            }
            else {
                this.setState({isLogin: false})
            }
        })
        this.setState({loading: true})
        geCities()
          .then(res => res.map(item=> {
            let value = {label: item.title, value: item.code  }
            this.setState({cities: [...this.state.cities, value],loading: false})
            
            }))
    }
    _handelPost = (values, navigation, id) =>{
        const {isPost, localPhotos, ward} = this.state;
        console.log(values)
        if(localPhotos.length === 0) alert('Vui lòng chọn ảnh.')
        else if( ward ==='' && !ward) alert('Địa chỉ chưa đầy đủ')
        else  if(isPost){
            this.setState({isPost: false, loading: true})
            this._onDoUploadPress()
            console.log(this.state.address, '____________________________')
            this._toDo(
                    navigation, 
                    { 
                        status: false,
                        title: values.title, 
                        description: values.description,
                        area: Number(values.area),
                        price: Number(this._handlePrice(values.price)),
                        address: `${values.apartment_number} ${values.street}${this.state.address}`, 
                        phone:values.phone
                    },
                    id
                )
        }
    }

    _handlePrice = (str) =>{
        let arr = str.split(',')
        str ='',
        arr.forEach(item => str += item)
        return str
    }
     _onMessages = ( navigation, item) =>{
        Alert.alert(
            "Thông báo",
            "Thay đổi bài viết thành công.",
            [
              { text: "OK", onPress: () => navigation.navigate('History', item) }
            ],
            { cancelable: false }
        );
      }
      __onFail = () =>{
        ToastAndroid.show("Có lỗi xảy ra vui lòng kiểm tra lại", ToastAndroid.SHORT);
      }
      _toDo = (navigation, values, id) =>{
        const { token } = this.state;
        let time = 0;
        let myVar = setInterval(async ()=>{
            if(time++ === 10 ) {
                this._onFail()
                clearInterval(myVar);
            }
            else if(!this.state.uploading) {
                changeNew(token,{...values, picture: this.state.photos}, id)
                    .then(res => {
                        if(typeof res.message ==='undefined'){
                            this.setState({loading: false})
                            this._onMessages(navigation, {item:res })
                        }else {
                            this.setState({loading: false})
                            this.__onFail()
                        }
                    })
                    .catch(error=> {
                        this.setState({loading: false})
                        this._onFail()
                    })
                clearInterval(myVar);
            }
        }, 1000);

        
        
    }
    onSelectCity = (value) =>{
        const { count } = this.state;
        if(count< 2) {
            this.setState({count : count +1})
            this.setState({ districts: [] ,wards: [], city: value});
        }
        else {
            this.setState({district: '', ward :'', districts: [] ,wards: [], city: value});
        }
        if(value) {
            this.setState({loading: true})
            getDistrict(value)
            .then(res => res.map(item=> {
                let value = {label: item.title, value: item.code}
                this.setState({districts: [...this.state.districts,value]})
                this.setState({loading: false})
            }))
        }

            
    }
    onSelectDistrict = (value) =>{
        const {count} = this.state;
        if(count< 2) {
            this.setState({count : count +1})
            this.setState({ wards: [], district: value});
        }else {
            this.setState({wards: [], district: value, ward: ''});
        }

        if(value){ 
            this.setState({loading: true})
            getWard(this.state.city, value)
            .then(res => res.map(item=> {
                let value = {label: item.title, value: item.code}
                this.setState({wards: [...this.state.wards,value], loading: false})
            }))
        }
    }
    onSelectWard = async (value) =>{
        await this.setState({ward: value})
        this._handelAddress()
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
    _onDoUploadPress = () => {
        const { localPhotos } = this.state;
        this.setState({uploading: true})
        if (localPhotos && localPhotos.length > 0) {
            let formData = new FormData();
            localPhotos.forEach((image) => {           
                if(typeof image.path !== 'undefined')   {
                    const file = {
                        uri: image.path,
                        name: image.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
                        type: image.mime || 'image/jpeg'
                    };
                    formData.append('photo', file);
                }
                else {
                    this.setState({photos: [...this.state.photos,image]})
                } 
            });
            if(formData._parts.length !== 0 ){
                postPicture(formData)
                    .then(res => {
                        if(res.message === 'success!') {
                            this.setState({photos: [...this.state.photos,...res.picture]})
                            console.log(res.picture,'up xong')
                            this.setState({uploading: false})
                        }
                        else console.log('Error ....')
                    })
            }
            else this.setState({uploading: false})
          
        } else {
          alert('No photo selected');
        }
      }
    _handelAddress = () =>{
        const { city, district, ward } = this.state;
        if(city && (district || district === 0) && (ward || ward ===0))
        console.log(city, district, ward )
        if(city === -1  && district ===-1 && ward === -1) this.setState({loading: false})
        else 
        getAddress(city, district, ward)
            .then(async res => {
                console.log(res.str, 'HERE')
                await this.setState({address: res.str})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

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
                onPress={() => this.showActionSheet(index) }>
            
                {typeof photo.path !== 'undefined'? <Image style={styles.photo} source={{ uri: photo.path}} />: <Image style={styles.photo} source={{ uri: photo}} /> }
            </TouchableOpacity>
        ));
    
        return photos;
    };
    
    renderSelectPhotoControl = localPhotos => {
        return (
            <View style={styles.sectionContainer}>
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
    _showLoading = () =>{
        if(this.state.loading) 
          return <Spinner visible={this.state.loading} textStyle={{color: '#FFF'}}/>
      }
    phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    validationSchema = yup.object().shape({
        title: yup.string().label('title')
            .required('Vui lòng nhập tiêu đề!'),
        area: yup.number('Vui lòng nhập đúng!')
            .label('area')    
            .required('Vui lòng nhập diện tích!')
            .min(10,'Vui lòng nhập lại đúng diện tích!')
            .max(1000,'Vui lòng nhập lại đúng diện tích!'),
        price: yup.string('Vui lòng nhập đúng!')
            .label('price')
            .required('Vui lòng nhập chi phí!')
            .min(0, 'Vui lòng nhập đúng!'),
        phone: yup.string()
            .label('phone')
            .required('Vui lòng nhập số điện thoại!')
            .matches(this.phoneRegExp, 'Vui lòng nhập đúng!'),
        street: yup.string()
            .label('street')
            .required('Vui lòng nhập tên đường!'),
        apartment_number: yup.string()
            .label('apartment_number')
            .required('Vui lòng nhập số nhà'),
      })
    render() {
    const { navigation, route } = this.props;
    const { isLogin, cities, districts, wards, city, district, ward, localPhotos} = this.state;
    return (
        isLogin ? <Fragment>
            <StatusBar barStyle="dark-content" />
            {this._showLoading() }
            <SafeAreaView style ={{marginTop: 60}}>
            <View style = {styles.divider}/>
                <KeyboardAwareScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Formik
                    initialValues = {
                      //  route.params.item.address.split(',')[0],
                      { 
                        title: route.params.item.title,
                        price: String(route.params.item.price),
                        area: String(route.params.item.area),
                        phone: route.params.item.phone,
                        description: route.params.item.description,
                        apartment_number: route.params.item.address.split(',')[0].split(' ')[0],
                        street: route.params.item.address.split(',')[0].replace(route.params.item.address.split(',')[0].split(' ')[0], '').trim(),
                      }
                    }
                    // initialValues = {this.props.route.params.item}
                    
                    onSubmit = {(values) => {
                        this._handelPost(values, navigation, route.params.item._id)
                    }}
                    validationSchema = {this.validationSchema} >
                        {formikProps => (
                            <View style={{backgroundColor: '#F2F2F2'}}>
                                <Text style={styles.header}>Phần thông tin:</Text>
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

                                <Text style={styles.header}>Phần liên hệ:</Text>
                                <View style={viewStyles.item}>
                                    <View style = {[styles.item, { width: width-40}]}>
                                        <RNPickerSelect
                                        placeholder={{
                                            label: 'Chọn Thành Phố ...',
                                            value: city,
                                        }}
                                        label='city'
                                        formikProps = {formikProps}
                                        onValueChange={ (value )=> this.onSelectCity(value)}
                                        style= {pickerSelectStyles}
                                        items={cities}
                                        hideIcon={Platform.OS === "ios" ? false : true}/>
                                        <View style={viewStyles.divider}/>
                                    </View>

                                    <View style = {[styles.item, { width: width-40}]}>
                                        <RNPickerSelect
                                        placeholder={{
                                            label: 'Chọn Quận/Huyện ...',
                                            value: district,
                                        }}
                                        placeholderTextColor={"#FFF"}
                
                                        style= {pickerSelectStyles}
                                        onValueChange={(value) => this.onSelectDistrict(value)}
                                        items={districts}
                                        hideIcon={Platform.OS === "ios" ? false : true}/>
                                        <View style={viewStyles.divider}/>
                                    </View>  

                                    <View style = {[styles.item, { width: width-40}]}>
                                        <RNPickerSelect
                                        placeholder = {{
                                            label: 'Chọn Phường/Xã ...',
                                            value: ward
                                            
                                        }}
                                        placeholderTextColor="red"
                                        onValueChange={(value) => {
                                            this.onSelectWard(value)
                                        }}
                                        style= {pickerSelectStyles}
                                        items={wards}
                                        hideIcon={Platform.OS === "ios" ? false : true}/>
                                        <View style={viewStyles.divider}/>
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
                                        onBlur = {formikProps.handleBlur('street')}/>
                                        <Text style = {styles.txtError}>
                                            {formikProps.touched['street'] && formikProps.errors['street']} 
                                        </Text>
                                        <View style={viewStyles.divider}/>
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
                                        onBlur = {formikProps.handleBlur('apartment_number')}/>
                                        <Text style = {styles.txtError}>
                                            {formikProps.touched['apartment_number'] && formikProps.errors['apartment_number']} 
                                        </Text>
                                        <View style={viewStyles.divider}/>
                                    </View>               
                                </View>

                                <Text style={styles.header}>Phần liên lạc:</Text>
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
                                <Text style={styles.header}>Phần hình ảnh:</Text>
                                <View style={viewStyles.item}>
                                    {this.renderSelectPhotoControl(localPhotos)}
                                </View>
                                <View style={styles.divider}/>
                                <Button
                                    full
                                    style={{ marginBottom: 120, marginLeft: width/17, marginTop: 20 }}
                                    onPress={ formikProps.handleSubmit}>
                                    <Text button>Lưu thay đổi</Text>
                                </Button>
                            </View>)}
                    </Formik>

                <ActionSheet ref={o => (this.ActionSheet = o)}
                    title={'Confirm delete photo'}
                    options={['Confirm', 'Cancel']}
                    cancelButtonIndex={1}
                    destructiveButtonIndex={0}
                    onPress={index => {this.onActionDeleteDone(index);}}/>
                <ActionSheet ref={o => (this.ActionSheetSelectPhoto = o)}
                    title={'Select photo'}
                    options={['Take Photo...', 'Choose from Library...', 'Cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={index => {this.onActionSelectPhotoDone(index);}}/>
                </KeyboardAwareScrollView>
            </SafeAreaView>
          </Fragment>
          : 
          <Fragment>
            <View>
               <Text>Vui lòng đang nhập để thực hiện các tác vụ.</Text> 
            </View>
          </Fragment>
        );
      }
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
     header:{fontSize: 25, marginLeft: 20, marginTop: 15},
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
       marginTop: -20,
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