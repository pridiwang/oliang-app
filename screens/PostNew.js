import React from 'react';
import {View,Text,TextInput,Image,StyleSheet,TouchableHighlight}  from 'react-native';
import { Permissions, Notifications } from 'expo';

export default class PostNew extends React.Component{
    render(){
        return (<View>
            <Text>Post New</Text>
            <TextInput></TextInput>
            </View>)
    }
}