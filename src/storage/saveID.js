import { AsyncStorage } from 'react-native'
const  saveID = async ( data ) => {
    
    await AsyncStorage.setItem('@ID', data);
}
export default saveID;