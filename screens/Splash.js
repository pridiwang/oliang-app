import React  from 'react';
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
    componentDidMount() {
        setTimeout(()=>{
            this.props.navigation.navigate('Login')    
        }, 5000);
        
    }
    render(){
       
        return( 
            
        <View style={styles.container}>
           <Image source={require('../img/nbtc-telecom.gif')} style={styles.img} />
        </View> 
        
        )
        
    }

}

const styles = StyleSheet.create({
    container:{backgroundColor:'#ffffff',
        flex:1,flexDirection:'column',alignItems:'center'
    ,justifyContent:'center'},
    img:{flex:1,width:320},
});