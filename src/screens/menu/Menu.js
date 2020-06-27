import React  from 'react';
import { StyleSheet , Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

import { Button } from 'expo-ui-kit';

import Route from '../../constants/Route';
import { Home } from '../home/Home'
import { InfoScreen }  from './information/Information';

import { ChangePassword } from '../menu/changePassword/ChangePassword';
import { LoginScreen }from '../menu/auth/login/LoginScreen';
import { LogupScreen }from '../menu/auth/logup/LogupScreen';
import { History } from '../menu/history/History';


import icMenu from '../../assets/icons/bars.png';
import icLeft from '../../assets/icons/ic_left.png';

const Stack = createStackNavigator()

export const MenuScreens = ({ navigation, style }) => {

    return (
      <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitle: null,
            headerLeft: () => (
              <Button transparent onPress={() => navigation.openDrawer()}>
                <Image source ={icMenu} style={{width: 20, height: 20, marginLeft: 15}}/>
              </Button>
            ),
          }}>
          <Stack.Screen name = { Route.HOME }

          options ={{
            headerTransparent: true,
            headerLeft:  null,
            title: null,
          }}>{props => <Home {...props} />}</Stack.Screen>

          <Stack.Screen name = { Route.INFORMATION }>{props => <InfoScreen {...props} />}</Stack.Screen>
          <Stack.Screen name = { Route.CHANGE_PASSWORD }>{props => <ChangePassword {...props} />}</Stack.Screen>
          <Stack.Screen name = { Route.HISTORY }
          options ={{
            headerTransparent: true,
            headerLeft:  null,
            title: null,
          }}
          >{props => <History {...props} />}</Stack.Screen>
          
          <Stack.Screen 
          name = {Route.LOGIN}
          options ={{
            headerTransparent: true,
              headerLeft: () => (
                <Button transparent onPress={() => navigation.navigate(Route.HOMEPAGE)}>
                  <Image source = { icLeft } style={{width: 20, height: 20, marginLeft: 15}}/>
                </Button>
              ),
              title: null,
          }}>{props => <LoginScreen {...props} />}</Stack.Screen>
          <Stack.Screen 
          name = { Route.LOGUP }
          options ={{
            headerTransparent: true,
              headerLeft: () => (
                <Button transparent onPress={() => navigation.navigate(Route.LOGIN)}>
                  <Image source = { icLeft } style={{width: 20, height: 20, marginLeft: 15}}/>
                </Button>
              ),
              title: null,
          }}>{props => <LogupScreen {...props} />}</Stack.Screen>
        </Stack.Navigator>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    stack: {
      flex: 1,
      shadowColor: '#FFF',
      shadowOffset: {
        width: 0,
        height: 8,
      },
    },
  });