import React from 'react';
import PropTypes from 'prop-types';
import {Picker,AsyncStorage, Alert,Modal,View,Text,Button,TextInput,Image,StyleSheet,TouchableHighlight,TouchableOpacity, ScrollView,Platform}  from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import {MainNavigator} from '../navigation/MainNavigator';
import {Camera, Permissions, Notifications,ImagePicker,Video } from 'expo';

import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var can_post='0';
export default class PostNew extends React.Component{
    
  static navigationOptions=({navigation})=>({
        
        title:'Post New',
        headerStyle:{marginTop: Platform.OS ==='ios' ? 0 : -30 },
        headerLeft: <TouchableHighlight onPress={()=>navigation.navigate('Category',)}><Ionicons name="md-arrow-back" style={styles.topbtn} size={32}  /></TouchableHighlight>,
        headerRight:<TouchableHighlight onPress={()=>navigation.navigate('Category',)}><Ionicons name="md-home" style={styles.topbtn} size={32}  /></TouchableHighlight>,

        drawerLabel: 'เขียนบทความใหม่',
        drawerLockMode: 'locked-closed',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../img/post-icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
    });
    constructor(props) {
        super(props);
        this.state = {title: '',category:'1',content:'',imgname:'',vdoname:'',at:''};
        this.imgname = {imgname: ''};
        
    }
    async componentDidMount(){
      await AsyncStorage.getItem('at',(err,at1)=>{
        this.setState({at:at1});
      });
      await AsyncStorage.getItem("can_post",(err,can_post)=>{
        console.log('can_post '+can_post);
        if(can_post=='0'){
          var navigationOptions=({navigation})=>({
            drawerLabel:'',
            drawerIcon:'',title:'' ,
            drawerLockMode:'locked'
          });
        }
      });
    }
    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: status2 === 'granted' });
    }
    
    postSubmit = () =>{
      console.log('postnew ');

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
      if(this.state.vdoname!=undefined){
        formData.append('vdo',this.state.vdoname);
      }
      console.log('posting title '+this.state.title+' content '+this.state.content+' imgname '+this.state.imgname);
      fetch('http://oliang.itban.com/postnew', { 
        method: 'POST',
        headers:{'Authorization':this.state.at},
        body: formData,
      })
        Alert.alert("สำเร็จ","เพิ่มบทความใหม่เรียบร้อยแล้ว",[
          {
              text:'รับทราบ', 
              onPress:()=>this.props.navigation.navigate('Category')
          }
          
        ]); 
        return;
    }
    _pickImage = async ()=> {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect:[4,3],
        mediaTypes:'Images',
      });
      console.log(result);
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        var formData = new FormData();
        var rand = Math.floor(Math.random() * 1000000) + 100000 ;
        var url ='http://oliang.itban.com/upload';
        formData.append('userfile',{uri:result.uri, name:'test.jpg', type:'multipart/form-data'});
        fetch(url, {
          method: 'post',
          headers:{'Content-Type':'multipart/form-data'},
          body: formData,
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          console.log('action:'+responseJson.action);
          if(responseJson.response){
            this.setState({imgname:responseJson.image});
          }
        })
        .catch((error) => {console.error(error);});
      }
      
    }

    _pickCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        mediaTypes:'All',
      });
      console.log(result);
      //headers:{    'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',  },
      if (!result.cancelled) {
        this.setState({ image: result.uri });
        var formData = new FormData();
        formData.append('userfile',{uri: result.uri, name:'test.jpg',type:'multipart/form-data'});
        fetch('http://oliang.itban.com/upload', {method: 'POST', body: formData,})
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.response){
            if(responseJson.image) this.setState({imgname:responseJson.image});
            if(responseJson.vdo) this.setState({vdoname:responseJson.vdo});
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    };

    _pickVdo = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes:'Videos',
      });
      console.log(result);
      if (!result.cancelled) {
        alert('กรุณารอจนอัพโหลดวิดีโอเรียบร้อย ขึ้นอยู่กับความยาวและขนาดของวิดีโอ ระหว่างนี้สามาถพิมพ์หัวข้อและเนื้อหาได้');
        this.refs.btnSubmit.props.shouldhide=true;
        this.setState({ vdo: result.uri });
        var formData = new FormData();
        var url ='http://oliang.itban.com/upload';
        formData.append('userfile',{uri: result.uri, name:'test.mp4',type:'multipart/form-data'});
        fetch(url, {method: 'POST',body: formData,})
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if(responseJson.response){
            alert('วิดีโอ อัพโหลดเรียบร้อย');

            this.setState({imgname:responseJson.image});
            this.setState({vdoname:responseJson.vdo});
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
      
      let { image,vdo } = this.state;
      const { hasCameraPermission,hasCameraRollPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
          } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
          } else {
        return (
          <KeyboardAwareScrollView style={{padding:10,paddingTop:10,flexGrow:1}}>
      <Text style={{flex:1,fontSize:18,backgroundColor:'#600',color:'white',textAlign:'center'}}> - เขียนบทความใหม่ - </Text>
      <Text>เรื่อง</Text>
            <TextInput ref='title' multiline={true} underlineColorAndroid="rgba(255,255,255,0)" style={{height: 40,fontSize:14, borderColor: '#bbbbbb', borderWidth:1,padding:2,backgroundColor:'#fff',textAlignVertical:'top'}}
    onChangeText={(text) => this.setState({title:text})}  onSubmitEditing={(event) => { 
      this.refs.content.focus(); 
    }}
    value={this.state.title}></TextInput>
    <Text>ข้อความ</Text>
            <TextInput ref='content' underlineColorAndroid="rgba(255,255,255,0)" multiline={true} style={{fontSize:14,height:160, borderColor: '#bbbbbb', borderWidth: 1,textAlignVertical:'top',paddingHorizontal:2,backgroundColor:'#fff'}}
    onChangeText={(text) => this.setState({content:text})}
    value={this.state.content}></TextInput>
  <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}} >
    <TouchableHighlight onPress={this._pickImage} >
      <Ionicons name="md-image" style={styles.mbtn} size={32}  /></TouchableHighlight>
    <TouchableHighlight onPress={this._pickVdo} >
      <Ionicons name="logo-youtube" style={styles.mbtn} size={32}  /></TouchableHighlight>
    <TouchableHighlight onPress={this._pickCamera} >
      <Ionicons name="md-camera" style={styles.mbtn} size={32}  /></TouchableHighlight>
    <TouchableHighlight onPress={this.postSubmit} ref="btnSubmit" >
      <Ionicons name="md-send" style={styles.mbtn} size={32}  /></TouchableHighlight>
    </View>
    {image && <Image source={{uri: image}} style={{flex:1,height:200}} /> }
    {vdo && <Video source={{uri:vdo}} resizeMode="cover" useNativeControls={true}  style={{flex:1,height:200}} /> }
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
