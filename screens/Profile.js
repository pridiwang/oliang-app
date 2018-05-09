import React from 'react';
import { StatusBar,Platform,ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import RadioButton from 'radio-button-react-native';
import MainNavigator from '../navigation/MainNavigator';

import {themeDark,themeLight,htmlDark,htmlLight,txtLight,txtDark} from './Styles';
import MyWebView from 'react-native-webview-autoheight';
import Ionicons from 'react-native-vector-icons/Ionicons';
const styles=themeLight;
const htmlStyles=htmlLight;
const txtStyles=txtLight;
export default class Profile extends React.Component{
  static navigationOptions=({navigation})=>({
    drawerLabel: 'ตั้งค่า',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../img/user-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
    title:'Settings',
    headerStyle:{marginTop: Platform.OS ==='ios' ? 0 : -30 },
    headerLeft: <TouchableHighlight onPress={()=>navigation.navigate('Category',)}><Ionicons name="md-arrow-back" style={styles.topbtn} size={32} color="green" /></TouchableHighlight>,
    headerRight:<TouchableHighlight onPress={()=>navigation.navigate('Category',)}><Ionicons name="md-home" style={styles.topbtn} size={32} color="green" /></TouchableHighlight>,
  });
  constructor (props){
    super(props)

    this.state = {
      isLoading:true,
      theme:'Light',
      user:{
        username:'User',
        type:'admin',
        img:'http://oliang.itban.com/img/user-icon.png',
      },
      canPost:false,
    };
    console.log('loading '+this.state.isLoading);
    console.log('theme '+this.state.theme);
    AsyncStorage.getItem('theme',(err,result)=>{
      
      if(result){
        console.log('usrename');
        console.log(this.state.user);
        //console.loglog('got theme at construct :'+result);
        this.state.theme=result;
        //console.loglog('get state theme:'+this.state.theme);
        //this.setState({isLoading:false});
   
      }
    });
    
}

  handleOnPress(value){
    this.setState({theme:value},()=>{
      AsyncStorage.setItem('theme',value,()=>{
        AsyncStorage.getItem('theme',(err,result)=>{
          //console.loglog('set to:'+result);
        });
      });
    });
    
  }
  async componentDidMount(){
    console.log('profile did mount');
    //console.log(this.state.user.user_level);
    await AsyncStorage.getItem('userjson',(err,result1)=>{
      if(result1){
       console.log('yes result1 '); 
        console.log('usrjson');
        console.log(result1);
        var userinfo=JSON.parse(result1);
        console.log(userinfo);
        this.setState({user:userinfo});
        console.log(this.state.user.username);
        if((this.state.user.type=='admin')||(this.state.user.type=='author')){
          this.setState({'canPost':true});
        }
        this.setState({isLoading:false});
        this.render();
      }else{
        console.log(' no result1 ');
      }
    });
  }
  render(){
    
        console.log('profile rendering  ');
        console.log(this.state);
        if(this.state.isLoading){
          return (<View></View>);
        }
        //console.loglog('rendering state.theme:'+this.state.theme);
        if(this.state.isLoading===false){
        return(
            <View style={styles1.container} >
                {this.state.canPost &&
                <Button title="เขียนบทความใหม่" onPress={()=>this.props.navigation.navigate('PostNew')} />
                }
          <Image source={{uri:this.state.user.img}} style={{width:100,height:100}} />
          <View style={{flexDirection:'row',flex:1,}}>
            <Text style={styles1.txtLabel}>ชื่อผู้ใช้:</Text>
            <Text style={styles1.txtInfo}>{this.state.user.username}</Text>
          </View>
          <View style={{flexDirection:'row',flex:2,}}>
            <Text style={styles1.txtLabel}>ตำแหน่ง:</Text>
            <Text style={styles1.txtInfo}>{this.state.user.title}</Text>
          </View>
          <View style={{flexDirection:'row',flex:2,}}>
            <Text style={styles1.txtLabel}>หน่วยงาน:</Text>
            <Text style={styles1.txtInfo}>{this.state.user.department}</Text>
          </View>
          <View style={{flexDirection:'row',flex:3}}>
            <Text style={styles1.txtLabel}>รายละเอียด:</Text>
            <Text style={styles1.txtInfo}>{this.state.user.description}</Text>
          </View>
          <View style={{flexDirection:'row',flex:1}}>
          
          <Text style={styles1.txtLabel} >Theme: </Text>
          <View style={{flex:2,flexDirection:'row'}} >
          <RadioButton style={{flex:1}} currentValue={this.state.theme} value={'Light'} onPress={this.handleOnPress.bind(this)}>
                <Text> Light  </Text>
                 </RadioButton>
                <Text> / </Text>
                 <RadioButton currentValue={this.state.theme} value={'Dark'} onPress={this.handleOnPress.bind(this)}>
                 <Text> Dark </Text>
                 </RadioButton>
                 </View>
          
</View>
<Button title="Save" onPress={()=>this.props.navigation.navigate('Category')} />

                </View>
        )
        }else{
          return (<View></View>)
        }

  }
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
     alignItems: 'center',
    justifyContent: 'center',
    padding:30,    
    
  },
  txtLabel:{flex:1,fontSize:16},
  txtInfo:{flex:2,fontSize:16},
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  icon:{
    width:20,height:20
  },
  txtInput:{height:30,margin:5,backgroundColor:'#eeeeee',padding:5,}

});
