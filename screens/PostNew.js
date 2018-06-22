import React from 'react';
import PropTypes from 'prop-types';
import {Picker,Alert,Modal,View,Text,Button,TextInput,Image,StyleSheet,TouchableHighlight,TouchableOpacity, ScrollView,Platform,PermissionsAndroid }  from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import {MainNavigator} from '../navigation/MainNavigator';
import {Camera, Permissions, Notifications,ImagePicker } from 'expo';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class PostNew extends React.Component{
    static navigationOptions=({navigation})=>({
        title:'Post New',
        headerStyle:{marginTop: Platform.OS ==='ios' ? 0 : -30 },
        headerLeft: <TouchableHighlight onPress={()=>navigation.navigate('Category',)}><Ionicons name="md-arrow-back" style={styles.topbtn} size={32}  /></TouchableHighlight>,
        headerRight:<TouchableHighlight onPress={()=>navigation.navigate('Category',)}><Ionicons name="md-home" style={styles.topbtn} size={32}  /></TouchableHighlight>,

        drawerLabel: 'เขียนบทความใหม่',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../img/post-icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
    });
    constructor(props) {
        super(props);
        this.state = {title: '',category:'1',content:'',imgname:''};
        this.imgname = {imgname: ''};        
    }
  
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    
    postSubmit = () =>{
      if((this.state.title===undefined)||(this.state.title==='')){
        Alert.alert('แจ้งเตือน','กรุณาใส่ข้อมูลเรื่อง',[
          {text:'Ok',onPress: ()=>this.refs.title.focus() }
        ]);

        return false;
      }
      if((this.state.content=='')||(this.state.content==undefined)){
        Alert.alert('แจ้งเตือน','กรุณาใส่ข้อมูลข้อความ',[
          {text:'OK',onPress: ()=>this.refs.content.focus() }
        ]);
        
        return false;
      }
      
      var formData = new FormData();
      formData.append('category','9');
      formData.append('title',this.state.title);
      formData.append('content',this.state.content);

      if(this.state.imgname!=undefined){
        formData.append('image',this.state.imgname);
      }   
      fetch('http://oliang.itban.com/postnew', { 
        method: 'POST',
        body: formData,
      })
        Alert.alert("สำเร็จ","เพิ่มบทความใหม่เรียบร้อยแล้ว",[
          {text:'รับทราบ', onPress:()=>this.props.navigation.navigate('Category')}
          
        ]); 
        return;
    }
    _pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes:'All',
      });
  
      console.log(result);
      try{
      var url='http://oliang.itban.com/upload';
      //let  url='http://27.254.144.132/upload.php';
      console.log('url '+url);
      //headers:{    'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',  },
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        
        console.log('url '+url);
        var formData = new FormData();
        formData.append('userfile',{uri: result.uri, name:'test.jpg',type:result.type,height:result.height,width:result.width});
        fetch(url, {
          method: 'post',          
          body: formData,
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          console.log('action:'+responseJson.action);
          if(responseJson.response){
          
          console.log('fname:'+responseJson.fname);
          this.setState({imgname:responseJson.fname});
          }

        })
        .catch((error) => {
          console.error(error);
        });
      }
    }catch(error){
      console.log(error);
    }
    };
    _pickCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes:'All',
      });
  
      //console.log(result);
      //headers:{    'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',  },
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        var formData = new FormData();
        formData.append('userfile',{uri: result.uri, name:'test.jpg',type:result.type});
        fetch('http://oliang.itban.com/upload', {
          method: 'POST',
          
          body: formData,
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          console.log('action:'+responseJson.action);
          if(responseJson.response){
          
          console.log('fname:'+responseJson.fname);
          this.setState({imgname:responseJson.fname});
          }

        })
        .catch((error) => {
          console.error(error);
        });
      }
    };
    _pickVdo = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        mediaTypes:'All',
      });
      console.log(result);
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        var formData = new FormData();
        formData.append('userfile',{uri: result.uri, name:'test.mp4',type:result.type});
        fetch('http://oliang.itban.com/upload', {
          method: 'POST',
          body: formData,
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          console.log('action:'+responseJson.action);
          if(responseJson.response){
          
          console.log('fname:'+responseJson.fname);
          this.setState({imgname:responseJson.fname});
          }

        })
        .catch((error) => {
          console.error(error);
        });
      }
    };
    /*
    <Text>หมวดหมู่</Text>
    <Picker ref='category' style={{margin:0,height:30}} 
  selectedValue={this.state.category}
  onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
  <Picker.Item label="ทั่วไป" value="1" />
  <Picker.Item label="จาก ลสทช" value="9" />
  <Picker.Item label="บทความโอเลี้ยง" value="8" />
  <Picker.Item label="รายงาน" value="6" />
  <Picker.Item label="ข่าวและกิจกรรม" value="5" />
  <Picker.Item label="แอพที่ต้องใช้" value="10" />

</Picker>
    */
    render(){
      
      let { image } = this.state;
      const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
          } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
          } else {
        return (
          <KeyboardAwareScrollView style={{padding:10,paddingTop:30}}>
          
      <Text style={{flex:1,fontSize:24,backgroundColor:'#600',color:'white',textAlign:'center'}}> - เขียนบทความใหม่ - </Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}} >
    
    
    <TouchableHighlight onPress={this._pickImage} >
    <Ionicons name="md-image" style={styles.mbtn} size={32}  /></TouchableHighlight>
    <TouchableHighlight onPress={this._pickVdo} >
    <Ionicons name="logo-youtube" style={styles.mbtn} size={32}  /></TouchableHighlight>
    <TouchableHighlight onPress={this._pickCamera} >
    <Ionicons name="md-camera" style={styles.mbtn} size={32}  /></TouchableHighlight>
    <TouchableHighlight onPress={this.postSubmit} >
    <Ionicons name="md-send" style={styles.mbtn} size={32}  /></TouchableHighlight>
    
    </View>
    {image && <Image source={{uri: image}} style={{width:320,height:200}} /> }
    
            <Text>เรื่อง</Text>
            <TextInput ref='title' multiline={true} underlineColorAndroid="rgba(255,255,255,0)" style={{height: 40, borderColor: '#bbbbbb', borderWidth: 1,paddingHorizontal:2,backgroundColor:'#fff'}}
    onChangeText={(text) => this.setState({title:text})}  onSubmitEditing={(event) => { 
      this.refs.content.focus(); 
    }}
    value={this.state.title}></TextInput>
    <Text>ข้อความ</Text>
            <TextInput ref='content' underlineColorAndroid="rgba(255,255,255,0)" multiline={true} style={{height:160, borderColor: '#bbbbbb', borderWidth: 1,textAlignVertical:'top',paddingHorizontal:2,backgroundColor:'#fff'}}
    onChangeText={(text) => this.setState({content:text})}
    value={this.state.content}></TextInput>
  

            </KeyboardAwareScrollView>)
          }
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
     alignItems: 'center',
    justifyContent: 'center',
    padding:30,    
    
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  icon:{
    width:20,height:20
  },
  txtInput:{height:30,margin:5,backgroundColor:'#eeeeee',padding:5,},
  topbtn:{margin:10},
  mbtn:{margin:5,color:'#666666'},
});
