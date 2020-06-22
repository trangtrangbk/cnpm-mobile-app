import { AsyncStorage } from 'react-native'
import getNewsInStorage from '../api/getNewsInStorage';
const  saveNew = async ( data ) => {

    getNewsInStorage().then( async (result)=> {

        await AsyncStorage.setItem('@news', JSON.stringify([data,...result]));
    })
}
export default saveNew;