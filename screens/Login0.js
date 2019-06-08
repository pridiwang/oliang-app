import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import Expo from 'expo';
import * as Facebook from 'expo-facebook';
import {StackNavigator,DrawerNavigator,TabNavigator} from 'react-navigation';

//226125624536427
export default class LoginScreen extends React.Component {
  static navigationOptions = {title:'Login'};
  constructor(props){
    super(props);
  }
  
  async logIn() {
    this.chkFB();
    const { navigate } = this.props.navigation;
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('226125624536427',
    {
        permissions: ['public_profile','email'],
        behavior:'web',
      });
     //console.log('type:'+type);
    if (type === 'success') {
     //console.log(' login success token'+token);
      
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      fbid=(await response.json()).id;
     //console.log('fbid '+fbid);
      try{
        await AsyncStorage.setItem('@FB:id',fbid);
        const fbid1 = await AsyncStorage.getItem('@FB:id');
       //console.log(fbid1);
        navigate('Posts'); 
      }catch (error){
       //console.log('error:'+error);
      }
      
    }
    if (type=='cancel'){
        //Alert.alert('cancled');
    }
  }
  async chkFB(){
    const { navigate } = this.props.navigation;
   //console.log('checking fB');
    const fbid = await AsyncStorage.getItem('@FB:id');
   //console.log(fbid);

    if(fbid !== null){

       //console.log('authorzied ');
       //console.log(fbid);
        navigate('Posts');
        return true;

    }else{
     //console.log('null');
        return false;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
  
    return (
      <View style={styles.container} >
        <Image source={require('../img/nbtc8.png')} style={{width:240,height:240}} />
        <Text style={{fontSize:40,padding:5,width:240,color:'#ffffff'}}>โอเลี้ยง กสทช </Text>
        <TouchableHighlight
            onPress={()=>this.logIn()}        >
          <View>
        <Text style={styles.fbbutton}>Login with Facebook </Text>
          </View>
        </TouchableHighlight>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#440000',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbbutton:{
    backgroundColor:'#3b5998',
    padding:10,
    color:'#ffffff',
    fontSize:20,
  }
});

