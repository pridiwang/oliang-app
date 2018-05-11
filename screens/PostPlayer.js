import React from 'react';
import PropTypes from 'prop-types';
import { Animated,Dimensions,Image,ScrollView,ActivityIndicator,StyleSheet, ListView,Text,TextInput, View,Button,
    TouchableHighlight,Alert,AsyncStorage,WebView,Platform,Linking } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Expo,{Video} from 'expo';

export default class PlayerScreen extends React.Component{
    
    static navigationOptions=({navigation})=>({
        title:navigation.state.params.data.name,
        headerStyle:{marginTop: Platform.OS ==='ios' ? 0 : -30 },
        style:{height:30},

    });
    constructor(props) {
        //console.log('PostPlayer construct');
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL);
        super(props);       
    }
    render(){

        const {params} = this.props.navigation.state;
        
        if(params.data.mp4!==""){
            let clip_url=params.data.mp4.replace('.com/media/','.com:8081/vod/oliang/')+'/playlist.m3u8';
           //console.log('vdo content');
            if(Platform.OS=='android'){
                clip_url=params.data.mp4;
            }
            if(params.data.mp4.indexOf('youtube')!==-1){
                clip_url=params.data.mp4;
                Linking.openURL(clip_url);
            }
            return (
                <View style={styles.container} >
              <Expo.Video source={{uri:clip_url}} style={styles.vdo} 
                    resizeMode='stretch' useNativeControls={true}  shouldPlay={true} hls={true}
                    />  
                </View>
            )
        }else{
            this.props.navigation.navigate('')
          return(<View></View>)
        }
    }
}
/*
<Video source={{uri:clip_url}} style={styles.vdo} />
              
*/

const styles=StyleSheet.create({
    container:{flex:1,backgroundColor:'#333',alignContent:'center',alignItems:'center',justifyContent:'center'},
    vdo:{width:320,height:180},
});
const htmlStyles=StyleSheet.create({
    body:{backgroundColor:'#ffaaaa'},
    h2:{fontSize:18,margin:0},
    h3:{fontSize:18,margin:0,},
    p:{margin:5,color:'#333333'}
});
