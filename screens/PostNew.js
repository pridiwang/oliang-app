import React from 'react';
import PropTypes from 'prop-types';
import {Picker,Alert,Modal,View,Text,Button,TextInput,Image,StyleSheet,TouchableHighlight,TouchableOpacity, ScrollView}  from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import {MainNavigator} from '../navigation/MainNavigator';
import {Camera, Permissions, Notifications,ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class PostNew extends React.Component{
    static navigationOptions=({navigation})=>({
        header:null,
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
        this.state = {category: '1'};
        this.state = {title: ''};
        this.state = {content: ''};
        this.imgname = {imgname: ''};
      }
      async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
      }
    postSubmit(){
      if(this.state.title==undefined){
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
      formData.append('category',this.state.category);
      formData.append('title',this.state.title);
      formData.append('content',this.state.content);

      if(this.state.imgname!=undefined){
        formData.append('image',this.state.imgname);
      }
      console.log('posting title '+this.state.title+' content '+this.state.content+' imgname '+this.state.imgname);
      fetch('http://oliang.itban.com/postnew', { 
        method: 'POST',
        body: formData,
      })
        Alert.alert("สำเร็จ","เพิ่มบทความใหม่เรียบร้อยแล้ว",[
          {text:'รับทราบ', onPress:()=>this.props.navigation.navigate('Category')}

        ]); 
        
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
            <View style={{flexDirection:'row',justifyContent:'center'}} >
    <Button title='<-' onPress={()=>this.props.navigation.navigate('Category')} />
    <Button title='รูปภาพ' onPress={this._pickImage} />
    <Button title='วิดีโอ' onPress={this._pickImage} />
    <Button title='ส่งบทความ' onPress={()=>this.postSubmit()} />
    </View>
    {image && <Image source={{uri: image}} style={{width:320,height:200}} /> }
    
            <Text>เรื่อง</Text>
            <TextInput ref='title' multiline={true} style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    onChangeText={(title) => this.setState({title})}  onSubmitEditing={(event) => { 
      this.refs.content.focus(); 
    }}
    value={this.state.title}></TextInput>
    <Text>ข้อความ</Text>
            <TextInput ref='content' multiline={true} style={{height: 160, borderColor: 'gray', borderWidth: 1,textAlignVertical:'top'}}
    onChangeText={(content) => this.setState({content})}
    value={this.state.content}></TextInput>
  

            </KeyboardAwareScrollView>)
          }
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  txtInput:{height:30,margin:5,backgroundColor:'#eeeeee',padding:5,}

});
