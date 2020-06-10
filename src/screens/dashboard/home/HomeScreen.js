import React, {useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl, ListView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import icMenu from '../../../assets/icons/bars.png';
import { Item }from '../../../components/Item';
import getNews from '../../../api/getNews';
var { width,height } = Dimensions.get('window');

export const HomeScreen = ({navigation}) => {
 
  const [listNew, setListNew] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [refreshing, setRefresh] = React.useState(false);

  useEffect(() => {
    getNews(page)
      .then(res => {
        setListNew(res.data);
      })
    return () => {
      console.log("HOME____________________Component-Will-Un-mount");
    };
  }, []);

  const handleLoadMore = () =>{
    setRefresh(true)
    getNews(page+1)
      .then(res =>{
        setPage(page+1),
        setListNew([...listNew,...res.data])
      })
  }

  return (
    <View style = {styles.container}>
      
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}>
          <View  style={{marginLeft: 10}} >
            <Image 
              source= {icMenu}
              style={{width: 25, height: 25, marginTop: 15}}/>
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>Trang chủ</Text>
      </View>
       <View style={styles.divider}/>
 
        <FlatList
          data={listNew}
          renderItem={({ item }) => <Item navigation= { navigation } item = { item } />}
          keyExtractor={item => item._id}
          refreshing={refreshing}
          onEndReached = { handleLoadMore }
          onEndThreshold = { 0 }
          />
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
