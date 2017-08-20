import React, { Component } from 'react';
import {
  SwitchIOS,StyleSheet,Button,
  View,
  Text
} from 'react-native';




export default class ControlPanel extends Component {
  render() {
    return (
      <View style={{backgroundColor:'#cccccccc',flex:1,position:'relative'}}>
        <Text >
          Control Panel
        </Text>
        <Button style={{bottom:0,position:'absolute'}}
          onPress={() => {
            this.props.closeDrawer();
          }}
          title="Close Drawer"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
 controlPanel: {
    flex: 1,
    backgroundColor:'#326945',
  },
  controlPanelText: {
    color:'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
  },
  controlPanelWelcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 25,
    color:'white',
    fontWeight:'bold',
  },
});