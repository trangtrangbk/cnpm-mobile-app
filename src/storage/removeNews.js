import { AsyncStorage } from 'react-native'
import getNewsInStorage from '../api/getNewsInStorage';
const removeItem = async(item, list) => { 
    try {
        await AsyncStorage.removeItem('@news');
        await AsyncStorage.setItem('@news', JSON.stringify(list.filter(i => i._id!==item._id)));
    }
    catch(exception) {
        return false;
    }
}

export default removeItem;