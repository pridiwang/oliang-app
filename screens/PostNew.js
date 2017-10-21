import React from 'react';
import {View,Text,Button,TextInput,Image,StyleSheet,TouchableHighlight,TouchableOpacity, ScrollView}  from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import {MainNavigator} from '../navigation/MainNavigator';
import {Camera, Permissions, Notifications,ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class PostNew extends React.Component{
    static navigationOptions=({navigation})=>({
        
    });
    constructor(props) {
        super(props);
        this.state = {title: ''};
        this.state = {content: ''};
      }
      async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      }
    postSubmit(){
      var formData = new FormData();
      formData.append('title',this.state.title);
      formData.append('content',this.state.content);
      formData.append('image',this.state.imgname);
      console.log('posting title '+this.state.title+' content '+this.state.content+' imgname '+this.state.imgname);
      fetch('http://oliang.itban.com/postnew', { 
        method: 'POST',
        body: formData,
      })
        //this.props.navigation.navigate('Category');
        return true;
    }
    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        var formData = new FormData();
        formData.append('userfile',{uri: result.uri, name:'test.jpg',type:'image/jpeg' });
        fetch('http://oliang.itban.com/upload', {
          method: 'POST',
          headers:{
            'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
          },
          body: formData,
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          console.log('action:'+responseJson.action);
          if(responseJson.response){
          
          console.log('fname:'+responseJson.fname);
          this.state = {imgname: responseJson.fname};
          }

        })
        .catch((error) => {
          console.error(error);
        });
      }
    };
    render(){
      let { image } = this.state;
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
          } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
          } else {
        return (
          <KeyboardAwareScrollView style={{padding:10,paddingBottom:600}}>
            <Text style={{fontSize:30,color:'red',justifyContent:'center'}}>เขียนบทความใหม่</Text>
            <View style={{flexDirection:'row',justifyContent:'center'}} >
    <Button title='<-' onPress={()=>this.props.navigation.navigate('Category')} />
    <Button title='รูปภาพ' onPress={this._pickImage} />
    <Button title='วิดีโอ' onPress={()=>this.props.navigation.navigate('PostCamera')} />
    <Button title='ส่งบทความ' onPress={()=>this.postSubmit()} />
    </View>
    {image && <Image source={{uri: image}} style={{width:320,height:200}} /> }
            <Text>เรื่อง</Text>
            <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(title) => this.setState({title})}
    value={this.state.title}></TextInput>
    <Text>ข้อความ</Text>
            <TextInput multiline={true} style={{height: 160, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(content) => this.setState({content})}
    value={this.state.content}></TextInput>
  

            </KeyboardAwareScrollView>)
          }
    }
}