import { AsyncStorage } from 'react-native'
const  saveUser = async ( user ) => {
    await AsyncStorage.setItem('@user', JSON.stringify(user));
}
export default saveUser;