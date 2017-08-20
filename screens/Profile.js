import React from 'react';
import { StatusBar,Platform,ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';

export default class Profile extends React.Component{
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

    render(){
        return(
            <View style={styles.container} >
                <Text>Profile</Text>
                <Button title="Back" 
          onPress={()=>this.props.navigation.navigate('Category')} />
          <Image source={require('../img/user-icon.png')} />
          <TextInput placeholder="Email" />
          <TextInput placeholder="Password" />
          <TextInput placeholder="Password" />

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
    
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  icon:{
    width:20,height:20
  }
});
