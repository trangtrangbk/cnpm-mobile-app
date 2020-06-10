import React, {useEffect } from 'react';
import { View ,StyleSheet, TouchableOpacity,SafeAreaView,
   Image, Dimensions, TextInput, Platform , ScrollView, StatusBar} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-crop-picker'; //
import ActionSheet from 'react-native-actionsheet';//
import NumberFormat from 'react-number-format';
import Textarea from 'react-native-textarea';
import { Formik } from 'formik';
import * as yup from 'yup';

import {Button, Block,Text ,Input } from '../../../components/index'
import icMenu from '../../../assets/icons/bars.png';
import Route from '../../../constants/Route';
import getUser from '../../../api/getUser';
import getDistrictByCity from '../../../api/apiPlaces/getDistrictByCity';
var { width, height } = Dimensions.get('window');


class PostScreenCopy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            city: '',
            district:'',
            ward:'',
            cities: [],
            districts: [],
            wards: [],
            localPhotos: [],
            electedPhotoIndex: 0,
        };
        this.onDoUploadPress = this.onDoUploadPress.bind(this);
      }
      onPressAddPhotoBtn = () => {
        this.ActionSheetSelectPhoto.show();
      };
      showActionSheet = index => {
        this.setState({
          selectedPhotoIndex: index
        });
        this.ActionSheet.show();
      };

      onActionDeleteDone = index => {
        if (index === 0) {
          const array = [...this.state.localPhotos];
          array.splice(this.state.selectedPhotoIndex, 1);
          this.setState({ localPhotos: array });
        }
      };
      onActionSelectPhotoDone = index => {
        switch (index) {
          case 0:
            ImagePicker.openCamera({}).then(image => {
              this.setState({
                localPhotos: [...this.state.localPhotos, image]
              });
            });
            break;
          case 1:
            ImagePicker.openPicker({
              multiple: true,
              maxFiles: 10,
              mediaType: 'photo'
            }).then(images => {
              images.forEach((image) => {
                this.setState({
                  localPhotos: [...this.state.localPhotos, image]
                });
              });
            }).catch(error => {
              alert(JSON.stringify(error));
            });
            break;
          default:
            break;
        }
      };
    
      renderListPhotos = localPhotos => {
        const photos = localPhotos.map((photo, index) => (
          <TouchableOpacity key={index}
            onPress={() => {
              this.showActionSheet(index);
            }}
          >
            <Image style={styles.photo} source={{ uri: photo.path }} />
          </TouchableOpacity>
        ));
    
        return photos;
      };
    
      renderSelectPhotoControl = localPhotos => {
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Select photos</Text>
            <ScrollView style={styles.photoList} horizontal={true}>
              {this.renderListPhotos(localPhotos)}
              <TouchableOpacity onPress={this.onPressAddPhotoBtn.bind(this)}>
                <View style={[styles.addButton, styles.photo]}>
                  <Text style={styles.addButtonText}>+</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );
      };

      render() {
        return (
          <Fragment>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <Image style={{ width: 143, height: 30 }} source={{ uri: 'https://tuanitpro.com/wp-content/uploads/2015/04/logo.png' }} />
                <View style={styles.body}>
                  {this.renderSelectPhotoControl(this.state.localPhotos)}
                  <View style={styles.sectionContainer}>
                    <TouchableOpacity onPress={this.onDoUploadPress}>
                      <Text style={styles.sectionTitle}>Upload now</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Logs</Text>
                    <TextInput multiline numberOfLines={10} style={{ height: 250, borderColor: 'gray', borderWidth: 1 }}
                      value={this.state.logs}
                    />
                  </View>
                </View>
              </ScrollView>
              <ActionSheet
                ref={o => (this.ActionSheet = o)}
                title={'Confirm delete photo'}
                options={['Confirm', 'Cancel']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={index => {
                  this.onActionDeleteDone(index);
                }}
              />
              <ActionSheet
                ref={o => (this.ActionSheetSelectPhoto = o)}
                title={'Select photo'}
                options={['Take Photo...', 'Choose from Library...', 'Cancel']}
                cancelButtonIndex={2}
                destructiveButtonIndex={1}
                onPress={index => {
                  this.onActionSelectPhotoDone(index);
                }}
              />
            </SafeAreaView>
          </Fragment>
        );
      }
}

const styles = StyleSheet.create({
    item:{
     marginTop: 10,
     marginLeft: 20,
     width: 2*width/3+20,
     height: height/10,
     backgroundColor: 'pink'
    },
    input:{
     marginLeft: 50,
     marginRight: 50,
     borderColor:'#F2F2F2',
     borderBottomColor: 'red',
     borderWidth: 1
   },
    title: {
      marginBottom:20,
      fontSize: 30,
      marginLeft: width/6,
     },
     label: {
       fontSize: 17,
       
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
     body: {
       backgroundColor: 'white',
     },
     sectionContainer: {
       marginTop: 32,
       paddingHorizontal: 24,
     },
     sectionTitle: {
       fontSize: 24,
       fontWeight: '600',
       color: 'black',
     },
     sectionDescription: {
       marginTop: 8,
       fontSize: 18,
       fontWeight: '400',
       color: 'red',
     },
     highlight: {
       fontWeight: '700',
     },
     section: {
       backgroundColor: 'white'
     },
     row: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom: 10
     },
     addPhotoTitle: {
   
       fontSize: 15,
   
       fontWeight: 'bold'
     },
     photoList: {
       height: 70,
       marginTop: 15,
       marginBottom: 15,
       marginRight: 10
     },
     photo: {
       marginRight: 10,
       width: 70,
       height: 70,
       borderRadius: 10
     },
   
     addButton: {
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: '#3399cc'
     },
     photoIcon: {
       width: 50,
       height: 50
     },
     addButtonContainer: {
       padding: 15,
       justifyContent: 'flex-end'
     },
     addButtonText: {
       color: 'white',
       fontWeight: 'bold',
       fontSize: 48
     }
 }); 

 export default PostScreenCopy;
 