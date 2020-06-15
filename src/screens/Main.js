import React, {useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import { DrawerMenuHasToken, DrawerMenuHasNotToken } from '../screens/menu/MenuView';
import { MenuScreens } from '../screens/menu/Menu';

import { AuthContext } from "../contexts/AuthContext";
import getToken from '../api/getToken';
import saveToken from '../api/saveToken';
import checkLogin from '../api/checkLogin';
import saveUser from '../api/saveUser';
import getUser from '../api/getUser';

const Drawer = createDrawerNavigator();

export default () => {

  const [progress, setProgress] = React.useState(new Animated.Value(0));
  
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
    
  const authContext = React.useMemo(() => {
    return {
      signIn: async () => {
        console.log('signIn MAIN')
        getToken()
          .then( item => {
            console.log(item, '----------------- signIn MAIN')
            setToken(item);
            checkLogin(item).then(res => {
              console.log(JSON.stringify(res),'get --- get')
              setUser(res.resultUser)
              console.log(JSON.stringify(res.resultUser )+'-------------- res.resultUser' )
              saveUser(res.resultUser)
            })
          })
      },
      chanInfo: async () =>{
        console.log('Change Information')
        getToken()
          .then( token => {
            setToken(token)
            getUser().then( user => setUser(user))})
      },
      signOut: () => {
        saveToken('')
        setToken('');
        saveUser(null);
      }
    };
  }, []);


  useEffect(() => {
    getUser().then(user => {
      console.log(user, '------------useEffect')
      setUser(user)
    });
    getToken().then(token => {setToken(token)})
    console.log("Main component-Did-mount");
    return () => {
      console.log("component-Will-Un-mount");
    };
  }, []);


  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };
  return (
    <LinearGradient style={{ flex: 1 }} colors={['#E94057', '#4A00E0']}>
      <AuthContext.Provider value={ authContext }>
        <Drawer.Navigator
          drawerType="slide"
          overlayColor="transparent"
          drawerStyle={styles.drawerStyles}
          contentContainerStyle={{ flex: 1 }}
          drawerContentOptions={{
            activeBackgroundColor: 'transparent',
            activeTintColor: 'white',
            inactiveTintColor: 'white',
          }}
          sceneContainerStyle={{ backgroundColor: 'transparent' }}
          drawerContent={props => {
            setProgress(props.progress);
            return token ? <DrawerMenuHasToken {...props} user = {user}/>: <DrawerMenuHasNotToken {...props} />;
          }}>
          <Drawer.Screen name="Screens">
            {props => <MenuScreens  {...props} style={animatedStyle} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </AuthContext.Provider>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
});
