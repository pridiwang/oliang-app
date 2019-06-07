import React from 'react';
import { ScrollView,ActivityIndicator, FlatList,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';

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
        this.timeoutHandle = setTimeout(()=>{
        AsyncStorage.getItem('at',(err,at)=>{
            return fetch(url,{method:'GET',headers:{'Authorization':at}})
            .then((response)=>response.json())
            .then((responseJson)=>{
                const dr= responseJson.data[0];
                this.props.navigation.navigate('AllPosts',{data:dr});
            });

        });
      }, 500); 
    }
    componentWillUnmount(){
      clearTimeout(this.timeoutHandle); 
 }
    render(){
      
      return (<View style={styles.conatiner} style={{flexDirection:'column',paddingTop:30,backgrounColor:'#fff'}}>
        <Image source={require('../img/appuni.png')} style={{width:320,height:420}} />
   <Button title="Back" onPress={()=>this.props.navigation.navigate('Back')} />

      </View>
        );

    }
}

const styles=themeLight;