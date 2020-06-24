import React, {useEffect }  from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions, FlatList, RefreshControl } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


import icMenu from '../../assets/icons/bars.png';
import icHeart from '../../assets/icons/h.png'
import icAddNew from '../../assets/icons/add_news.png'
import icFilter from '../../assets/icons/filter.png'
import icLocationFilter from '../../assets/icons/location2.png'
import icDown from '../../assets/icons/down-arrow.png'
import icArea from '../../assets/icons/area.png'
import icPrice from '../../assets/icons/price.png'

import { Item }from '../../components/Item';
import getNews from '../../api/getNews';
import getNewsFilter from '../../api/getNewsFilter';
import Route from '../../constants/Route';
import Button from '../../components/Button'
var { width,height } = Dimensions.get('window');

export const HomeScreen = ({navigation}) => {
 
  const [ listNews, setListNews ] = React.useState([]);
  const [ page, setPage ] = React.useState(1);
  const [ refreshing, setRefresh ] = React.useState(false);
  const [ isLoading, setLoading ] = React.useState(true);
  const [ isShowFilter, setShowFilter ] = React.useState(false);

  const [ city, setCity ] = React.useState({code: -1, name: ''});
  const [ district, setDistrict ] = React.useState({code: -1, name:''});
  const [ ward, setWard ] = React.useState({code: -1, name:''});
  const [ price, setPrice ] = React.useState({code: -1, title: ''});
  const [ area, setArea ] = React.useState({code: -1, title: ''});

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
  const _showTopToolbar = () =>{
    return <View style={styles.TopToolbar}>
        <TouchableOpacity
          style={{width: width/6}}
          onPress={() => navigation.openDrawer()}>
          <View  style={{marginLeft: 10}} >
            <Image
              source= {icMenu}
              style={{width: 25, height: 25, marginTop: 10}}/>
          </View>
        </TouchableOpacity>

        <Text style={[styles.title, {width: 7*width/15, color: 'black'}]}>Trang chủ</Text>

        <TouchableOpacity
          style={{width: width/12, width: 60}}
          onPress={() => navigation.navigate(Route.STORAGE)}>
          <View  style={{marginLeft: 10}} >
            <Image 
              source= {icHeart}
              style={{width: 25, height: 25, marginTop: 10}}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
         style={{width: width/12, width: 70}}
          onPress={() => navigation.navigate(Route.POST)}>
          <View  style={{marginLeft: 10}} >
            <Image 
              source= {icAddNew}
              style={{width: 40, height: 40, marginTop: 10}}/>
          </View>
        </TouchableOpacity>
      </View>
  }

  const _showFilter = (navigation) => {

    const _handleFilterCity = (item) => {
      setCity({code: item.code, name: item.title})
      setDistrict({code: -1, name:''})
      setWard({code: -1, name: ''})
    }
    const _handleFilterDistrict = (item) => {
      setDistrict({code: item.code, name: item.title})
      setWard({code: -1, name: ''})
    }
    const _handleFilterWard = (item) => {
      setWard({code: item.code, name: item.title})
    }
    const _handleFilterArea = ({code, title}) => {
      setArea({code, title})
    }
    const _handleFilterPrice= ({code, title}) => {
      setPrice({code, title})
    }
    const _handleUnFilterCity = () => {
      setCity({code: -1, name: ''})
      _handleUnFilterDistrict();
    }
    const _handleUnFilterDistrict = () => {
      setDistrict({code: -1, name:''})
      _handleUnFilterWard();
    }
    const _handleUnFilterWard = () => {
      setWard({code: -1, name: ''})
    }
      if(isShowFilter) 
        return (
            <View style={styleFilters.container}>
              <View style = {{width:width/2-20, marginLeft: 15,}}>
                <TouchableOpacity
                onPress = {()=> navigation.push(Route.FILTER,
                  {
                    filter: 1, 
                    city ,
                    price,
                    area,
                    title: 'Chọn Tỉnh/Thành phố', 
                    _handleFilter: _handleFilterCity, 
                    _handleUnFilter: _handleUnFilterCity,
                    _handleLoadDataFilter
                  })}
                style = {styleFilters.item}>
                  <View  style={{marginLeft: 10, flexDirection: 'row'}} >
                    <Image source= {icLocationFilter} style ={styleFilters.icon}/>
                        <Text style={styleFilters.title}>{city.name ===''? 'Tỉnh/Thành Phố': city.name}</Text>
                    <Image source= {icDown} style ={styleFilters.icon1}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {()=> navigation.push(Route.FILTER,
                  {
                    filter: 2, 
                    city, 
                    district, 
                    price,
                    area,
                    title: 'Chọn Quận/Huyện',
                    _handleFilter: _handleFilterDistrict, 
                    _handleUnFilter: _handleUnFilterDistrict, 
                    _handleLoadDataFilter
                  })}
                style = {[styleFilters.item, {marginTop: 6}]}>
                  <View  style={{marginLeft: 10, flexDirection: 'row'}} >
                    <Image source= {icLocationFilter} style ={styleFilters.icon}/>
                      <Text style={styleFilters.title}>{district.name ===''? 'Quận/Huyện': district.name}</Text>
                    <Image source= {icDown} style ={styleFilters.icon1}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {()=> navigation.push(Route.FILTER,
                  {
                    filter: 3, 
                    city, 
                    district, 
                    ward, 
                    price,
                    area,
                    title: 'Chọn Phường/Xã', 
                    _handleFilter: _handleFilterWard, 
                    _handleUnFilter:_handleUnFilterWard, 
                    _handleLoadDataFilter
                  })}
                style = {[styleFilters.item, {marginTop: 6}]}>
                  <View  style={{marginLeft: 10, flexDirection: 'row'}} >
                    <Image source= {icLocationFilter} style ={styleFilters.icon}/>
                    <Text style={styleFilters.title} numberOfLines={1}>{ward.name ===''? 'Phường/Xã': ward.name}</Text>
                    <Image source= {icDown} style ={styleFilters.icon1}/>
                  </View>
                </TouchableOpacity>
              </View>

              <View style = {{width:width/2- 20, marginLeft: 5}}>
              <TouchableOpacity
                onPress = {()=> navigation.navigate(Route.FILTER,
                  {
                    filter: 4, 
                    title: 'Chọn khoảng giá',
                    city, 
                    district, 
                    ward, 
                    price,
                    area,
                    _handleFilter: _handleFilterPrice,
                    _handleLoadDataFilter
                  })}
                style = {styleFilters.item}>
                  <View  style={{marginLeft: 10, flexDirection: 'row'}} >
                    <Image source= {icPrice} style ={styleFilters.icon}/>
                      <Text style={styleFilters.title} numberOfLines={1} >{price.title === ''?'Chọn giá': price.title.replace(',', ' tới ')}</Text>
                    <Image source= {icDown} style ={styleFilters.icon1}/>
                  </View>
                </TouchableOpacity>
              <TouchableOpacity
                onPress = {()=> navigation.navigate(Route.FILTER,
                  {
                    filter: 5, 
                    title: 'Chọn diện tích',
                    city, 
                    district, 
                    ward, 
                    price,
                    area,
                    _handleFilter: _handleFilterArea,
                    _handleLoadDataFilter
                  })}
                style = {[styleFilters.item, {marginTop: 6}]}>
                  <View  style={{marginLeft: 10, flexDirection: 'row'}} >
                    <Image source= {icArea} style ={styleFilters.icon}/>
                      <Text style={styleFilters.title} numberOfLines={1} >{area.title ===''? 'Chọn diện tích': area.title.replace(',', ' tới ')}</Text>
                    <Image source= {icDown} style ={styleFilters.icon1}/>
                  </View>
              </TouchableOpacity>
              </View>
            </View> 
         )
  }

  return (
    <View style = {styles.container}>
      { _showTopToolbar()}
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
   title: {
     marginTop: 5,
     marginBottom:20,
     fontSize: 28,
     marginLeft: width/20,
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
  TopToolbar:{
    flexDirection: 'row', 
    backgroundColor:'#757575'
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
const styleFilters = StyleSheet.create({
  icon1:{width: 17, height: 17, marginTop: 3},
  icon:{width: 15, height: 15, marginTop: 4},
  title: {width: width/3-20, marginLeft: 10, marginTop: 2},
  container: {
    flexDirection: 'row',
    height: 90,
    width: width,
  },
  item: {height: 25, backgroundColor: 'white',borderWidth: 1, borderColor: '#7EBFEF' ,borderRadius: 5},

}); 

