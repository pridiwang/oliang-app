import React from 'react';
import { StatusBar,Platform,ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import RadioButton from 'radio-button-react-native';
import MainNavigator from '../navigation/MainNavigator';

export default class Profile extends React.Component{
  constructor (props){
    super(props)
    
    this.state = {theme: 'Light'}
    
}
 static navigationOptions = {
    drawerLabel: 'Profile',
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
      console.log('set theme: '+value);
      console.log('state.theme:'+this.state.theme);
      AsyncStorage.setItem('theme',value);
    });
    
}
    render(){
        console.log('rederging state.theme:'+this.state.theme);
        return(
            <View style={styles.container} >
                <Text>Profile</Text>
                <Button title="Back" onPress={()=>this.props.navigation.navigate('Category')} />
          <Image source={require('../img/user-icon.png')} style={{width:100,height:100}} />
          <TextInput style={styles.txtInput} placeholder="Email" />
          <TextInput style={styles.txtInput} placeholder="Password" />
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
