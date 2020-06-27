import React, { Fragment } from 'react';
import { View ,StyleSheet, SafeAreaView, Dimensions, StatusBar, Alert, ToastAndroid} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik';
import * as yup from 'yup';
import {Button,Text } from '../../components/index'
import {
    SelectAddress, 
    PhoneContent, 
    Contact, 
    UploadImages} from '../../components/createnew';

import Route from '../../constants/Route';
import getToken from '../../api/getToken';
import postPicture from '../../api/postPicture'; 
import postNew from '../../api/postNew';
var { width, height } = Dimensions.get('window');

export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            localPhotos: [],
            photos: [],
            address:'',
            uploading : false,
            isPost: true,
            loading: false,
        };
    }
    componentDidMount = () =>{
        getToken()
        .then(tk => {
            if(tk !== '') this.setState({ token: tk})
        })
    }
    _handelPost = (values, navigation) =>{
        const {isPost, localPhotos} = this.state;
        let iAddress = `${values.apartment_number} ${values.street}${this.state.address}`;
        console.log(this.state.address)
        if(localPhotos.length === 0) alert('Vui lòng chọn ảnh.');
        else if(!this.state.address ) alert('Địa chỉ chưa đầy đủ')
        else  if(isPost){
            this.setState({isPost: false, loading: true})
            this._onDoUploadPress()
            this._toDo(navigation, { status: true,
                title: values.title, 
                description: values.description,
                area: Number(values.area),
                price: Number(this._handlePrice(values.price)),
                address: iAddress,
                phone:values.phone})
        }
    }
    _handlePrice = (str) =>{
        let arr = str.split(',')
        str ='',
        arr.forEach(item => str +=item)
        return str
    }
    showMessages = ( navigation) =>{
        Alert.alert(
            "Thông báo",
            "Đăng bài viết thành công vui lòng chờ phê duyệt.",
            [
              { text: "OK", onPress: () => navigation.navigate(Route.HOMEPAGE) }
            ],
            { cancelable: false }
        );
      }
    onFail = (navigation) => {
        ToastAndroid.show("có lỗi xảy ra vui", ToastAndroid.SHORT);
        navigation.navigate(Route.HOMEPAGE)
      };
    _toDo = (navigation, values) =>{
        const { token } = this.state;
        let myVar = setInterval(async ()=>{
            if(!this.state.uploading) {
                postNew(token,{...values, picture: this.state.photos})
                    .then(() => {
                        this.setState({loading: false})
                        this.showMessages(navigation)
                    })
                    .catch(error=> {
                        this.onFail(navigation);
                    })
                clearInterval(myVar);
            }
        }, 1000);
    }
    setAddress = (str) =>{
        console.log(str)
        this.setState({address: str})
    }
    setLocalPhotos = (arr) => {
        this.setState({localPhotos: arr})
    }
    _onDoUploadPress = () => {
        const { localPhotos } = this.state;
        this.setState({uploading: true})
        if (localPhotos && localPhotos.length > 0) {
          let formData = new FormData();
          localPhotos.forEach((image) => {
            const file = {
              uri: image.path,
              name: image.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
              type: image.mime || 'image/jpeg'
            };
            formData.append('photo', file);
          });
          postPicture(formData)
            .then(res => {
                if(res.message === 'success!') {
                    this.setState({photos: res.picture})
                    this.setState({uploading: false})
                }
                else console.log('Error ....')
            })
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
    const { navigation,  } = this.props;
    const {token, localPhotos} = this.state;
    return (
        token !==''? <Fragment>
            <StatusBar barStyle="dark-content" />
            {this._showLoading() }
            <SafeAreaView style ={{marginTop: 20}}>
                <KeyboardAwareScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <Formik
                    initialValues = {{ 
                        title:'' ,
                        price:'',
                        area: '',
                        phone: '',
                        description: '',
                        street: '',
                        apartment_number:''}
                    }
                    onSubmit = {(values) => {
                         this._handelPost(values, navigation)
                    }}
                    validationSchema = {this.validationSchema} >
                        {formikProps => (
                            <View style={{backgroundColor: '#F2F2F2'}}>
                                <Text style={styles.header}>Phần thông tin:</Text>
                                <Contact formikProps = { formikProps }/>
                                <Text style={styles.header}>Phần liên hệ:</Text>
                                <SelectAddress  formikProps = {formikProps} setAddress = { this.setAddress}/>
                                <Text style={styles.header}>Phần liên lạc:</Text>
                                <PhoneContent formikProps = {formikProps} />
                                <Text style={styles.header}>Phần hình ảnh:</Text>
                                <UploadImages setLocalPhotos = {this.setLocalPhotos} localPhotos = {localPhotos} />
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