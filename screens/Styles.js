import React from 'react';
import {StyleSheet,AsyncStorage} from 'react-native';

export const themeLight= StyleSheet.create({
    container:{flex:1,position:'relative'},
    img:{position:'absolute',top:0,left:0,bottom:0,right:0},
    vdo:{width:320,height:240},
    title:{fontSize:20,padding:5},
    content:{padding:10,},
    instructions: { marginTop: 20,marginBottom: 20,},
    postView:{flex:4,padding:5,backgroundColor:'#ffffff'},
    postItem:{        flex:1,flexDirection:'row',padding:3,borderBottomWidth:1,borderColor:'#cccccc',backgroundColor:'#ffffff',},
    postImg:{ height:100,flex:3,},
    postTitle:{ flex:6,paddingLeft:5,fontSize:14,position:'relative',color:'#000000',},
    postRead:{ flex:1,position:'absolute',bottom:10,right:0,},
    icon:{width:20,height:20}
});

export const themeDark=StyleSheet.create({
    container:{flex:1,position:'relative',backgroundColor:'#333333'},
    img:{position:'absolute',top:0,left:0,bottom:0,right:0},
    vdo:{width:320,height:240},
    title:{fontSize:24,padding:5,color:'#ffffff'},
    content:{padding:0},
    instructions: { marginTop: 20,marginBottom: 20,},
    postView:{flex:4,padding:5,backgroundColor:'#333333'},
    postItem:{flex:1,flexDirection:'row',padding:3,borderBottomWidth:1,borderColor:'#cccccc',backgroundColor:'#333333',},
    postImg:{ height:100,flex:4,},
    postTitle:{ flex:5,paddingLeft:5,fontSize:14,position:'relative',color:'#ffffff',},
    postRead:{ flex:1,position:'absolute',bottom:10,right:0,},
    icon:{width:20,height:20},
    btn:{backgroundColor:'#FFFFFF'},
});
export const htmlLight=StyleSheet.create({
    p:{fontSize:16,color:'#000000',lineHeight:20,marginBottom:0,marginTop:0,padding:0,margin:0},
});
export const htmlDark=StyleSheet.create({
    
    a:{color:'#ffcccc'},
    p:{fontSize:16,color:'#FFFFFF',lineHeight:20,marginBottom:0,marginTop:0,padding:0,margin:0},
   
   ol:{color:'#FFFFFF'},
   li:{color:'#FFFFFF'},
});
    
export const themeTxtS=StyleSheet.create({

});