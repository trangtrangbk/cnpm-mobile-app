import React from 'react';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Block, Text } from 'expo-ui-kit';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { AuthContext } from "../../contexts/AuthContext";
import Route from '../../constants/Route';

import icLogin from '../../assets/icons/ic_login.png';
import icLogout from '../../assets/icons/ic_logout.png';
import icChangInfo from '../../assets/icons/ic_avatar.png';
import icChangePassword from '../../assets/icons/ic_key.png';
import icHistory from '../../assets/icons/ic_file.png';
import icHome from '../../assets/icons/ic_home-mn.png'
import icAvatar from '../../assets/icons/avatar.png'

export const DrawerMenuHasToken = (props) => {
  console.log(props.user.avatar, 'user')

  const { signOut } = React.useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
      <Block>
        <Block flex={0.4} margin={20} bottom style={{alignItems: 'center', marginLeft: -20}}>
          <TouchableOpacity onPress = {() => {props.navigation.navigate(Route.INFORMATION, { user: props.user })}}>
            <Image source={!props.user.avatar?icAvatar:{uri: props.user.avatar}} style={styles.avatar}  /> 
          </TouchableOpacity>
          <Text white title>{props.user.name.toUpperCase()}</Text>
          <Text white size={9}>{props.user.email}</Text>
        </Block>
        <Block>
        <DrawerItem
            label="Trang Chủ"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate(Route.HOMEPAGE)}
            icon={() => <Image source={icHome } style={styles.icon} />}
          />  
          <DrawerItem
            label="Bài viết đã đăng"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate(Route.HISTORY)}
            icon={() => <Image source={icHistory } style={styles.icon} />}
          />

          <DrawerItem
            label="Thông tin cá nhân"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => {props.navigation.navigate(Route.INFORMATION, { user: props.user })}}
            icon={() => <Image source={icChangInfo } style={styles.icon} />}
          />
          <DrawerItem
            label="Thay đổi mật khẩu"
            labelStyle={{ color: 'white', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate(Route.CHANGE_PASSWORD)}
            icon={() => <Image source={icChangePassword } style={styles.icon}/>}
          />
          <DrawerItem
          label="Đăng xuất"
          labelStyle={{ color: 'white' , marginLeft: -16}}
          style={{ alignItems: 'flex-start', marginVertical: 0 }}
          icon={() =><Image source={icLogout } style={styles.icon} />}
          onPress={() => {
            signOut()
            props.navigation.navigate(Route.HOMEPAGE)
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
        <Block flex={0.4} margin={20} bottom style={{alignItems: 'center', marginLeft: -20}}>
          <Image source={icAvatar} style={styles.avatar} /> 
        </Block>

        <DrawerItem
          label="Đăng nhập"
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
    height: 60,
    width:60,
    borderRadius: 100,
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


