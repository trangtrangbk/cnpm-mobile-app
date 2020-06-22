import { AsyncStorage } from 'react-native';
const getNewsInStorage = async () => {
    try {
        const value = await AsyncStorage.getItem('@news');
        if(value !== null) {
            return JSON.parse(value);
        }
        return [];
    }catch (error){
        return [];
    }
};

export default getNewsInStorage;