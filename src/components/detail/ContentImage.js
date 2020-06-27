import React from 'react';
import { 
    Image,
    StyleSheet, 
    Dimensions
} from 'react-native';;
import Lightbox from 'react-native-lightbox';
import Swiper from 'react-native-swiper'

var { width,height } = Dimensions.get('window');

export const ContentImage = ({picture}) =>{
    return(
      <Swiper style= {{height: 250}} showsButtons={true}>
      {picture.map(item =>{
        return (
          <Lightbox>
            <Image
            style = {styles.img}
            source={{
              uri: item,
          }}/> 
          </Lightbox>
        )})}
    </Swiper>
    )
  }
  const styles = StyleSheet.create({
    img : {
        height: height/3+15,
        width: width,
    },
  })