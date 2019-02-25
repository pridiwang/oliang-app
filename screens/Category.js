import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image, Keyboard,ImageBackground } from 'react-native';
import{ DrawerNavigator } from 'react-navigation';
import {MainNavigator} from '../navigation/MainNavigator';
import util from 'react-native-util';
import Expo from 'expo';
import { Permissions, Notifications } from 'expo';
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
      header:null,
  }
  constructor(props){
    super(props);
    this.state={isLoading:true,notification:{}};
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    Keyboard.dismiss();
    CAN_POST='0';
  }
  _handleNotification = (notification) => {
    this.setState({notification: notification});
    //console.log(JSON.stringify(notification));
    //Alert.alert("บทความใหม่","notification \norigin:"+notification.origin+"\ndata:"+notification.data.body);
  };
  componentDidMount() { 
    if (Platform.OS === 'android') {
      Expo.Notifications.createChannelAndroidAsync('oliang-noti', {
        name: 'Reminders',
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
    AsyncStorage.getItem('can_post',(err,cp)=>{
      CAN_POST=cp;
      //console.log('cp '+cp);
      
    });
    AsyncStorage.getItem('at',(err,at)=>{
      //console.log(' stored at:'+at+' error '+err);
      //navigate('Category');
      registerForPushNotificationsAsync(at);
      AsyncStorage.getItem('push_token',(err,pt)=>{
        
      });


      this._notificationSubscription = Notifications.addListener(this._handleNotification);
      url='https://oliang.itban.com/catlist';
      //console.log('url:'+url);
     //console.log('category did mount at:'+at);
      
      return fetch(url,{
        method:'get',
        headers:{
            'Authorization':at
        }
      }
    ) 
      .then((response)=>response.json())
      .then((responseJson)=>{
        //console.log('fetch ok');
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>1 !== r2});
        this.setState({ isLoading: false, dataSource: ds.cloneWithRows(responseJson.data),},
          function(err){
              //console.log('err:'+err);
          });
         //console.log('responseJson');
         //console.log(responseJson);
          AsyncStorage.setItem('userjson',JSON.stringify(responseJson.user));
          AsyncStorage.setItem('can_post',JSON.stringify(responseJson.user.can_post));
      })
      .catch((error) => {
       //console.error(error);
      });

      url='https://oliang.itban.com/appuni';
      //console.log('url:'+url);
      //console.log('at:'+at);
      registerForPushNotificationsAsync(at);
      return fetch(url,{method:'GET',headers:{'Authorization':at}})
      .then((response)=>response.json())
      .then((responseJson)=>{
        //console.log('fetch ok');
        let dr=responseJson.data[0];
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
      //console.log('set to:'+result);
      CAN_POST=can_post;
     });
    if(this.state.isLoading==true){
      return (
        <View>
      <ActivityIndicator />      
      </View>
      )
    }else{
//        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('DrawerOpen')}} >      
//<Image source={require('../img/menu-icon.png')}            style={{width:30,height:30}}             />
      // resizeMode='cover' flex:1,flexDirection:'column',contentContainerStyle={styles.container}
      //,justifyContent:'space-between' width:240,flex:0.20,marginBottom:0,paddingBottom:50
//flex:1,width:240,padding:5,paddingTop:0,bottom:0
//<View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}  >
/*
        <View style={{height:40,padding:5,flex:1,flexDirection:'row',justifyContent:'space-between'} }> 
        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('DrawerOpen')}} >      
              <Image source={require('../img/menu-icon.png')} style={{width:30,height:30,marginRight:10}} />
            </TouchableHighlight>

            <TextInput placeholder="search" style={{height:30,width:200,color:'#ffffff',fontSize:20,borderBottomColor:'white',borderBottomWidth:1,alignItems:'center'}}
            onChangeText={(text) => this.setState({text})}
            />
            <TouchableHighlight onPress={()=>{this.searchPost()}} >
            <Image source={require ("../img/search-icon.png")} style={{height:30,width:30,right:0}} />
            </TouchableHighlight>
            </View>
        <ScrollView 
        contentContainerStyle={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',paddingTop:10,}}
         >
         <Image source={require ('../img/oliang-text.png')} style={{flex:0.3,width:240}} />
         <Image source={require ('../img/nbtc_telco.png')} style={{flex:0.2,width:160,margin:5}} />
          <ListView style={{marginTop:20,width:260}} dataSource={this.state.dataSource}
            renderRow={ (dr) =>
            <TouchableHighlight  onPress={()=>{this.props.navigation.navigate('Posts',{data:dr})}}>
            <View style={{borderBottomWidth:1,borderColor:'#aaa',padding:5}}><Text style={styles.catname}>{dr.name}</Text></View>
            </TouchableHighlight>
            }
          />
          
          </ScrollView>
          <ScrollView 
        contentContainerStyle={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',paddingTop:10,}}
         >
         <Image source={require ('../img/oliang-text.png')} style={{flex:0.3,width:240}} />
         <Image source={require ('../img/nbtc_telco.png')} style={{flex:0.2,width:160,margin:5}} />
          <ListView style={{marginTop:20,width:260}} dataSource={this.state.dataSource}
            renderRow={ (dr) =>
            <TouchableHighlight  onPress={()=>{this.props.navigation.navigate('Posts',{data:dr})}}>
            <View style={{borderBottomWidth:1,borderColor:'#aaa',padding:5}}><Text style={styles.catname}>{dr.name}</Text></View>
            </TouchableHighlight>
            }
          />
          
          </ScrollView>          
flex:1,flexDirection:'row',justifyContent:'flex-end'
*/
const topage='Posts';
return (
  <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
    <ImageBackground 
        style={{flex:1,flexDirection:'column',paddingTop:15,alignItems:'center',justifyContent:'space-around',height:1024}} 
        resizeMode="cover" 
        source={require ('../img/background5.png')} >
        <View style={{flex:0.1,height:40,paddingTop:5,flexDirection:'row',justifyContent:'space-between'} }> 
        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('DrawerOpen')}} >      
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
        <ListView style={{flex:8,marginTop:20,width:260,bottom:0}} dataSource={this.state.dataSource}
            renderRow={ (dr) =>              
            <TouchableHighlight  onPress={()=>{this.props.navigation.navigate( dr.id==8 ? 'Posts' : 'AllPosts' ,{data:dr})}}>
            <View style={{borderBottomWidth:1,borderColor:'#aaa',padding:5}}><Text style={styles.catname}>{dr.name}</Text></View>
            </TouchableHighlight>
          }
          />
    </ImageBackground>  

  </View>
  
      )
      
    }
  }
  //<Text style={{flex:1,backgroundColor:'rgba(0,0,0,0)',color:'#a00',fontSize:48}}>โอเลี้ยง กสทช</Text>
  UserLogout(){
    const { navigate } = this.props.navigation;
    //console.log('loging out');
    AsyncStorage.clear(()=>{
      //console.log('async storage cleared ');
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

const DrawNavigator1 = DrawerNavigator({
  Back:{    screen: CategoryScreen,  },
  Postnew:{screen:PostNew} ,
  Profile:{    screen: Profile,headerMode:'screen'  },
  Appuni:{    screen: Appuni,  },
  About:{    screen: AboutScreen,  },
  Logout:{    screen: Logout, }
},{
  headerMode:'none',
});

const DrawNavigator0 = DrawerNavigator({
  Back:{    screen: CategoryScreen,  },
  Profile:{    screen: Profile,headerMode:'screen'  },
  Appuni:{    screen: Appuni,  },
  About:{    screen: AboutScreen,  },
  Logout:{    screen: Logout, }
},{
  headerMode:'none',
});
export default (CAN_POST==='1'? DrawNavigator1 : DrawNavigator0)