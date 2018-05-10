import React  from 'react';
import PropTypes from 'prop-types';
import {View,Text,Image,StyleSheet,TouchableHighlight}  from 'react-native';
import Loginscreen from './Login';
export default class Splash extends React.Component{
    static navigationOptions={
        header:null,
    }
    constructor (props) {
        super(props);
        this.state = {
            signedin: false,
            theme:'Light',
        };
        
    }
    render(){
        setTimeout(()=>{
            this.props.navigation.navigate('Login')    
        }, 500);
        return( 
            
        <View style={styles.container}>
            <TouchableHighlight onPress={()=>this.props.navigation.navigate('Login')} > 
           <Image source={require('../img/nbtc-telecom.gif')} style={styles.img} resizeMode="cover" />
           </TouchableHighlight>
        
        </View> 
        
        )
        
    }

}

const styles = StyleSheet.create({
    container:{backgroundColor:'#ffffff',
        flex:1,flexDirection:'row',alignItems:'center'
    ,justifyContent:'center'},
    img:{flex:1,width:320},
});