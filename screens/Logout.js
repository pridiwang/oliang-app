import React from 'react';
import { ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';

export default class Logout extends React.Component{
static navigationOptions = {
    drawerLabel: 'Logout',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../img/exit-icon.png')}
        style={{width:30,height:30}}
      />
    ),
    header:null,
  };


 UserLogout(){
    const { navigate } = this.props.navigation;
    console.log('loging out');
    AsyncStorage.clear(()=>{
      console.log('async storage cleared ');
      navigate('Login');
    });

  }

}
