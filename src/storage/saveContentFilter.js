import { AsyncStorage } from 'react-native'
const  saveContentFilter = async ( content ) => {
    
    await AsyncStorage.setItem('@content', content);
}
export default saveContentFilter;