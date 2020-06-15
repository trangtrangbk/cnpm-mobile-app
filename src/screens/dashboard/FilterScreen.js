import React, {useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, } from 'react-native';
var { width,height } = Dimensions.get('window');

import geCities from '../../api/apiPlaces/getCities'
import getDistricts from '../../api/apiPlaces/getDistrict';
import getWards from '../../api/apiPlaces/getWards'


export const FilterScreen = ({navigation, route}) => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const {filter, city, district} = route.params;
    if(filter === 1) {
      geCities().then(res =>res.map(item => console.log(item.title)))
    }
    else if(filter === 2 && city !== 0) {
      getDistricts(city).then(res => res.map(item =>console.log(item.title)))
    }
    else if(filter === 3 && city !== 0 && district !== 0 ){
      getWards(city, district).then(res =>res.map(item => console.log(item.title)))
    }
    return () => {
      console.log("Filters____________________Component-Will-Un-mount");
    };
  }, []);

  const _showMain = () =>{
    if(route.params.filter===1) 
      return(
        <View > 
          <Text>Chọn Tỉnh/Thành phố</Text>
        </View>
      )
  }

  const _showTopToolbar = () =>{
    return(
      <View style={styleTopBars.view}>
        <Text>{route.params.title}</Text>
      </View>
    )
  }
  return (
    <View style = {styles.container}>
        {_showTopToolbar()}
        <View style={styles.divider}/>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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