import React from 'react';
import { StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import Expo from 'expo';
import {Facebook} from 'expo';
import {StackNavigator,DrawerNavigator,TabNavigator} from 'react-navigation';

//226125624536427
export default class LoginScreen extends React.Component {
    static navigationOptions = {title:'Login'};
  constructor(props){
    super(props);
  }
  
  async logIn() {
    const { navigate } = this.props.navigation;
    console.log('call login');
    
    if(this.chkFB()){
      navigate('Catgegory');
      return;
    }else{
      this.fbLogin();
    }
  }
  async fbLogin(){
    const { navigate } = this.props.navigation;
    console.log(' calling fblogin');
    
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('226125624536427',
    {
        permissions: ['public_profile','email'],
        behavior:'web',
      });
      console.log('type:'+type);
    if (type === 'success') {
      console.log(' login success token:'+token);
      
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      fbid=(await response.json()).id;
      fbemail=(await response.json()).email;
      console.log('fbid '+fbid+' fbemail:'+fbemail);
      try{
        await AsyncStorage.setItem('@FB:id',fbid);
        const fbid1 = await AsyncStorage.getItem('@FB:id');
        console.log(fbid1);
        //navigate('Category'); 
      }catch (error){
        console.log('error:'+error);
      }   
    }  
    if (type=='cancel'){
        //Alert.alert('cancled');
    }
  }
  async chkFB(){
    const { navigate } = this.props.navigation;
    console.log('checking token');
    const at = await AsyncStorage.getItem('@FB:at');
    console.log('at:'+at);
    if(at.length>10){
      navigate('Category');
      return true;
    }
    console.log('checking fB');
    const fbid = await AsyncStorage.getItem('@FB:id');
    console.log('fbid:'+fbid);
    
    

    if(fbid !== null){
      url='http://oliang.itban.com/fblogin/'+fbid;
      console.log(url);
      return fetch(url)
      .then((response)=>response.json())
      .then((responseJson)=>{
        console.log(responseJson);
        //this.setState('access_token',responseJson.access_token);
        console.log('storing at:'+responseJson.access_token);
        try{
          AsyncStorage.setItem('@FB:at',responseJson.access_token);
        }catch(err){
          console.log('err:'+err);
        }
      },function(){

      }); 

        console.log('authorzied ');
        console.log(fbid);
        //navigate('Category');
        return true;
    }else{
      console.log('not authorized yet');
      this.fbLogin();
        return false;
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    this.chkFB();
    return (
      <View style={styles.container} >
        <Image source={require('../img/nbtc8.png')} style={{width:240,height:240}} />
        <Text style={{fontSize:36,padding:5,width:240,color:'#ffffff'}}>โอเลี้ยง กสทช </Text>
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

