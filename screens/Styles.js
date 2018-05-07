import React from 'react';
import {StyleSheet,AsyncStorage} from 'react-native';

export const themeLight= StyleSheet.create({
    container:{flex:1,position:'relative'},
    img:{position:'absolute',top:0,left:0,bottom:0,right:0},
    vdo:{width:320,height:240},
    title:{fontSize:28,padding:3},
    content:{padding:10,},
    instructions: { marginTop: 20,marginBottom: 20,},
    postView:{flex:4,padding:5,backgroundColor:'#ffffff'},
    postItem:{        flex:1,flexDirection:'row',padding:3,borderBottomWidth:1,borderColor:'#cccccc',backgroundColor:'#ffffff',},
    postImg:{ height:150,flex:4,},
    postText:{flex:4,flexDirection:'column',  justifyContent: 'space-between'},
    postTitle:{ fontSize:14,position:'relative',color:'#000000',padding:3,},
    postAuthor:{fontSize:12,position:'relative',color:'#442222',padding:3,},
    postDate:{fontSize:10,color:'#222244',fontStyle:'italic',padding:3,},
    
    postRead:{ flex:1,position:'absolute',bottom:10,right:0,},
    icon:{width:20,height:20},
    htmlview:{color:'#222222'},
    topbtn:{backgroundColor:'rgba(100,100,100,0)',color:'#444444',margin:3},
});

export const themeDark=StyleSheet.create({
    container:{flex:1,position:'relative',backgroundColor:'#222222'},
    img:{position:'absolute',top:0,left:0,bottom:0,right:0},
    vdo:{width:320,height:240},
    title:{fontSize:28,padding:0,color:'#ffffff'},
    content:{padding:0,color:'#ffffff'},
    instructions: { marginTop: 20,marginBottom: 20,},
    postView:{flex:4,padding:5,backgroundColor:'#222222'},
    postItem:{flex:1,flexDirection:'row',padding:3,borderBottomWidth:1,borderColor:'#cccccc',backgroundColor:'#222222',},
    postImg:{ height:150,flex:5,},
    postText:{flex:4,flexDirection:'column',  justifyContent: 'space-between'},
    postTitle:{padding:3,fontSize:14,position:'relative',color:'#ffffff',},
    postDate:{fontSize:10,color:'#aaaaff',fontStyle:'italic',padding:3},
    postAuthor:{padding:3,fontSize:12,position:'relative',color:'#ffdddd',},
    
    postRead:{ flex:1,position:'absolute',bottom:10,right:0,},
    icon:{width:20,height:20},
    btn:{backgroundColor:'#FFFFFF'},
    htmlview:{color:'#FFFFFF'},
    topbtn:{backgroundColor:'rgba(100,100,100,0)',color:'#aaaaaa'},
});
export const htmlLight=StyleSheet.create({
    body:{color:'#888888'},
    p:{fontSize:18,color:'#000000',lineHeight:24,marginBottom:0,marginTop:0,padding:0,margin:0},
});
export const htmlDark=StyleSheet.create({
    body:{color:'#ffffff'},
    p:{fontSize:18,color:'#FFFFFF',lineHeight:20,marginBottom:0,marginTop:0,padding:0,margin:0},
    a:{color:'#ffcccc'},
    
   
   ol:{color:'#FFFFFF'},
   li:{color:'#FFFFFF'},
});
    
export const txtLight=StyleSheet.create({
    p:{color:'#000000'},
});
export const txtDark=StyleSheet.create({
    p:{color:'#000000'},
});