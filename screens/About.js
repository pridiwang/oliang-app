import React  from 'react';
import {View,Text,Image,StyleSheet,TouchableHighlight,ScrollView,Button}  from 'react-native';
import Loginscreen from './Login';
import {themeLight,themeDark} from './Styles';
import HTMLView from 'react-native-htmlview';
function renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.name == 'iframe') {
      return null;
    }
  }
const HTMLcontent='<h3>เกี่ยวกับ(About)แอปพลิเคชัน“โอเลี้ยง (Oliang)”</h3><p>แอปพลิเคชัน“โอเลี้ยง (Oliang)”นี้ จัดทำขึ้นเพื่อประโยชน์ในการสื่อสารภายในสำนักงาน กสทช. เป็นหลัก แต่สำหรับเนื้อหาบางส่วนที่สามารถเผยแพร่ต่อสาธารณชนในวงกว้างได้ก็จะจัดให้มีการเผยแพร่ต่อสาธารณชนได้ด้วย โดยแอปพลิเคชันนี้อยู่บนพื้นฐานแนวคิดที่ว่า “ข้อมูลภายใน คนในต้องรู้ก่อน” ทั้งนี้ โดยสาระสำคัญหลักของแอปพลิเคชัน “โอเลี้ยง” นี้ จะมุ่งเนนให้เป็นสื่อ (Media) ที่ส่งผ่านเนื้อหาที่เป็นบทความ ข่าวสาร ข้อมูลสถิติ ตลอดจนข้อสั่งการของผู้บริหารระดับสูงที่ต้องการส่งถึงบุคลากรภายในสำนักงาน กสทช. ได้รับทราบโดยตรง และมีลักษณะ  “เฉพาะคนใน” เท่านั้นที่จะสามารถรับรู้ รับทราบ เพื่อให้เกิดการแยกแยะช่องทางสื่อสารข้อมูลสำคัญซึ่งจะต้องส่งต่อออกไปยังบุคคลภายนอกสำนักงาน กสทช. ได้ยากกว่าการใช้การสื่อสารผ่านสื่อสังคมออนไลน์อื่นๆ ที่อาจส่งต่อไปยังบุคคลภายนอกสำนักงาน กสทช. ได้โดยสะดวกมากกว่า ซึ่งเป็นเงื่อนไขสำคัญที่ระบบแอปพลิเคชัน “โอเลี้ยง” จึงต้องกำหนดให้บุคลากรของสำนักงาน กสทช. ต้องลงทะเบียนเข้าใช้งานด้วย ข้อมูลลงทะเบียนเพื่อการเข้าถึงและใช้งานระบบภายในสำนักงาน กสทช. (Access Directory:AD) ซึ่งจะทำให้เข้าถึงหัวข้อต่างๆ ได้มากกว่าผู้ใช้งานทั่วไปที่ต้องลงทะเบียนด้วยบัญชี Facebook โดยระบบแอปพลิเคชัน “โอเลี้ยง” จะมีการจัดเก็บข้อมูลการ Log In และการเปิดอ่านข้อมูลแต่ละเรื่อง (Subject) เพื่อจัดเก็บเป็นสถิติสำหรับใช้ในการพัฒนา ปรับปรุง และดำเนินการตามที่สำนักงาน กสทช. เห็นสมควรต่อไป </p><h3>วัตถุประสงค์ของแอปพลิเคชั่น (Objective)</h3><ul><li>เพื่อพัฒนาแอปพลิเคชันสำหรับใช้สื่อสารข้อมูลสำคัญของสำนักงาน กสทช. โดยส่งต่อถึงบุคลากรภายในสำนักงาน กสทช.ได้โดยสะดวกรวดเร็ว และเป็นการลดขั้นตอนการสั่งงานตามสายบังคับบัญชาให้มีความกระชับมากยิ่งขึ้นด้วย<br><li>เพื่อเป็นช่องทางในการสื่อสาร และประชาสัมพันธ์ผลงานของสำนักงาน กสทช.ที่มีลักษณะเป็นข้อมูลทางการ ให้ประชาชนทั่วไปสามารถเข้าถึงได้อย่างสะดวกและรวดเร็วมากยิ่งขึ้น </ul><h2>วิธีการใช้งาน(How to use)</h2><ol><li>เข้า Apple App Store / Google Play Store เพื่อดาวน์โหลด และติดตั้ง <li>ลงทะเบียนเพื่อเริ่มการใช้งานโดย <ol> <li>บุคคลทั่วไปให้ลงทะเบียนด้วยบัญชี Facebook ของตนเอง <li>บุคลากรของสำนักงาน กสทช. ให้ลงทะเบียนด้วย USER และ Password สำหรับเข้าใช้งานระบบคอมพิวเตอร์ของสำนักงาน กสทช. </ol> </li> <li>ข้อมูลการลงทะเบียนจะเป็นการกำหนดสิทธิในการเข้าถึงเนื้อหา โดยบุคลากรของสำนักงาน กสทช. จะสามารถเข้าถึงเนื้อหาได้มากกว่าผู้ใช้งานทั่วไป โดยระบบจะมีการเก็บข้อมูลการเข้าใช้งานไว้เพื่อนำไปประกอบการพัฒนาและปรับปรุงระบบ ตลอดจนประโยชน์อื่นของ สำนักงาน กสทช.ต่อไป </ol> <h3>ที่ปรึกษาโครงการ</h3><p>นายฐากร	ตัณฑสิทธิ์<br> -เลขาธิการ กสทช. <h3>ผู้อำนวยการโครงการ</h3><p>นายก่อกิจ ด่านชัยวิจิตร <br> - รองเลขาธิการ กสทช.<br>นางสาวอรวรี เจริญพร <br> - รักษาการ ผู้อำนวยการสำนัก <h3>ผู้ดำเนินการโครงการและผู้ประสานงาน</h3> <p>นางสาวอรวรี เจริญพร <br>นายพิศล สุ่นกุล <br>นายณัฐกิตติ์ สุริยะไกร <h3>ผู้พัฒนา</h3> <p>ห้างหุ้นส่วนจำกัด แฟเวอร์ริทดีไซน์ ';
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
            <ScrollView style={styles.container}>
            <View style={{margin:10,padding:10,flex:1,flexDirection:'column',alignContent:'center',alignItems:'center'}} >
            <Button title="<Back" onPress={()=>this.props.navigation.navigate('Category')} />
            <Image source={require ('../img/oliang-text.png')} style={{height:80,width:200}} />
            
         <HTMLView styles={{width:320,flex:5,padding:10,margin:0,fontSize:16,backgroundColor:'#dddddd'}} stylesheet={htmlStyles} value={HTMLcontent} ></HTMLView>
            </View>
            </ScrollView>
        )
    }
}

const styles=themeLight;
const htmlStyles=StyleSheet.create({
    body:{backgroundColor:'#aaaaaa'},
    h2:{fontSize:18,margin:0},
    h3:{fontSize:18,margin:0,},
    p:{margin:5,color:'#333333'}
});