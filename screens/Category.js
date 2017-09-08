import React from 'react';
import { ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import{ DrawerNavigator } from 'react-navigation';
import {MainNavigator} from '../navigation/MainNavigator';

import Profile from './Profile';
import AboutScreen from './About';
import Logout from './Logout';

export class CategoryScreen extends React.Component{
  static navigationOptions={
      header:null,
  }
  constructor(props){
    super(props);
    console.log('constructor ');
    this.state={isLoading:true};
    
  }
  componentDidMount() { 
    url='http://oliang.itban.com/catlist';
    console.log('url:'+url);
    return fetch(url)
    .then((response)=>response.json())
    .then((responseJson)=>{
      console.log('fetch ok');
      let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>1 !== r2});
      this.setState({ isLoading: false, dataSource: ds.cloneWithRows(responseJson.data),},
        function(err){
            console.log('err:'+err);
        });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render(){
    AsyncStorage.getItem('theme',(err,result)=>{
      console.log('set to:'+result);
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
      
return (
      
          <View style={styles.container} contentContainerStyle={styles.container} >
            
            
        
        <Image style={{flex:1,height:720,padding:5}} resizeMode='cover' source={{uri:'http://oliang.itban.com/img/background1.png'}} >
        
        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('DrawerOpen')}} >      
              <Image source={require('../img/menu-icon.png')}            style={{width:30,height:30,marginTop:30}}             />
            </TouchableHighlight>

        <ScrollView 
        contentContainerStyle={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',paddingTop:30,}}
         >
         <Image source={require ('../img/oliang-text.png')} style={{width:280,flex:0.25,marginBottom:60,paddingBottom:50}} />
          
          
          <ListView style={{flex:1,width:320,padding:5,paddingTop:0,bottom:0}} dataSource={this.state.dataSource}
            renderRow={ (dr) =>
            <TouchableHighlight  onPress={()=>{this.props.navigation.navigate('Posts',{data:dr})}}>
            <View style={{borderBottomWidth:1,borderColor:'#aaa',padding:5}}><Text style={styles.catname}>{dr.name}</Text></View>
            </TouchableHighlight>
            }
          />
          <TextInput placeholder="search" style={{}}/>
          </ScrollView>
          
            
          
          </Image>
          </View>
       
      )
      
    }
  }
  //<Text style={{flex:1,backgroundColor:'rgba(0,0,0,0)',color:'#a00',fontSize:48}}>โอเลี้ยง กสทช</Text>
  UserLogout(){
    const { navigate } = this.props.navigation;
    console.log('loging out');
    AsyncStorage.clear(()=>{
      console.log('async storage cleared ');
      navigate('Login');
    });

  }
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'stretch'},
  catname:{fontSize:20,color:'#fff'},
  btn:{margin:5,width:100,backgroundColor:'rgba(0,0,0,0)'},
});

export default DrawNavigator = DrawerNavigator({
  Back:{    screen: CategoryScreen,  },
  Profile:{    screen: Profile,  },
  About:{    screen: AboutScreen,  },
  Logout:{    screen: Logout, }
},{
  headerMode:'null',
});
