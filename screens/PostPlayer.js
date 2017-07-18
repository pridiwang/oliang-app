import React from 'react';
import { Animated,Dimensions,Image,ScrollView,ActivityIndicator,StyleSheet, ListView,Text,TextInput, View,Button,
    TouchableHighlight,Alert,AsyncStorage,WebView } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import Expo,{Video} from 'expo';

export default class PlayerScreen extends React.Component{
    static navigationOptons={title:'โอเลี้ยง',header:{visible:true}};
    render(){

        const {params} = this.props.navigation.state;
        
        if(params.data.mp4!==""){
            let clip_url=params.data.mp4.replace('.com/media/','.com:8081/vod/oliang/')+'/playlist.m3u8';
            console.log('vdo content');
            
            return (
                <View style={{flex:1,backgroundColor:'#000',alignContent:'center',alignItems:'center',justifyContent:'center'}} >
                
                <Expo.Video source={{uri:clip_url}} style={styles.img}
                    resizeMode="contain" 
                    shouldPlay={true}
                    hls={true}                    
                    />
                </View>
            )
        }else{


          return(
              <ScrollView style={styles.container}>
                  <View style={{flex:1,height:150,position:'relative'}}>
                  <Image resizeMode="cover" source={{uri:params.data.img}} style={styles.img}/>
                  </View>
              <Text style={styles.title}>{params.data.title}</Text>
              <HTMLView style={styles.content} value={params.data.content} />
              </ScrollView>
          )
        }
    }
}


const styles=StyleSheet.create({
    container:{flex:1,position:'relative'},
    img:{position:'absolute',top:0,left:0,bottom:0,right:0},
    vdo:{width:320,height:240},
    title:{fontSize:20,padding:5},
    content:{padding:5}
});
