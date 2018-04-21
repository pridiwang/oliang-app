import React from 'react';
import { StatusBar,Platform,ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import RadioButton from 'radio-button-react-native';
import MainNavigator from '../navigation/MainNavigator';

export default class Profile extends React.Component{
  state={isLoading:true};
  constructor (props){
    super(props)
    
    this.state = {theme: 'Light'};
    AsyncStorage.getItem('theme',(err,result)=>{
      
      if(result){
        //console.loglog('got theme at construct :'+result);
        this.state.theme=result;
        //console.loglog('get state theme:'+this.state.theme);
        this.setState({isLoading:false});
      }else{

      }
    });
    
}
 static navigationOptions = {
    drawerLabel: 'ตั้งค่า',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../img/user-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
    header:null,
  };
  handleOnPress(value){
    this.setState({theme:value},()=>{
      AsyncStorage.setItem('theme',value,()=>{
        AsyncStorage.getItem('theme',(err,result)=>{
          //console.loglog('set to:'+result);
        });
      });
    });
    
  }
  render(){
        if(this.state.isLoading){
          return (<View></View>);
        }
        //console.loglog('rendering state.theme:'+this.state.theme);
        return(
            <View style={styles.container} >
                <Text>Settings</Text>
                <Button title="Back" onPress={()=>this.props.navigation.navigate('Category')} />
                
                <Button title="เขียนบทความ" onPress={()=>this.props.navigation.navigate('PostNew')} />
          <Image source={require('../img/user-icon.png')} style={{width:100,height:100}} />
          
          <View style={{flexDirection:'row',flex:1}}>
          <Text style={{flex:1 }} >Theme: </Text>
          <RadioButton currentValue={this.state.theme} value={'Light'} onPress={this.handleOnPress.bind(this)}>
                <Text> Light </Text>
                 </RadioButton>
                      
                 <RadioButton currentValue={this.state.theme} value={'Dark'} onPress={this.handleOnPress.bind(this)}>
                 <Text> Dark </Text>
                 </RadioButton>
                 
</View>
<Button title="Save" onPress={()=>this.props.navigation.navigate('Category')} />

                </View>
        )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
     alignItems: 'center',
    justifyContent: 'center',
    padding:30,    
    
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  icon:{
    width:20,height:20
  },
  txtInput:{height:30,margin:5,backgroundColor:'#eeeeee',padding:5,}

});
