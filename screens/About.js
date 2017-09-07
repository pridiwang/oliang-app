import React  from 'react';
import {View,Text,Image,StyleSheet,TouchableHighlight}  from 'react-native';
import Loginscreen from './Login';
import {themeLight,themeDark} from './Styles';
export default class AboutScreen extends React.Component{
    static navigationOptions = {
        drawerLabel: 'About',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../img/about-icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
        header:null,
      };
    
    render(){
        return(
            <View style={styles.container} >
                <Text>About</Text>
            </View>
        )
    }
}
const styles=themeLight;