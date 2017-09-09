import React from 'react';
import {ScrollView, StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import Expo from 'expo';
import {Facebook} from 'expo';
import {StackNavigator,DrawerNavigator,TabNavigator} from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//226125624536427
export default class LoginScreen extends React.Component {
  static navigationOptions = {title:'NBTC Oliang'};
  constructor(props){
    super(props);
  }
  EmailLogin(){
    const { navigate } = this.props.navigation;
    console.log('call email login');
    let email=this.state.email;
    
    let password=this.state.password;
    console.log('state email:'+email+ ' password:'+password);
    url='http://oliang.itban.com/emaillogin/';
    fetch(url,{method:'POST',
    headers:{'Authorization': 'EM '+email+'|'+password},
    body:JSON.stringify({email:email,password:password}),
    })
    .then((response)=>response.json())
    .then((json)=>{
      token=json.access_token;
      console.log(json)
      try{
          console.log('token:'+token);
          AsyncStorage.setItem('at',token,()=>{
            AsyncStorage.getItem('at',(err,at1)=>{
              console.log('token '+token+ ' stored at:'+at1);
              navigate('Category');

            });
          });
          
      }catch(err){
          console.log('err:'+err);
      }
    })
    .catch((error)=>{
      console.error(error)
    });
  }
  logIn() {
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
      
      // Get the user's name using Facebook's Graph API //,{parameters:{fields:{public_profile,email},access_token:token}}
      url='https://graph.facebook.com/me?access_token='+token //+'&fields=id,email';
      console.log('url:'+url);
      fetch(url)
      .then((response)=>response.json())
      .then((json)=>{
        fbid=json.id;
        fbemail=json.email;
        console.log('fbid '+fbid+' fbemail:'+fbemail);
        
          AsyncStorage.setItem('@FB:id',fbid,()=>{
            AsyncStorage.getItem('@FB:id',(err,fbid1)=>{
              console.log('fbid1:'+fbid1);
            });
          });
          
          //navigate('Category'); 
        
      })
      
         
    }  
    if (type=='cancel'){
        //Alert.alert('cancled');
    }
  }

  chkToken(){
    const { navigate } = this.props.navigation;
    console.log('checking token');
    AsyncStorage.getItem('at',(err,at)=>{
      console.log('at:'+at);
      if(at!==null){
        navigate('Category');
        return true;
      }else{
        this.chkFB();
        return false;
      }
    });
    
  }
  chkFB(){
    const { navigate } = this.props.navigation;
    console.log('checking fB');
    AsyncStorage.getItem('@FB:id',(err,fbid)=>{
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
            AsyncStorage.setItem('at',responseJson.access_token);
            navigate('Category');
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
        //this.fbLogin(); 
        return false;
      }
    });
  }
  async componentDidMount(){
    console.log('component did mount');
    this.chkToken(); 
  }
  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <KeyboardAwareScrollView contentContainerStyle={{flex:1,alignItems:'center'}} >
      <Image source={require('../img/nbtc8.png')} resizeMode='contain' style={styles.container} contentContainerStyle={styles.container} >
      
        
        <Text style={{fontSize:36,backgroundColor:'#440000',padding:5,width:260,color:'#ffffff',textAlign:'center'}}>โอเลี้ยง กสทช </Text>
        <View style={{backgroundColor:'rgba(255,255,255,0.8)',padding:10}} >
        <TextInput editable={true} keyboardType='email-address' placeholder='NBTC Email' placeholderTextColor='#888'
        style={{height:40,width:240,color:'#444'}} 
        onChangeText={(email)=>this.setState({email:email})}
         />
<TextInput editable={true} keyboardType='default' placeholder='Password' secureTextEntry={true} placeholderTextColor='#888'
        style={{height:40,width:240,color:'#444'}}
        onChangeText={(password)=>{
            console.log('fill in password:'+password)
            this.setState({password:password})
            }

        }/>
         <Button onPress={()=>this.EmailLogin()} style={{background:'#ddd'}} title='NBTC Login'/>
</View>
        <TouchableHighlight
            onPress={()=>this.logIn()}        >
          <View>
        <Text style={styles.fbbutton}>เข้าระบบด้วย FACEBOOK </Text>
          </View>
        </TouchableHighlight>
        </Image>
        </KeyboardAwareScrollView>
        
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
    borderRadius:5,
    margin:5,
    width:260,alignItems:'center',justifyContent:'center',
    textAlign:'center',
    
  }
});

