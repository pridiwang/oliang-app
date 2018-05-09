import React from 'react';
import { ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import {StackNavigator,TabNavigator} from 'react-navigation';
import {MainNavigator} from '../navigation/MainNavigator';
import {themeLight,themeDark} from './Styles';
export default class AppUniverse extends React.Component{
    

    static navigationOptions = {
        drawerLabel: 'แอพของ กสทช.',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../img/nbtc-icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
        header:null,
      };

    constructor(props){
        super(props);
    }
    componentDidMount(){
        url='https://oliang.itban.com/appuni';
        
        AsyncStorage.getItem('at',(err,at)=>{
            return fetch(url,{method:'GET',headers:{'Authorization':at}})
            .then((response)=>response.json())
            .then((responseJson)=>{
                console.log('fetch ok');
                const dr= responseJson.data[0];
                console.log('dr');
                console.log(dr);
    //            navigate('category',dr);
                this.props.navigation.navigate('AllPosts',{data:dr});
            });

        });

    }
    render(){
        return(
            
        <View style={styles.container} >
        <Text>App Universe</Text>
        </View>
        
        )

    }
}

const styles=themeLight;