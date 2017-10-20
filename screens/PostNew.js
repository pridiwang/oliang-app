import React from 'react';
import {View,Text,Button,TextInput,Image,StyleSheet,TouchableHighlight,TouchableOpacity, ScrollView}  from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import {MainNavigator} from '../navigation/MainNavigator';
import {Camera, Permissions, Notifications } from 'expo';

export default class PostNew extends React.Component{
    static navigationOptions=({navigation})=>({
        
    });
    constructor(props) {
        super(props);
        this.state = {title: ''};
        this.state = {desc: ''};
      }
      async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      }
    postSubmit(){
        this.props.navigation.navigate('Category');
        return true;
    }
    render(){
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
          } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
          } else {
        return (
        <ScrollView style={{padding:10}}>
            <Text style={{fontSize:30,color:'red',justifyContent:'center'}}>เขียนบทความใหม่</Text>
            <View style={{flexDirection:'row',justifyContent:'center'}} >
    <Button title='<-' onPress={()=>this.props.navigation.navigate('Category')} />
    <Button title='รูปภาพ' onPress={()=>this.props.navigation.navigate('PostCamera')} />
    <Button title='วิดีโอ' onPress={()=>this.props.navigation.navigate('PostCamera')} />
    <Button title='ส่งบทความ' onPress={()=>this.postSubmit()} />
    </View>
            <Text>เรื่อง</Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(title) => this.setState({title})}
    value={this.state.title}></TextInput>
    <Text>ข้อความ</Text>
            <TextInput multiline={true} style={{height: 160, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(desc) => this.setState({desc})}
    value={this.state.desc}></TextInput>
   

            </ScrollView>)
          }
    }
}