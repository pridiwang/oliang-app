import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ScrollView,ActivityIndicator, FlatList,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image, Keyboard,ImageBackground } from 'react-native';
import{ createDrawerNavigator } from 'react-navigation';
//import {MainNavigator} from '../navigation/MainNavigator';
import util from 'react-native-util';
import Expo from 'expo';
import { Notifications,ScreenOrientation } from 'expo';
import * as Permissions from 'expo-permissions';
import Profile from './Profile';
import AboutScreen from './About';
import Logout from './Logout';
import PostNew from './PostNew';
import Appuni from './AppUniverse';
import PostsScreen from './Posts';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBg81u7F8HU33bjUnmb-PgExAV0xzCJ1SQ",
  authDomain: "oliang-2e483.firebaseapp.com",
  projectId:"oliang-2e483",
  databaseURL: "https://oliang-2e483.firebaseio.com/",
  storageBucket: "oliang-2e483.appspot.com",
  messagingSenderId:"797299882219"
};
firebase.initializeApp(firebaseConfig);


const PUSH_ENDPOINT = 'https://oliang.itban.com/users/push-token';
var CAN_POST='0';

async function registerForPushNotificationsAsync(at,user) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  var formData = new FormData();
  formData.append('push_token',token);
  formData.append('firebase_uid','');
  AsyncStorage.setItem('push_token',token);
  return fetch(PUSH_ENDPOINT, {
    method:'POST',
    headers: {'Authorization': at,},
    body: formData,
  })
  .then((response)=>response.json())
  .then((responseJson)=>{
    //console.log(responseJson)
  });
}

export class CategoryScreen extends React.Component{
  static navigationOptions={
    header: null,  
  }
  constructor(props){
    super(props);
    this.state={isLoading:true,notification:{},dataSource:null};
    Keyboard.dismiss();
    //CAN_POST='0';
  }
  _handleNotification = (notification) => {
    this.setState({notification: notification});
    //console.log(JSON.stringify(notification));
    //Alert.alert("บทความใหม่","notification \norigin:"+notification.origin+"\ndata:"+notification.data.body);
  };
  componentWillMount() { 
    AsyncStorage.getItem('can_post',(err,cp)=>{
      CAN_POST=cp;
      //console.log('cp '+cp,' CAN_POST '+CAN_POST);
      
    });

  }
  componentDidMount() { 
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('oliang-noti', {
        name: 'Reminders',
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
    
    AsyncStorage.getItem('at',(err,at)=>{
      registerForPushNotificationsAsync(at);
      AsyncStorage.getItem('push_token',(err,pt)=>{
        
      });


      this._notificationSubscription = Notifications.addListener(this._handleNotification);
      url='https://oliang.itban.com/catlist';
      return fetch(url,{
        method:'get',
        headers:{
            'Authorization':at
        }
      }
    ) 
      .then((response)=>response.json())
      .then((responseJson)=>{
        const data = responseJson.data;

        this.setState({ isLoading: false, dataSource: data},
          function(err){

          });

          AsyncStorage.setItem('userjson',JSON.stringify(responseJson.user));
          AsyncStorage.setItem('can_post',JSON.stringify(responseJson.user.can_post));
      })
      .catch((error) => {

      });
    });
  }

  searchPost(){
    search=this.state.text;
    if(search==undefined){
      return;
    }
    let dr={
      "id":"0",
      "name":search,
    }
   //console.log('searching id'+dr.id+' keyword'+search);
    this.props.navigation.navigate('AllPosts',{data:dr});
  }
  


  
  render(){
    AsyncStorage.getItem('theme',(err,result)=>{
     //console.log('set to:'+result);
    });
    AsyncStorage.getItem('can_post',(err,can_post)=>{
      //console.log('set can post to:'+can_post);
      CAN_POST=can_post;
     });
    if(this.state.isLoading==true){
      return (
        <View>
      <ActivityIndicator />      
      </View>
      )
    }else{


const topage='Posts';
return (
  <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
    <ImageBackground 
        style={{flex:1,flexDirection:'column',paddingTop:15,alignItems:'center',justifyContent:'space-around',height:1024}} 
        resizeMode="cover" 
        source={require ('../img/background5.png')} >
        <View style={{flex:0.1,height:40,paddingTop:5,flexDirection:'row',justifyContent:'space-between'} }> 
        <TouchableHighlight onPress={()=>{this.props.navigation.toggleDrawer();}} >      
              <Image source={require('../img/menu-icon.png')} style={styles.icon} />
            </TouchableHighlight>
         
            <TextInput placeholder="..ค้นหา.." underlineColorAndroid="rgba(0,0,0,0)"
            style={{flex:8,height:30,width:200,color:'#ffffff',fontSize:20,backgroundColor:'rgba(255,255,255,0.3)',padding:3,borderRadius:5}}
            onChangeText={(text) => this.setState({text})}
            onEndEditing={(e)=>{this.searchPost()}}
            />
            <TouchableHighlight onPress={()=>{this.searchPost()}} >
            <Image source={require ("../img/search-icon.png")} style={styles.icon} />
            </TouchableHighlight>
            </View>
        <Image source={require ('../img/oliang-text.png')} style={{flex:0.15,resizeMode:'contain'}} />
        <Image source={require ('../img/nbtc_telco.png')} style={{flex:0.15,resizeMode:'contain'}} />
        <FlatList style={{flex:8,marginTop:20,width:260,bottom:0}} data={this.state.dataSource}
            renderItem={ (dr) =>{    
             //console.log('dr');          
             //console.log(dr);          
            return (<TouchableHighlight  onPress={()=>{this.props.navigation.navigate( dr.id==8 ? 'Posts' : 'AllPosts' ,{data:dr.item})}}>
            <View style={{borderBottomWidth:1,borderColor:'#aaa',padding:5}}><Text style={styles.catname}>{dr.item.name}</Text></View>
            </TouchableHighlight>)
            }
          }
          keyExtractor={(item,index)=>index.toString()}
          />
    </ImageBackground>  

  </View>
  
      )
      
    }
  }
  
  UserLogout(){
    const { navigate } = this.props.navigation;
  
    AsyncStorage.clear(()=>{
  
      navigate('Login');
    });
  } 
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center'},
  catname:{fontSize:20,color:'#fff'},
  btn:{margin:5,width:100,backgroundColor:'rgba(0,0,0,0)'},
  icon:{resizeMode:'contain',height:30,width:30,margin:3}
});
//Post:{    screen: PostNew,  },

const DrawNavigator1 = createDrawerNavigator({
  Back:     {screen: CategoryScreen,  },
  Postnew:  {screen:PostNew,} ,
  Profile:  {screen: Profile,headerMode:'screen',  },
  Appuni:   {screen: Appuni,  },
  About:    {screen: AboutScreen,  },
  Logout:   {screen: Logout,}
},{
  headerMode:'none',
});

const DrawNavigator0 = createDrawerNavigator({
  Back:{    screen: CategoryScreen,  },
  Profile:{    screen: Profile,headerMode:'screen'  },
  About:{    screen: AboutScreen,navigationOptions:{header:true,headerMode:'screen'}  },
  Appuni:{    screen: Appuni,  },
  Logout:{    screen: Logout, }
},{
  headerMode:'none',
});
export default (CAN_POST==='1' ? DrawNavigator1 : DrawNavigator0 )