import { AsyncStorage } from 'react-native';
const getID = async () => {
    try {
        const value = await AsyncStorage.getItem('@ID');
        if(value !== null) {
            return value;;
        }
        return '';
    }catch (error){
        return '';
    }
};
export default getID;