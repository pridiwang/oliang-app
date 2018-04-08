import React  from 'react';
import {View,Text,Image,StyleSheet,TouchableHighlight}  from 'react-native';
import Loginscreen from './Login';
import MyWebView from 'react-native-webview-autoheight';
export default class Web extends React.Component{
    static navigationOptions={
        header:null,
    }
    async componentDidMount() { 
        const {params} = this.props.navigation.state;
        console.log('web');
        console.log(params.data);
        const url=params.data.link;
        console.log('url:'+url);

    }
    render(){
        const {params} = this.props.navigation.state;
        const url=params.data.link;
        console.log('url:'+url);
        return(
            <View style={{flex:1}}>
               <MyWebView hasZoom='true' source={{uri:url,method:'GET'}} 
                        style={{marginTop:10,marginRight:10,height:800,flex:0.9,backgroundColor:'rgba(0,0,0,0)' }} 
                        scrollEnabled={true}
                    /> 
            </View>
        )
    }
}