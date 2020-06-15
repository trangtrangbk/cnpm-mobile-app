import { AsyncStorage } from 'react-native'

const removeItem = async() => {
    try {
        await AsyncStorage.removeItem('@news');
        return true;
    }
    catch(exception) {
        return false;
    }
}

export default removeItem;