import React, {useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Item } from '../../components/Item';
import getNewsInStorage from '../../api/getNewsInStorage';

var { width, height } = Dimensions.get('window');

export const StorageScreen = ({navigation}) => {
  const [data, setData] = React.useState([])
  useEffect(() => {
    getNewsInStorage()
      .then(result => setData(result))
    return () => {
    };
  }, []);

  const _showMessages = () =>{
    console.log(data.length)
    if(data.length===0) return (
      <View style ={{marginTop: height/2-25, alignSelf: 'center'}}>
        <Text style={{fontSize: 17}}>Chưa có bài viết nào được lưu</Text>
      </View>
    )
  }
  return (
    <View style = {styles.container}>
      {_showMessages()}
      <KeyboardAwareScrollView>
        <FlatList
            data={data}
            renderItem={({ item }) => <Item navigation= { navigation } item = { item }/>}
            keyExtractor={item => item._id}/> 
      </KeyboardAwareScrollView>
    </View>
  );
};
 const styles = StyleSheet.create({
   title: {
     marginBottom:20,
     fontSize: 40,
     marginLeft: width/6,
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
  }
}); 
