import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView,ActivityIndicator, FlatList,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';

export default class Logout extends React.Component{
static navigationOptions = {
    drawerLabel: 'ออกจากระบบ',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../img/exit-icon.png')}
        style={{width:30,height:30}}
      />
    ),
    header:null,
  };
  constructor(props){
    super(props);
    
  }
  componentDidMount() {
    const { navigate } = this.props.navigation;
    AsyncStorage.removeItem('at',()=>{
     //console.log('at cleared ');
      //navigate('Splash');
    });
    AsyncStorage.clear(()=>{
     //console.log('async storage cleared ');
      navigate('Login');
    });
    
  }
  render(){
    return(
      <View>
        <Text>Loggin Out</Text>
        </View>
    )
  }

}
