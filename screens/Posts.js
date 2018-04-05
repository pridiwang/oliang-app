import React from 'react';
import { Image,ScrollView,ActivityIndicator,StyleSheet, ListView,Text,TextInput, View,Button,
    TouchableHighlight,Alert,AsyncStorage,RefreshControl } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import renderif from '../utility/renderif';
import {themeLight,themeDark,htmlLight,htmlDark} from './Styles';

const styles=themeLight;
const htmlStyles=htmlLight;


export default class PostsScreen extends React.Component{
    static navigationOptions=({navigation})=>({
        title:navigation.state.params.data.name,
        
    });
    constructor(props){
        super(props);
        console.log('constructor');
        this.state={
            isLoading:true,
            refreshing:false,
            theme:'Light',
        }
        AsyncStorage.getItem('theme',(err,result)=>{
            console.log('stored '+result);
            if(result=='Light') styles=themeLight;
            if(result=='Dark') styles=themeDark;
            if(result=='Light') htmlStyles=htmlLight;
            if(result=='Dark') htmlStyles=htmlDark;
        });
        
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
        if(cat>0) {
            url='https://oliang.itban.com/catposts/'+cat;
        }else{
            url='https://oliang.itban.com/searchposts/'+params.data.name;
        }
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
        AsyncStorage.getItem('theme',(err,result)=>{
            console.log(result);

          });
        //Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
        if(this.state.isLoading){
            return(
                <View style={styles.container} >
                <ActivityIndicator />
                </View>
            )
        }else{
            
            
            return(
                <View style={styles.postView} >
                    
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
                            <View style={styles.postText} >
                                <Text style={styles.postTitle}>{rowData.title} </Text>
                                <Text style={styles.postAuthor}>{rowData.author} </Text>
                            </View>
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

