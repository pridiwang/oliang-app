import React from 'react';
import { ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';

export default class CategoryScreen extends React.Component{
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
    console.log('render');
    if(this.state.isLoading==true){
      return (
        <View>
      <ActivityIndicator />      
      </View>
      )
    }else{
      
      return (
          <View style={styles.container} contentContainerStyle={styles.container} >
        <Image style={{flex:1,height:720}} resizeMode='cover' source={{uri:'http://oliang.itban.com/img/background1.png'}} >
        <ScrollView 
        contentContainerStyle={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center',paddingTop:50,}}
         >
        
          <Text style={{flex:1,backgroundColor:'rgba(0,0,0,0)',color:'#a00',fontSize:48}}>โอเลี้ยง กสทช</Text>
          <ListView style={{flex:1,width:320,padding:5}} dataSource={this.state.dataSource}
            renderRow={ (dr) =>
            <TouchableHighlight  onPress={()=>{this.props.navigation.navigate('Posts',{data:dr})}}>
            <View style={{borderBottomWidth:1,borderColor:'#aaa',padding:5}}><Text style={styles.catname}>{dr.name}</Text></View>
            </TouchableHighlight>
            }
          />
          
          </ScrollView>
          <Button title="Logout" onPress={()=>{this.UserLogout()}} />
          </Image>
          </View>
      )
    }
  }
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
});