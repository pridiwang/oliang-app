import React from 'react';
import PropTypes from 'prop-types';
import { Animated,Dimensions,Image,ScrollView,ActivityIndicator,StyleSheet, FlatList,Text,TextInput, View,
    TouchableHighlight,Alert,AsyncStorage,WebView,TouchableOpacity,Button,Share,Platform,Linking } from 'react-native';

import Expo,{Video} from 'expo';
import * as Permissions from 'expo-permissions';

import {themeDark,themeLight,htmlDark,htmlLight,txtLight,txtDark} from './Styles';
import MyWebView from 'react-native-webview-autoheight';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AutoHeightWebView from 'react-native-autoheight-webview';

var styles=themeLight;
var htmlStyles=htmlLight;
var txtStyles=txtLight;
    
export default class DetailScreen extends React.Component{

    static navigationOptions=({navigation})=>({
        title:navigation.state.params.data.name,
        headerStyle:{marginTop: Platform.OS ==='ios' ? 0 : -30 },
        style:{height:30},
        headerRight:<TouchableHighlight onPress={()=>navigation.navigate('Category',)}><Ionicons name="md-home" style={styles.topbtn} size={32} color="green" /></TouchableHighlight>,
    });
    constructor(props) {
        super(props);
        
        this.state = {
          visible: false,
          at:'',
          openBrowser:false,
        }
        AsyncStorage.getItem('at',(err,result)=>{
            this.setState({at:result});
            this.MarkRead();
        });
        AsyncStorage.getItem('theme',(err,result)=>{
            //console.log('theme stored '+result);
            if(result=='Light'){
                styles=themeLight;
                htmlstyles=htmlLight;
                //txtStyles=txtLight;
                //console.loglog('contruct using themeLight htmlLight ');
            } 
            if(result=='Dark'){
                styles=themeDark;
                htmlstyles=htmlDark;
                //txtStyles=txtDark;
                //console.loglog('construct using themeDark htmlDark ');
            } 
            this.setState({theme:result});
        });
      }
      componentDidMount(){
          
      } 
      onCancel() {
        //console.loglog("CANCEL")
        this.setState({visible:false});
      }
      onOpen() {
        //console.loglog("OPEN")
        this.setState({visible:true});
      }

    MarkRead(){
        const {params} = this.props.navigation.state;
        //const at = await AsyncStorage.getItem('@FB:at');
        //const at = await AsyncStorage.getItem('at');
        at=this.state.at;
        //console.loglog('marking read ');
        const id=params.data.id;
        //console.loglog('id:'+id+' at:'+at);
        url='http://oliang.itban.com/readpost/'+id;
       //console.log('url:'+url+' at:'+at);
        return fetch(url,{
            method:'get',
            headers:{
                'Authorization':at
            }
        });
        
        
    }
    async ChkPermission(){
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        //console.log('status ');
        //console.log(status);
    }
   
    render(){
        //Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        //this.ChkPermission();
        const {params} = this.props.navigation.state;
        let contentURL="http://oliang.itban.com/content2/"+this.state.theme+"/"+params.data.id;
        let fullcontentURL="http://oliang.itban.com/fullcontent/"+params.data.id;
        //console.log('content url '+contentURL);
        let shareOptions = {
            title: params.data.title,
            message: params.data.content,
            url: contentURL,
            subject: "Share from Oliang NBTC" //  for email
          };
      
          let shareImageBase64 = {
            title: params.data.title,
            message: "Hola mundo",
            url: params.data.img,
            subject: "Share from Oliang NBTC" //  for email 
          };
          let shareContent={
              // +'\r\n'+ params.data.text
              message: params.data.title + ' / '+ params.data.author + '\r\n'+ fullcontentURL, 
              title: params.data.title,
              url:fullcontentURL,
              diaLogTitle:'Share to '
          }
          var rand =  100000 + Math.floor((Math.random() * (10000-99999)));
          contentURL+='?'+rand;
          //console.log('contentURL: with rand '+contentURL);
          //console.log('fullcontentURL:'+fullcontentURL);
          
            const TopImage = params.data.mp4=='' 
            ? (<View style={{flex:1,height:300,position:'relative'}}><Image resizeMode="cover" source={{uri:params.data.img}} style={styles.img}/></View>) 
            :(<TouchableHighlight onPress={()=>{
                    if (params.data.mp4.indexOf('youtube')!==-1){
                        //console.log('opening youtube ');
                        Linking.openURL(params.data.mp4);
                    }else{                    
                        Linking.openURL(params.data.mp4);
                        //Linking.openURL('http://oliang.itban.com/vdocontent/'+params.data.id);
                        //this.props.navigation.navigate('PostPlayer',{data:params.data})
                    }

            }}>
            <View style={{flex:1,height:300,position:'relative',alignItems:'center'}}><Image resizeMode="cover" source={{uri:params.data.img}} style={styles.img}/><Ionicons name="ios-play" style={{backgroundColor:'rgba(100,100,100,0)',color:'rgba(255,255,255,0.8)',margin:100}} size={100} /></View></TouchableHighlight>);
            return(
              <ScrollView style={styles.container}>
                {TopImage}
                <View style={{padding:10,flex:1,flexDirection:'column'}} >
                    <Text style={styles.title}>{params.data.title}</Text>
                    
                    
                    <MyWebView 
                        startInLoadingState={true}                         
                        autoHeight={true}                        
                        source={{uri: contentURL }}             
                        style={{margin:0,backgroundColor:'rgba(0,0,0,0)',height:0,flex:1}}
                        onShouldStartLoadWithRequest={(event)=>{
                            //console.log('should start load with request ');
                            //console.log(event);
                            if(event.url.indexOf('oliang.itban.com')!==-1){
                                return true;
                            }else{
                                Linking.openURL(event.url);
                                return false;
                            }
                            
                        }}
                       
                        /> 
<Button onPress={()=>{Share.share(shareContent)}} title="Share" style={styles.btn} ></Button>                    
                </View>         
                
              </ScrollView>
          )
        
    }
}
