import React, {useEffect } from 'react';
import { 
  View,
  StyleSheet, 
  Dimensions, 
  FlatList, 
  Image,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay';
import getComments from '../../api/fetchComments'
import postComment from  '../../api/postComment';
import getUser from '../../storage/getUser';
import getToken from '../../storage/getToken';

import { 
  ItemComment, 
  ModelComment, 
  TopToolbar, 
  NotComment }from '../../components/comment';

import icWrite from '../../assets/icons/write.png';
var { width, height } = Dimensions.get('window');

export const CommentScreen = ({navigation , route}) => {
  const [showForm, setShowForm] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [name, setName] = React.useState('');
  const [ isLoading, setLoading ] = React.useState(true);
  const [ refreshing, setRefresh ] = React.useState(false);
  const [ token, setToken ] = React.useState('');
  useEffect(() => {
    const {id} = route.params;

    getToken().then(token => setToken(token));
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
    postComment(token, id, {nameWriter: name, comment})
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
  const showModelComment  = () => {
    return(
      <ModelComment showForm = {showForm} name= {name} setShowForm = {setShowForm} PostComment = {_postComment}/>
    )
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
          <NotComment/>
        }
      </KeyboardAwareScrollView>
    )
  }
  const _showLoading = () =>{
    if(isLoading) 
      return <Spinner visible={isLoading} textStyle={{color: '#FFF'}}/>
  }
  return (
    <View >
        {_showLoading()}
        <TopToolbar name={route.params.name}/>
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
  divider:{
    width: width,
    height: 1,
    backgroundColor: '#DADBDC',
    marginBottom: 10,
  },
});
