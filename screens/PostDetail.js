import React from 'react';
import { Animated,Dimensions,Image,ScrollView,ActivityIndicator,StyleSheet, ListView,Text,TextInput, View,Button,
    TouchableHighlight,Alert,AsyncStorage,WebView } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import Expo,{Video} from 'expo';

export default class DetailScreen extends React.Component{

    static navigationOptions=({navigation})=>({
        title:navigation.state.params.data.name,
    });
    async MarkRead(){
        const {params} = this.props.navigation.state;
        const at = await AsyncStorage.getItem('@FB:at');
        
        console.log('marking read ');
        const id=params.data.id;
        console.log('id:'+id+' at:'+at);
        url='http://oliang.itban.com/readpost/'+id;
        console.log('url:'+url+' at:'+at);
        return fetch(url,{
            method:'get',
            headers:{
                'Authorization':'Basic '+at
            }
        })
        
        
    }
    render(){
        this.MarkRead();
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

//<HTMLView style={styles.content} value={params.data.content} />
//<WebView hasZoom='true' source={{uri:'http://oliang.itban.com/content/'+params.data.id}} style={{marginTop:20}} />
          return(
              <ScrollView style={styles.container}>
                  <View style={{flex:1,height:150,position:'relative'}}>
                  <Image resizeMode="cover" source={{uri:params.data.img}} style={styles.img}/>
                  </View>
              <View style={{padding:10}} >
              <Text style={styles.title}>{params.data.title}</Text>
              <HTMLView style={styles.content} value={params.data.content} hasZoom='true' />
              
              </View>
              <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        style={{marginTop: 20}}
      />
              </ScrollView>
          )
        }
    }
}
//<HTMLView stylesheet={htmlstyles} value={params.data.content} style={styles.container}/>
const styles=StyleSheet.create({
    container:{flex:1,position:'relative'},
    img:{position:'absolute',top:0,left:0,bottom:0,right:0},
    vdo:{width:320,height:240},
    title:{fontSize:20,padding:5},
    content:{padding:10}
});

const htmlstyles=StyleSheet.create({
    body:{padding:20,flex:1,margin:10},    
    p:{margin:0,color:'#444444',padding:10,fontSize:16},
});
