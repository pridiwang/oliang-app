import React from 'react';
import PropTypes from 'prop-types';
import { Animated,Dimensions,Image,ScrollView,ActivityIndicator,StyleSheet, ListView,Text,TextInput, View,
    TouchableHighlight,Alert,AsyncStorage,WebView,TouchableOpacity,Button,Share,Platform,Linking } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import Expo,{Video,Permissions} from 'expo';
//import Share, {ShareSheet, Button} from 'react-native-share';
import {themeDark,themeLight,htmlDark,htmlLight,txtLight,txtDark} from './Styles';
import MyWebView from 'react-native-webview-autoheight';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AutoHeightWebView from 'react-native-autoheight-webview';

const styles=themeLight;
const htmlStyles=htmlLight;
const txtStyles=txtLight;
    
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
        console.log('status ');
        console.log(status);
    }
   
    render(){
        Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        //this.ChkPermission();
        const {params} = this.props.navigation.state;
        let contentURL="http://oliang.itban.com/content/"+this.state.theme+"/"+params.data.id;
        let fullcontentURL="http://oliang.itban.com/fullcontent/"+params.data.id;
        //console.loglog('content url '+contentURL);
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
          console.log('contentURL:'+contentURL);
          //console.log('fullcontentURL:'+fullcontentURL);
          
        /*
        if(params.data.mp4!==""){
            let clip_url=params.data.mp4.replace('.com/media/','.com:8081/vod/oliang/')+'/playlist.m3u8';
            console.log('vdo content '+clip_url);
            console.log('content url '+contentURL);
            console.log('platform OS '+ Platform.OS);
            if (Platform.OS==='android') {
                clip_url=params.data.mp4;
            }
            if((Platform.OS==='ios') || (Platform.OS==='android')  ) {
                return (
                <View style={{flex:1,position:'relative',backgroundColor:'#000'}}>
                    <Expo.Video source={{uri:clip_url}}
                
                volume={1.0} useNativeControls={true}
                 style={styles.vdo} resizeMode="contain" shouldPlay={true} hls={true}
                 isMuted={false}
                 height='auto'
                ignoreSilentSwitch={'ignore'}
                    hasZoom={true}
                 />
                 </View>
                )
            }else{
                console.log(' platform os '+Platform.OS +' contentURL '+contentURL);
            return (
                <View style={{flex:1,backgroundColor:'#000',alignContent:'center',alignItems:'center',justifyContent:'center'}} >
                    <MyWebView hasZoom='true' source={{uri:contentURL,method:'GET'}} 
                        style={{marginTop:10,marginRight:10,height:800,flex:0.9,backgroundColor:'rgba(0,0,0,0)' }} 
                        scrollEnabled={true}
                        allowsInlineMediaPlayback={true}
                        javaScriptEnabled={true}
                        scalePageToFit={true}
                        allowUniversalAccessFromFileURLs={true}
                        pause={false}
                        mediaPlayBackRequiresUserAction={false}
                    /> 
                
                </View>
            )
            }
        }else{
        }
*/
//<Expo.Video source={{uri:clip_url}} style={styles.img}                    resizeMode="contain"                     shouldPlay={true}                    hls={true}                                        />
//<HTMLView style={styles.content} value={params.data.content} /><HTMLView hasZoom='true' stylesheet={htmlStyles}  value={params.data.content}   />
//<WebView hasZoom='true' source={{uri:'http://oliang.itban.com/content/'+params.data.id}} style={{marginTop:20}} />
//<Image resizeMode="cover" source={{uri:params.data.img}} style={styles.img}/>
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
                <View style={{padding:10}} >
                    <Text style={styles.title}>{params.data.title}</Text>
                    <MyWebView hasZoom={true} 
                        source={{uri:contentURL,method:'GET'}} 
                        autoHeight={true}
                        style={{marginTop:10,marginRight:10,flex:1,backgroundColor:'rgba(0,0,0,0)' }}                         
                        scrollEnabled={false}
                        startInLoadingState={true} 
                        onShouldStartLoadWithRequest={(event)=>{
                            console.log('should start load with request ');
                            console.log(event);
                            if(event.url.indexOf('oliang.itban.com')!==-1){
                                return true;
                            }else{
                                Linking.openURL(event.url);
                                return false;
                            }
                            
                        }}
                        
                        /> 
              
                </View>         
                <Button onPress={()=>{Share.share(shareContent)}} title="Share" style={styles.btn} ></Button>
              </ScrollView>
          )
        
    }
}
//<HTMLView stylesheet={htmlstyles} value={params.data.content} style={styles.container}/>
/*


*/
/*

                        onNavigationStateChange={(event)=>{
                           //console.log('navication state change ');
                           //console.log(event);
                            return false;
                        }}
                       
                        onNavigationStateChange={(event)=>{
                            if(event.canGoBack) return false;
                           //console.log('navication state change ');
                            
                           //console.log(event);
                            
                            if( (event.url.indexOf('oliang.itban.com')!==-1) ) {
                                return true;
                            }
                            if( (event.url.indexOf('-js-navigation://')!==-1) ) {
                                return true;
                            }
                            Linking.openURL(event.url);
                            return false;
                            
                        }}*/

//  twitter icon
const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";

//  facebook icon
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";
