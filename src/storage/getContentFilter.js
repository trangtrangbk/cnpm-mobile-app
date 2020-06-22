import { AsyncStorage } from 'react-native';
const getContentFilter = async () => {
    try {
        const value = await AsyncStorage.getItem('@content');
        if(value !== null) {
            return value;;
        }
        return '';
    }catch (error){
        return '';
    }
};
export default getContentFilter;