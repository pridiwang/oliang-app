import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
export default class PostCamera extends React.Component {
    static navigationOptions=({navigation})=>({
       header:null, 
    });
    state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity style={{flex:0.1,alignSelf:'flex-start',alignItems:'center'}}
              onPress={()=>this.props.navigation.navigate('PostNew')}
              >
                  <Text style={{color:white}}> Back</Text>
                  </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>

            </View>
          </Camera>
        </View>
      );
    }
  }
}