import React from 'react';
import {ScrollView, StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import Expo from 'expo';
import {Facebook} from 'expo';
import {StackNavigator,DrawerNavigator,TabNavigator} from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//226125624536427
export default class LoginScreen extends React.Component {
  static navigationOptions = {title:'เข้าระบบ'};
  constructor(props){
    super(props);
  }
  EmailLogin(){
    const { navigate } = this.props.navigation;
    console.log('call email login');
    let email=this.state.email;
    
    let password=this.state.password;
    console.log('state email:'+email+ ' password:'+password);
    url='https://oliang.itban.com/emaillogin/';
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
              navigate('Category'); 
            });
          });
          
          navigate('Category'); 
        
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
        url='https://oliang.itban.com/fblogin/'+fbid;
        console.log(url);
        return fetch(url)
        .then((response)=>response.json())
        .then((responseJson)=>{
          console.log(responseJson);
          //this.setState('access_token',responseJson.access_token);
          console.log('storing at:'+responseJson.access_token);
          try{
            AsyncStorage.setItem('at',responseJson.access_token);
            //navigate('Category');
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
  //<Text style={{fontSize:36,backgroundColor:'#440000',padding:5,width:260,color:'#ffffff',textAlign:'center'}}>โอเลี้ยง กสทช </Text>
  /*<View style={{backgroundColor:'rgba(0,0,0,0.5)',flex:0.3,alignContent:'center',alignItems:'center',width:320}} > 
   <Image source={require ('../img/oliang-text.png')} style={{flex:0.5,width:320,height:100}} />  
   <Image source={require ('../img/nbtc_telco.png')} style={{flex:0.4,width:240,backgroundColor:"#80000000"}} /> 
   </View>
  */
   render() {
    const { navigate } = this.props.navigation;
    
    return (
      <KeyboardAwareScrollView contentContainerStyle={{flex:100,alignItems:'center'}} >
      <Image source={require('../img/nbtc8.png')} resizeMode='contain' style={{flex:1,alignContent:'center',alignItems:'center'}} >
        <View style={{backgroundColor:'rgba(180,180,180,0.5)',padding:10,margin:30,borderRadius:10}} >        
        <Text style={{fontSize:16,backgroundColor:'#440000',padding:5,width:260,color:'#ffffff',textAlign:'center'}}>โอเลี้ยง กสทช </Text>
        <TextInput editable={true} keyboardType='email-address' placeholder='NBTC Account' placeholderTextColor='#666666'
        style={{height:40,width:240,color:'#000000'}} 
        onChangeText={(email)=>this.setState({email:email})}
         />
<TextInput editable={true} keyboardType='default' placeholder='Password' secureTextEntry={true} placeholderTextColor='#666666'
        style={{height:40,width:240,color:'#000000'}}
        onChangeText={(password)=>{
            console.log('fill in password:'+password)
            this.setState({password:password})
            }

        }/>
         <Button onPress={()=>this.EmailLogin()} style={{backgroundColor:'#0000dd'}} title='NBTC Login'/>

        <TouchableHighlight  onPress={()=>this.logIn()} ><View>
        <Text style={styles.fbbutton}>เข้าระบบด้วย FACEBOOK </Text></View>
        </TouchableHighlight>
        </View>        
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
    borderRadius:10,
    margin:5,
    width:260,alignItems:'center',justifyContent:'center',
    textAlign:'center',
    
  }
});

