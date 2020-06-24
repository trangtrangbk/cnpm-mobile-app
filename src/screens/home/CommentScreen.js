import React, {useEffect } from 'react';
import { 
  View,
  StyleSheet, 
  Text, 
  Dimensions, 
  FlatList, 
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ToastAndroid,
  RefreshControl
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay';
import { Formik } from 'formik'
import moment from 'moment';
import * as yup from 'yup'

import getComments from '../../api/fetchComments'
import postComment from  '../../api/postComment';
import getUser from '../../storage/getUser';

let viLocale = require('moment/locale/vi');
moment.locale('vi',viLocale)
var { width, height } = Dimensions.get('window');
import { ItemComment }from '../../components/comment/Item';
import {ModelComment } from '../../components/comment/ModelComment';
import { Loading } from '../../components/Loading'
import Button from '../../components/Button'
import icAvatar from '../../assets/icons/avatar.png';
import icWrite from '../../assets/icons/write.png';
import icCancel from '../../assets/icons/wrong.png';


export const CommentScreen = ({navigation , route}) => {
  const [showForm, setShowForm] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [name, setName] = React.useState('');
  const [ isLoading, setLoading ] = React.useState(true);
  const [ refreshing, setRefresh ] = React.useState(false);
  useEffect(() => {
    const {id} = route.params;
    getComments(id)
      .then(res => {
        setComments(res)
        setLoading(()=>false)
      })
    getUser().then(user => {
      if(user) setName(user.name)
    })
    return () => {
      console.log("Filters____________________Component-Will-Un-mount");
    };
  }, []);
  const _onRefresh = () => {
    const {id} = route.params;
    setRefresh(true)
    getComments(id)
      .then(res => {
        setComments(res)
        setRefresh(false)
      })  
  }
  const _postComment = ({name, comment}) =>{
    const {id} = route.params;
    setShowForm(false)
    postComment(id, {nameWriter: name, comment})
      .then(res => {
        setComments([res,...comments])
        onSuccess()
      })
      .catch(err=>{
        ToastAndroid.show("Xin lỗi đã có lỗi xảy ra, vui lòng kiểm tra lại", ToastAndroid.SHORT);
      })
  }
  const onSuccess = () =>{
    ToastAndroid.show("Gửi bình luận thành công", ToastAndroid.SHORT);
  }
  const _showFormInfo = () => {
    setShowForm(showForm=>!showForm)
  }
  // const ItemComment = ({item}) => {
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.content}> 
  //         <Image source = {icAvatar} style={styles.avatar}/>
  //         <View style={styles.name_day}> 
  //           <Text style={styles.txtName}>{item.nameWriter}</Text>
  //           <Text style={styles.txtDay}>{moment(item.createDay).fromNow()} - {moment(item.createDay).format('DD/MM/YYYY')}</Text>
  //         </View>
  //       </View>
  //       <Text style={styles.txtContent}>{item.comment}</Text>
  //     </View>
  //     )
  // }
  const _showTopToolbar = () =>{
    return(
      <View style={styleTopBars.view}>
        <Text numberOfLines={1}>Bình luận[ {route.params.name} ]</Text>
      </View>
    )
  }
  const showModelComment  = () => {
    return(
      <ModelComment showForm ={showForm} name= {name} setShowForm = {setShowForm} PostComment = {_postComment}/>
    )
    // const validationSchema = yup.object().shape({
    //   name: yup.string().label('name').required('vui lòng nhập tên!'),
    //   comment: yup.string().label('comment').required('Vui lòng nhập nội dung'),
    // })
    // return (
    //   <View style={styles.centeredView}>
    //     <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={showForm}>
    //       <View style={styles.centeredView}>
    //         <View style={styles.modalView}>
    //         <View style = {{flexDirection: 'row',}}>
    //           <Text style = {styles.titleModel}>Để lại bình luận của bạn:</Text>
    //           <Button
    //           style={{backgroundColor: 'white', width: 40, height: 40, marginTop: -30}}
    //            onPress={() => {
    //             setShowForm(showForm => !showForm)
    //           }}>
    //             <Image source={icCancel} style={styles.cancel}/>
    //           </Button>
    //        </View>
    //           <Formik
    //             initialValues = {{name: name!==''?name:'',comment: ''}}
    //             onSubmit = {(values) => {
    //            _postComment(values)
    //           }}
    //             validationSchema = {validationSchema}>
    //             {formikProps => (
    //                 <View style={{borderRadius: 10, borderColor: '#DEE1E6', borderWidth: 1,width: width -60, backgroundColor: 'white'}} >
    //                   <TextInput
    //                     style={{marginLeft: 10, height: 40}}
    //                     formikProps = {formikProps}
    //                     label='name'
    //                     placeholder={'Nhập tên(bắt buộc)'}
    //                     value={formikProps.values.name}
    //                     onChangeText = {formikProps.handleChange('name')}
    //                     onBlur = {formikProps.handleBlur('name')}/> 
    //                   <Text style = {styles.txtError}>
    //                       {formikProps.touched['name'] && formikProps.errors['name']} 
    //                   </Text>
    //                   <View style={styles.dividerForm}/>
    //                   <TextInput
    //                     multiline={true}
    //                     placeholder={'Nhập nội dung(bắt buộc)'}
    //                     numberOfLines={10}
    //                     label='comment'
    //                     value={formikProps.values.comment}
    //                     onChangeText = {formikProps.handleChange('comment')}
    //                     onBlur = {formikProps.handleBlur('comment')}
    //                     style={{ height:120, textAlignVertical: 'top',marginLeft: 10,}}/>  
    //                   <Text style = {styles.txtError}>
    //                       {formikProps.touched['comment'] && formikProps.errors['comment']} 
    //                   </Text> 
    //                   <View style={styles.dividerForm}/>
    //                   <Button
    //                     onPress={ formikProps.handleSubmit}
    //                     style={{ marginBottom: 12 , marginTop: 15, marginLeft: width/6+10, borderRadius: 15, width: width/2, backgroundColor: '#4dc3ff'}}
    //                   >
    //                     <Text button >Gửi bình luận</Text>
    //                   </Button>         
    //                 </View>
    //             )}
    //           </Formik>
    //         </View>
    //       </View>
    //     </Modal>
    //   </View>
    // )
  }

  const showListComment = () =>{
    return(
      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}>
        {comments.length!==0?
         <FlatList
            style = {showForm? {height: 8*height/15}:{}}
            data={comments}
            renderItem={({item}) => <ItemComment item = {item}/>}
            keyExtractor={item => item._id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
            }
            onRefresh ={false}
            refreshing={refreshing}
          />
          :
          <View style = {styles.container1}>
             <Text style = {styles.header}>Chưa có bài viết nào</Text>
          </View>
        }
      </KeyboardAwareScrollView>
    )
  }
  const _showLoading = () =>{
    <Loading isLoading= {isLoading}/>
  }
  return (
    <View >
        {_showLoading()}
        {_showTopToolbar()}
        <View style={styles.divider}/>
        {showListComment()}
        {!showForm?<TouchableOpacity
          style={styles.downButton}
          onPress = {() =>  setShowForm(showForm=>!showForm)}>
          <Image
            source={icWrite}
            style={styles.downButtonImage}
          />
        </TouchableOpacity>:<View/>}
      {showModelComment()}
    </View>
  );
};
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
  downButton: {
    opacity: 0.5,
    borderRadius: 50,
    backgroundColor:'rgba(255, 0, 0, 0.2)',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    top: 2*height/3+50,
  },
  downButtonImage: {
    opacity: 0.5,
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  // txtContent: {
  //   color:'#2B2B38',
  //   marginLeft: 70,
  //   marginBottom:20
  // },
  // content: {
  //   flexDirection: 'row',
  //   marginLeft: 10,
  //   marginTop: 10,
  //   marginBottom: 5,
  // },
  // container: {
  //   width: width-30,
  //   marginLeft: 15,
  //   backgroundColor: 'white',
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   borderColor:'#D3C1C1'
  // },
  txtError: {
    fontSize: 12,
    color: 'red', 
    marginTop: -15, 
    paddingBottom: 7,
    marginLeft: 16
  },
  // avatar:{
  //   width: 50,
  //   height: 50,
  //   borderRadius: 100
  // },
  // name_day: {
  //   marginLeft: 10,
  // },
  // txtName: {
  //   flexDirection: 'column',
  //   color: 'black',
  //   fontSize: 20,
  // },
  // txtDay: {
  //   color:'#767676',
  //   fontSize: 15.
  // },
  divider:{
    width: width,
    height: 1,
    backgroundColor: '#DADBDC',
    marginBottom: 10,
  },
});
const styleTopBars = StyleSheet.create({
  view: {height: 60, width: width, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}

}); 

const styleTFilters = StyleSheet.create({

title: {
  marginTop: 10,
  height: height/20
},
divider:{
  width: width-20,
  height: 1,
  backgroundColor: '#DADBDC',
},
})