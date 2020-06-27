import { AsyncStorage } from 'react-native'
const removeUser = async() =>{
    try {
        await AsyncStorage.removeItem('@user');
        return true;
    }
    catch(exception) {
        return false;
    }
}
export default removeUser;