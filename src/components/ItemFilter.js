import React,{useEffect} from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from 'react-native';

var { width,height } = Dimensions.get('window');

export const ItemFilter = ({item, _handleOnClick, content}) => {
const [status, setStatus] = React.useState(false);
    useEffect(() => {
        if(content){
            console.log(content, '1111111111111111111111111111111')
            if(item._id === content._id) setStatus(true)
            else setStatus(false)
        }
    }, []);

const _handleStatus = () =>{
    console.log(content, 'content')
    _handleOnClick(item)
    setStatus(true)
}
  return (
      <View>
        <TouchableOpacity style={status?styles.active: styles.unactive} onPress = {() => _handleStatus()}>
            <View style={styles.title}>
                <Text style={{alignSelf: 'center'}}>{item.title}</Text>
            </View>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>

  );
};
const styles = StyleSheet.create({
    active:{
        backgroundColor: '#b3ccff'
    },
    unactive: {
        backgroundColor: 'white'
    },
    title: {
        marginTop: 10,
        height: height/20
    },
    divider:{
        width: width,
        height: 1,
        backgroundColor: '#DADBDC',
      },
});