import React , {useEffect} from 'react';
import { View, StyleSheet, Text, Dimensions , FlatList, TouchableOpacity, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import getMyNews from '../../../api/getMyNews'
import getToken from '../../../storage/getToken';
import getID from '../../../storage/getID';

import ItemHistory from '../../../components/ItemHistory'
import icMenu from '../../../assets/icons/bars.png'

var { width,height } = Dimensions.get('window');


export const HistoryView = ({ navigation, route}) => {
  const [listData, setListData ] = React.useState([]);
  const [isLoading, setLoading ] = React.useState(true);
  const [token, setToken] = React.useState(true);
  useEffect(() => {
    getToken()
      .then(token =>{
        setToken(token)
        getMyNews(token)
          .then(res => {
            setListData(res.data)
            setLoading(false)
          })
      })
    return () => {
      
    };
  }, []);
  const _showLoading = () =>{
    if(isLoading) 
      return <Spinner visible={isLoading}  textStyle={{color: '#FFF'}}/>
  }

  const _handleRemove = (item) =>{
    setListData(listData.filter(i => i!== item))
  }

  return (
    <View style = {styles.container}>
       {_showLoading()}
       <View style ={styles.header}>
        <TouchableOpacity
            style={{width: width/12}}
            onPress={() => navigation.openDrawer()}>
            <View  style={{marginLeft: 10}} >
              <Image 
                source= {icMenu}
                style={{width: 25, height: 25, marginTop: 15}}/>
            </View>
          </TouchableOpacity>
          <Text style={[styles.title, {width: 7*width/12}]}>Bài viết của bạn</Text>
       </View>
        <View style={styles.divider}/>
        <FlatList
        data={listData}
        renderItem={({ item }) => <ItemHistory navigation= { navigation } item = { item } token ={token} _handleRemove={ _handleRemove} route= {route}/>}
        keyExtractor={item => item._id}>
       </FlatList>
    </View>
  );
};

 const styles = StyleSheet.create({
   title: {
    marginTop: 8,
    marginBottom:20,
    fontSize: 28,
    marginLeft: width/20,
    color: 'black'
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
  header:{
    flexDirection: 'row', 
  }
}); 
