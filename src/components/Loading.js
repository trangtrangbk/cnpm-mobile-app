import Spinner from 'react-native-loading-spinner-overlay';

export const Loading = (isLoading) =>{
    if(isLoading) 
      return <Spinner visible={isLoading} textStyle={{color: '#FFF'}}/>
  }