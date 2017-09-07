import React from 'react';
import { Animated,Dimensions,Image,ScrollView,ActivityIndicator,StyleSheet, ListView,Text,TextInput, View,
    TouchableHighlight,Alert,AsyncStorage,WebView,TouchableOpacity,Button,Share } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import Expo,{Video} from 'expo';
//import Share, {ShareSheet, Button} from 'react-native-share';
import {themeDark,themeLight} from './Styles';

export default class DetailScreen extends React.Component{

    static navigationOptions=({navigation})=>({
        title:navigation.state.params.data.name,
    });
    constructor(props) {
        super(props);
        this.state = {
          visible: false
        }
      }
      onCancel() {
        console.log("CANCEL")
        this.setState({visible:false});
      }
      onOpen() {
        console.log("OPEN")
        this.setState({visible:true});
      }

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
        let contentURL="http://oliang.itban.com/content/"+params.data.id;
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
              message: params.data.title+': '+params.data.content,
              title: params.data.title,
              url:contentURL,
          }
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
              <HTMLView style={styles.content} hasZoom='true' stylesheet={htmlstyles} value={params.data.content}  />
              </View>         
      <Button onPress={()=>{Share.share(shareContent)}} title="Share"></Button>
              </ScrollView>
          )
        }
    }
}
//<HTMLView stylesheet={htmlstyles} value={params.data.content} style={styles.container}/>
const styles=themeDark;

const htmlstyles=StyleSheet.create({
    body:{padding:20,flex:1,margin:10},    
    p:{margin:0,color:'#444444',padding:0},
    
});

//  twitter icon
const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";

//  facebook icon
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";
