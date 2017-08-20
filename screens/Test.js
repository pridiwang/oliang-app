import React from 'react';
import { StatusBar,Platform,ScrollView,ActivityIndicator, ListView,StyleSheet, Text,TextInput, View,Button,TouchableHighlight,Alert,AsyncStorage,Image } from 'react-native';
import Drawer from 'react-native-drawer';
import ControlPanel from './ControlPanel';
export default class Test extends React.Component{
    constructor (props){
        super(props);
    }
    render(){
        return(
<Drawer
  type="static"
  content={<ControlPanel />}
  openDrawerOffset={100}
  styles={drawerStyles}
  tweenHandler={Drawer.tweenPresets.parallax}
  >
        
            <View style={{flex:1,alignContent:'center',alignItems:'center'}}>
                <Text>test main view</Text>
                 <Button
            onPress={this.props.openDrawer}
            title="Open Drawer"
            />
                </View>
      </Drawer>

        )
    }
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}