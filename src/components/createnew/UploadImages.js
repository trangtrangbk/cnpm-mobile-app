import React from 'react';
import { 
    View ,
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    ScrollView 
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker'; 
import ActionSheet from 'react-native-actionsheet';
import {Text } from '../../components/index'
export default class UploadImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            electedPhotoIndex: 0,
        }
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
        const  { localPhotos, setLocalPhotos } = this.props;
        if (index === 0) {
        const array = [...localPhotos];
        array.splice(this.state.selectedPhotoIndex, 1);
        setLocalPhotos(array);
        }
    };
    onActionSelectPhotoDone = index => {
        const  { localPhotos, setLocalPhotos } = this.props;
        switch (index) {
            case 0:
                ImagePicker.openCamera({}).then(image => {
                setLocalPhotos([...localPhotos, image])
                });
                break;
            case 1:
                ImagePicker.openPicker({
                multiple: true,
                maxFiles: 10,
                mediaType: 'photo'
                })
                .then(images => {
                    setLocalPhotos([...localPhotos, ...images])})
                .catch(error => {
                console.log(JSON.stringify(error));
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
            }}>
                <Image style={styles.photo} source={{ uri: photo.path }} />
            </TouchableOpacity>
        ));
        return photos;
    };
    renderSelectPhotoControl = localPhotos => {
        return (
            <View style={styles.sectionContainer}>
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
    const  {localPhotos} = this.props;
      return(
        <View style={viewStyles.item}>
            {this.renderSelectPhotoControl(localPhotos)}
            <ActionSheet ref={o => (this.ActionSheet = o)}
                title={'Confirm delete photo'}
                options={['Confirm', 'Cancel']}
                cancelButtonIndex={1}
                destructiveButtonIndex={0}
                onPress={index => {this.onActionDeleteDone(index);}}/>
            <ActionSheet ref={o => (this.ActionSheetSelectPhoto = o)}
                title={'Select photo'}
                options={['Take Photo...', 'Choose from Library...', 'Cancel']}
                cancelButtonIndex={2}
                destructiveButtonIndex={1}
                onPress={index => {this.onActionSelectPhotoDone(index);}}/>
        </View>
      )

    }
}
const styles = StyleSheet.create({

   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   photoList: {
     height: 70,
     marginTop: -20,
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
   addButtonText: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: 48
   }
}); 

const viewStyles = StyleSheet.create({
  item: {
      backgroundColor: 'white',
      marginTop: 10, 
      paddingTop: 20,
      paddingBottom: 20 ,
      marginLeft: 10, 
      marginRight: 10, 
      borderWidth: 1, 
      borderColor: '#AAC4D6', 
      borderRadius: 10,},
  
});