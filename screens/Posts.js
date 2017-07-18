import React from 'react';
import { Image,ScrollView,ActivityIndicator,StyleSheet, ListView,Text,TextInput, View,Button,
    TouchableHighlight,Alert,AsyncStorage,RefreshControl } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import renderif from '../utility/renderif';

export default class PostsScreen extends React.Component{
    static navigationOptions=({navigation})=>({
        title:navigation.state.params.data.name,
        
    });
    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            refreshing:false,
        }
    }
    _onRefresh(){
        this.setState({refreshing: true});
        this.componentDidMount().then(() => {
            this.setState({refreshing: false});
        });
        
    }
    async componentDidMount() { 
        const {params} = this.props.navigation.state;
        console.log('checking at');
        const at = await AsyncStorage.getItem('@FB:at');
        
        
        console.log(at);
        cat=params.data.id;
        url='http://oliang.itban.com/catposts/'+cat;
        console.log('url:'+url);
        return fetch(url,{
            method:'get',
            headers:{
                'Authorization':'Basic '+at
            }
        })        
        .then((response) => response.json())
        .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.data),
                },function(){

                });
            })
        .catch((error) => {
            console.error(error);
        });
    } 
    render(){
        //Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        if(this.state.isLoading){
            return(
                <View style={styles.container} >
                <ActivityIndicator />
                </View>
            )
        }else{
            return(
                <View style={{flex:4,padding:10,}} >
                    
                    <ListView style={{flex:5}}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                    dataSource={this.state.dataSource}
                    renderRow={ (rowData)=>
                    <View style={{flex:1}}>
                    <TouchableHighlight onPress={()=>{
                        rowData.unread=0;
                        this.props.navigation.navigate('Detail',{data:rowData})
                        }}>
                    <View style={{flex:1,}}>
                        <View style={styles.postItem}>
                            <Image source={{uri:rowData.img}} style={styles.postImg} resizeMode="cover" />
                            <Text style={styles.postTitle}>{rowData.title} </Text>
                             
                        </View>
                        <View style={{flex:2}}>     
                            {renderif(rowData.unread=='0',
                            <Ionicons style={styles.postRead} name="md-checkmark-circle" size={16} color="green" />
                            
                            )}
                        </View>

                    </View>

                    </TouchableHighlight>
                    </View>
                    }
                    />
                                
                </View>
            )
        
        }
    }
}

const styles=StyleSheet.create({
    container: {
        flex:4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postItem:{
        flex:1,
        flexDirection:'row',
        padding:3,
        borderBottomWidth:1,
        borderColor:'#cccccc',
    },
    postImg:{
       height:100,      
       flex:3,

    },
    postTitle:{
        flex:6,
        paddingLeft:5,
        fontSize:14,
        position:'relative',

    },
    postRead:{
        flex:1,
        position:'absolute',
        bottom:10,
        right:0,
       
    }

});