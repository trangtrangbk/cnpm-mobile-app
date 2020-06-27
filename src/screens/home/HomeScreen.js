import React, {useEffect }  from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import icFilter from '../../assets/icons/filter.png'

import { Item }from '../../components/Item';
import {TopToolbar} from '../../components/home/TopToolbar';
import {ShowFilter} from '../../components/home/Filter';

import getNewsFilter from '../../api/getNewsFilter';
var { width,height } = Dimensions.get('window');

export const HomeScreen = ({navigation}) => {
 
  const [ listNews, setListNews ] = React.useState([]);
  const [ page, setPage ] = React.useState(1);
  const [ refreshing, setRefresh ] = React.useState(false);
  const [ isLoading, setLoading ] = React.useState(true);
  const [ isShowFilter, setShowFilter ] = React.useState(false);

  const [ params, setParam ] = React.useState(`city=&district=&ward=&price=&area=`);
  useEffect(() => {
    setShowFilter(true)
    getNewsFilter(1, params)
      .then(res => {
        setListNews(res.data);
        setLoading(()=>false)
      })
      console.log("HOME____________________Component-Did-mount");
    return () => {
      console.log("HOME____________________Component-Will-Un-mount");
    };
  }, []);

  const _handleLoadDataFilter = ({city}, {district}, {ward}, {price}, {area}) =>{
    setShowFilter(true)
    setRefresh(true)
    setPage(1)
    setListNews([])
    let str = `city=${city}&district=${district}&ward=${ward}&price=${price}&area=${area}`;
    setParam(str);
    getNewsFilter(1, str)
      .then(res => {
        setListNews(res.data);
        setRefresh(false)
      })
  }

  const handleLoadMore = () =>{
    getNewsFilter(page+1, params)
      .then(res =>{
        setPage(page+1),
        setListNews([...listNews,...res.data])
      })
  }
  const _onRefresh = () => {
    setShowFilter(true)
    setRefresh(true)
    setPage(1)
    setListNews([])
    getNewsFilter(1, params)
      .then(res => {
        setListNews(res.data);
        setRefresh(false)
      })
  }
  const _filterButtonHandler = () =>{
    setShowFilter(isShowFilter=> !isShowFilter)
  }  
  const _showLoading = () =>{
    if(isLoading) 
      return <Spinner visible={isLoading} textStyle={{color: '#FFF'}}/>
  }
  const _showFilter = (navigation) => {
    return <ShowFilter navigation={navigation} _handleLoadDataFilter = {_handleLoadDataFilter} isShowFilter= {isShowFilter}/>
  }

  return (
    <View style = {styles.container}>
      <TopToolbar navigation = {navigation}/>
      <View style={styles.divider}/>
      { _showFilter(navigation)}
       <View style={styles.divider}/>
        {_showLoading()}
      <FlatList
        data={listNews}
        renderItem={({ item }) => <Item navigation= { navigation } item = { item } />}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
        }
        onRefresh ={false}
        refreshing={refreshing}
        onEndReached = { handleLoadMore }
        onScroll ={(e) =>setShowFilter(false)}
        onEndThreshold = { 0 }
        />
      <TouchableOpacity
        onPress={_filterButtonHandler}
        style={styles.downButton}>
        <Image
          source={icFilter}
          style={styles.downButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
};
 const styles = StyleSheet.create({
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
    top: 2*height/3,
  },
  downButtonImage: {
    opacity: 0.5,
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
}); 


