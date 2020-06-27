// HistoryChange

import React, { Fragment }from 'react';
import { View ,StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, StatusBar, Alert, ToastAndroid} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik';
import * as yup from 'yup';

import {Button,Text } from '../../../components/index'
import Route from '../../../constants/Route';
var { width, height } = Dimensions.get('window');
import {
    SelectAddress, 
    PhoneContent, 
    Contact, 
    UploadImages} from '../../../components/changenew';


import getToken from '../../../storage/getToken';
import getKeyCode from '../../../api/apiPlaces/getKeyCode';
import getAddress from '../../../api/apiPlaces/getAddress';
import postPicture from '../../../api/postPicture'; 
import changeNew from '../../../api/changeNew';

export default class HistoryChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            token: '',
            photos: [],
            localPhotos: [],
            address:'',
            uploading : false,
            isPost: true,
            loading: false,
        };
    }
    componentDidMount = async () =>{
        const {item} = this.props.route.params;
        const {city, district, ward} =this.props.route.params
        getAddress(city, district, ward)
            .then(res => {
                this.setState({address: res.str})
            })
        this.setState({localPhotos: item.picture});
        getToken()
            .then(tk => {
                if(tk !== '') {
                    this.setState({isLogin: true, token: tk})
                }
                else {
                    this.setState({isLogin: false})
                }
            })
    }
    setAddress = (str) =>{
        console.log(str, 'str history change')
        this.setState({address: str})
    }
    setLocalPhotos = (arr) => {
        this.setState({localPhotos: arr})
    }
    _handelPost = (values, navigation, id) =>{
        
        const {isPost, localPhotos, ward} = this.state;
        if(localPhotos.length === 0) alert('Vui lòng chọn ảnh.')
        else if( ward ==='' && !ward) alert('Địa chỉ chưa đầy đủ')
        else  if(isPost){
            this.setState({isPost: false, loading: true})
            this._onDoUploadPress()
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
         console.log(item)
        Alert.alert(
            "Thông báo",
            "Thay đổi bài viết thành công.",
            [
              { text: "OK", onPress: () => navigation.navigate(Route.HISTORY, item) }
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
    const { isLogin, localPhotos} = this.state;
    const {city, district, ward} =this.props.route.params
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
                    onSubmit = {(values) => {
                        this._handelPost(values, navigation, route.params.item._id)
                    }}
                    validationSchema = {this.validationSchema} >
                        {formikProps => (
                            <View style={{backgroundColor: '#F2F2F2'}}>
                                <Text style={styles.header}>Phần thông tin:</Text>
                                <Contact formikProps = { formikProps }/>
                                <Text style={styles.header}>Phần liên hệ:</Text>
                                <SelectAddress  formikProps = {formikProps} setAddress = { this.setAddress} city = {city } district = {district }  ward = {ward }/>
                                <Text style={styles.header}>Phần liên lạc:</Text>
                                <PhoneContent formikProps = {formikProps} />
                                <Text style={styles.header}>Phần hình ảnh:</Text>
                                <UploadImages setLocalPhotos = {this.setLocalPhotos } localPhotos = { localPhotos } />
                                <View style={styles.divider}/>
                                <Button
                                    full
                                    style={{ marginBottom: 120, marginLeft: width/17, marginTop: 20 }}
                                    onPress={ formikProps.handleSubmit}>
                                    <Text button>Lưu thay đổi</Text>
                                </Button>
                            </View>)}
                    </Formik>
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
    header:{
      fontSize: 25, 
      marginLeft: 20, 
      marginTop: 15
     },
    divider:{
      width: width,
      height: 1,
      backgroundColor: '#DADBDC',
      marginBottom: 10,
    },
}); 