import React from 'react';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Block, Text } from 'expo-ui-kit';
import { Image, StyleSheet } from 'react-native';

import { AuthContext } from "../../contexts/AuthContext";
import Route from '../../constants/Route';

import icLogin from '../../assets/icons/ic_login.png';
import icLogout from '../../assets/icons/ic_logout.png';
import icChangInfo from '../../assets/icons/ic_avatar.png';
import icChangePassword from '../../assets/icons/ic_key.png';
import icHistory from '../../assets/icons/ic_file.png';
import icHome from '../../assets/icons/ic_home-mn.png'


export const DrawerMenuHasToken = (props) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
      <Block>
        <Block flex={0.4} margin={20} bottom>
          <Image
            source={{
              uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
              height: 60,
              width: 60,
              scale: 0.5,
            }}
            resizeMode="center"
            style={styles.avatar}
          />
          <Text white title>
            {/* { props.user.username} */}
          </Text>
          <Text white size={9}>
            {/* { props.user.email} */}
          </Text>
        </Block>
        <Block>
        <DrawerItem
            label="Home"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate(Route.DASHBOARD)}
            icon={() => <Image source={icHome } style={styles.icon} />}
          />  
          <DrawerItem
            label="History"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate(Route.HISTORY)}
            icon={() => <Image source={icHistory } style={styles.icon} />}
          />

          <DrawerItem
            label="Information"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => {props.navigation.navigate(Route.INFO, { user: props.user })}}
            icon={() => <Image source={icChangInfo } style={styles.icon} />}
          />
          <DrawerItem
            label="Change Password"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate(Route.CHANGE_PASSWORD)}
            icon={() => <Image source={icChangePassword } style={styles.icon}/>}
          />
          <DrawerItem
          label="Logout"
          labelStyle={{ color: 'white' , marginLeft: -16}}
          style={{ alignItems: 'flex-start', marginVertical: 0 }}
          icon={() =><Image source={icLogout } style={styles.icon} />}
          onPress={() => {
            signOut()
            props.navigation.navigate(Route.DASHBOARD)
          } }
        />
        </Block>
      </Block>
    </DrawerContentScrollView>
  );

}
export const DrawerMenuHasNotToken = props => {
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
      <Block>
        <Block flex={0.4} margin={20} bottom>
          <Image
            source={{
              uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
              height: 60,
              width: 60,
              scale: 0.5,
            }}
            resizeMode="center"
            style={styles.avatar}
          />
        </Block>

        <DrawerItem
          label="Login"
          labelStyle={{ color: 'white' }}
          icon={() => <Image source={ icLogin } style={styles.icon} />}
          onPress={() => props.navigation.navigate(Route.LOGIN)}
        />
      </Block>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    // overflow: 'scroll',
    // borderWidth: 1,
  },
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
  icon: {
    width: 20,
    height: 20, 
    marginLeft: 15
  }
});


