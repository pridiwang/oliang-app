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
    AsyncStorage.getItem('at',(err,at)=>{
      console.log(' stored at:'+at+' error '+err);
      //navigate('Category');
      url='https://oliang.itban.com/catlist';
      console.log('url:'+url);
      console.log('at:'+at);
      return fetch(url,{method:'GET',headers:{'Authorization':at}})
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
    console.log('searching id'+dr.id+' keyword'+search);
    this.props.navigation.navigate('Posts',{data:dr});
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
      // resizeMode='cover' flex:1,flexDirection:'column',contentContainerStyle={styles.container}
      //,justifyContent:'space-between' width:240,flex:0.20,marginBottom:0,paddingBottom:50
//flex:1,width:240,padding:5,paddingTop:0,bottom:0
return (
      
          <View style={{flex:1,flexDirection:'row'}}  >
            
            
        
        <Image style={{flex:1,paddingTop:15,flexDirection:'column',}} resizeMode="cover" source={require ('../img/background3.png')} >
        <View style={{height:40,padding:5,flexDirection:'row',justifyContent:'space-between'} }> 
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
  container:{flex:1,justifyContent:'center',alignItems:'center'},
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
