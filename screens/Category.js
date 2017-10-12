import React from 'react';
import { ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import{ DrawerNavigator } from 'react-navigation';
import {MainNavigator} from '../navigation/MainNavigator';
import Expo from 'expo';
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
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    
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

return (
  <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
    <Image 
        style={{flex:1,flexDirection:'column',paddingTop:15,alignItems:'center',justifyContent:'space-around',height:2048}} 
        resizeMode="cover" 
        source={require ('../img/background5.png')} >
        <View style={{flex:0.1,height:40,paddingTop:5,flexDirection:'row',justifyContent:'space-between'} }> 
        <TouchableHighlight onPress={()=>{this.props.navigation.navigate('DrawerOpen')}} >      
              <Image source={require('../img/menu-icon.png')} style={styles.icon} />
            </TouchableHighlight>

            <TextInput placeholder="search" 
            style={{flex:8,height:30,width:200,color:'#ffffff',fontSize:20,backgroundColor:'rgba(255,255,255,0.3)',padding:3,borderRadius:5}}
            onChangeText={(text) => this.setState({text})}
            />
            <TouchableHighlight onPress={()=>{this.searchPost()}} >
            <Image source={require ("../img/search-icon.png")} style={styles.icon} />
            </TouchableHighlight>
            </View>
        <Image source={require ('../img/oliang-text.png')} style={{flex:0.1,resizeMode:'contain'}} />
        <Image source={require ('../img/nbtc_telco.png')} style={{flex:0.1,resizeMode:'contain'}} />
        <ListView style={{flex:6,marginTop:20,width:260,bottom:0}} dataSource={this.state.dataSource}
            renderRow={ (dr) =>
            <TouchableHighlight  onPress={()=>{this.props.navigation.navigate('Posts',{data:dr})}}>
            <View style={{borderBottomWidth:1,borderColor:'#aaa',padding:5}}><Text style={styles.catname}>{dr.name}</Text></View>
            </TouchableHighlight>
            }
          />
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
  icon:{resizeMode:'contain',height:30,width:30,margin:3}
});

export default DrawNavigator = DrawerNavigator({
  Back:{    screen: CategoryScreen,  },
  Profile:{    screen: Profile,  },
  About:{    screen: AboutScreen,  },
  Logout:{    screen: Logout, }
},{
  headerMode:'null',
});
