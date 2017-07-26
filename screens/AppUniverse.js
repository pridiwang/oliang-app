import React from 'react';
import { ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
export default class AppUniverse extends React.Component{
    static navigationOptions={title:'จักรวาลแอพ'}
    constructor(props){
        super(props);
    }
    render(){
        return(
            <ScrollView>
        <View style={styles.container} >
        <Text>App Universe</Text>
        </View>
        </ScrollView>
        )

    }
}
const styles =StyleSheet.create({
    container:{flex:1,justifyContent:'center',alignItems:'stretch'},

});