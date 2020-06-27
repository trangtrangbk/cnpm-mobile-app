import React, {useEffect } from 'react';
import Animated, { set } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerMenuHasToken, DrawerMenuHasNotToken } from '../screens/menu/MenuView';
import { MenuScreens } from '../screens/menu/Menu';

import { AuthContext } from "../contexts/AuthContext";
import getToken from '../api/getToken';
import saveToken from '../storage/saveToken';
import checkLogin from '../api/checkLogin';
import saveUser from '../storage/saveUser';
import removeUser from '../storage/removeUser';

const Drawer = createDrawerNavigator();

export default () => {

  const [progress, setProgress] = React.useState(new Animated.Value(0));
  
  const [token, setToken] = React.useState('');
  const [user, setUser] = React.useState({name: '', email: ''});
    
  useEffect(() => {


    getToken()
      .then(tk => {
        setToken(tk)
        checkLogin(tk)
          .then(res => {
            if(res.msg) {
              setUser(res.resultUser)
            }else {
              saveToken('')
              setToken('');
            }
          })
          .catch(err=> {
            saveToken('')
            setToken('');
          })
        })
      .catch(err=> {
        saveToken('')
        setToken('');
        })
    return () => {
      console.log("component-Will-Un-mount");
    };
  }, []);


  const authContext = React.useMemo(() => {
    return {
      signIn: async () => {
        console.log('signIn MAIN')
        getToken()
          .then(tk => {
            setToken(tk)
            checkLogin(tk)
              .then(res => {
                saveUser(res.resultUser)
                setUser(res.resultUser)
              })
              .catch(err=> {
                saveToken('');
                setToken('');
              })
            })
          .catch(err => {
            saveToken('');
            setToken('');
            })
      },
      chanInfo: async () =>{
        getToken()
          .then(tk => {
            checkLogin(tk)
              .then(res => {
                if(res.msg) {
                  saveUser(res.resultUser)
                  setUser(res.resultUser)
                }else {
                  saveToken('')
                  setToken('');
                }
              })
            .catch(err=> {
              saveToken('')
              setToken('');
            })
          })
          .catch(err => {
            saveToken('')
            setToken('');
          })
      },
      signOut: () => {
        saveToken('');
        setToken('');
        if (removeUser()) console.log('delete success')
      }
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
