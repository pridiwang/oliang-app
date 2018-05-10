import React from 'react';
import PropTypes from 'prop-types';
import { Image,ScrollView,ActivityIndicator,StyleSheet, ListView,Text,TextInput, View,Button,
    TouchableHighlight,Alert,AsyncStorage,RefreshControl,Platform } from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';
//import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import renderif from '../utility/renderif';
import {themeLight,themeDark,htmlLight,htmlDark} from './Styles';

const styles=themeLight;
const htmlStyles=htmlLight;

//headerRight:<TouchableHighlight onPress={()=>navigation.navigate('Category',)}><Text style={styles.topbtn} > Home </Text></TouchableHighlight>,
export default class AllPosts extends React.Component{
    static navigationOptions=({navigation})=>({
        title:navigation.state.params.data.name,
        headerStyle:{marginTop: Platform.OS ==='ios' ? 0 : -30 },
        headerLeft: <TouchableHighlight onPress={()=>navigation.navigate('Category',{data:navigation.state.params.data})}><Ionicons name="md-arrow-back" style={styles.topbtn} size={32} color="green" /></TouchableHighlight>,
        headerRight:<TouchableHighlight onPress={()=>navigation.navigate('Category',)}><Ionicons name="md-home" style={styles.topbtn} size={32} color="green" /></TouchableHighlight>,
    });
    constructor(props){
        super(props);
        
        this.state={
            isLoading:true,
            isLoadingMore:false,
            refreshing:false,
            theme:'Light',
            page:1,
            dataSource:null,
            _data:null,
            _dataAfter:'',
        }
        AsyncStorage.getItem('at',(err,at)=>{
            //console.log('getitem at:  '+at);
        });
        AsyncStorage.getItem('theme',(err,result)=>{
            //console.log('stored '+result);
            if(result=='Light'){
                styles=themeLight;
                htmlStyles=htmlLight;
                
            } 
            if(result=='Dark'){
                styles=themeDark;
                htmlStyles=htmlDark;
            } 
            this.setState({theme:result});
        });
        
    }
    _onRefresh(){
        this.setState({refreshing: true});
        this.componentDidMount().then(() => {
            this.setState({refreshing: false});
        });
        
    }
    async fetchData(callback){
        const at = await AsyncStorage.getItem('at');
        const {params} = this.props.navigation.state;



        const page = this.state.page !== ""
        ? this.state.page
        : 1;



        cat=params.data.id;
        url='https://oliang.itban.com/allposts/'+cat+'/'+page;
       //console.log('url '+url+ ' at '+at);
        fetch(url,{
            method:'get',
            headers:{
                'Authorization':at
            }
        })        
        .then((response) => response.json())
        .then(callback)
        .catch(error => {
            console.error(error)
        });
    }
    fetchMore(){
        const page =this.state.page + 1;
        this.setState({page:page});
        this.fetchData(responseJson=>{
            if(responseJson.data===null) return;
            var count = Object.keys(responseJson.data).length;
            if(count==0) return;
            const data2=responseJson.data;
            
            const data =this.state._data.concat(responseJson.data);
            
            this.setState({
                dataSource:this.state.dataSource.cloneWithRows(data),
                isLoadingMore:false,
                _data:data,
            })
        })
    }
    async componentDidMount() {
        const {params} = this.props.navigation.state;
        if(params.data.type=='link'){
            //console.log(params.data);
            this.props.navigation.navigate('Web',{data:params.data})
            return;
        }

        this.fetchData(responseJson => {
                let ds = new ListView.DataSource({
                    rowHasChanged:(r1,r2)=>1 !== r2
                });
                const data = responseJson.data;
                this.setState({
                    isLoading: false,                        
                    dataSource: ds.cloneWithRows(data),
                    _data: data,
                });
        });
    } 
    render(){
       //console.log('rendering ');
        AsyncStorage.getItem('theme',(err,result)=>{
            //console.log(result);

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
                       
                    dataSource={this.state.dataSource}
                    renderRow={ (rowData)=>
                    <View style={{flex:1}}>
                    <TouchableHighlight onPress={()=>{
                        //rowData.unread=0;
                        //console.log(rowData);
                        this.props.navigation.navigate('Detail',{data:rowData})
                   }}>
                        <View style={{flex:1,}}>
                            
                                <View style={styles.postItem}>
                                    
                                        <Image source={{uri:rowData.img}} style={styles.postImg} resizeMode="cover" />
                                    
                                    <View style={styles.postText} >
                                        <View style={{flex:3}}>
                                        <Text style={styles.postTitle}>{rowData.title} </Text>
                                        <Text style={styles.postDate}>{rowData.thai_date} </Text>
                                        </View>
                                        <Text style={styles.postAuthor}>{rowData.author} </Text>
                                    </View>
                                </View>
                                <View style={{flex:2}}>     
                                    {renderif(rowData.unread==='0',
                                    <Ionicons style={styles.postRead} name="md-checkmark-circle" size={16} color="green" />
                                    
                                    )}
                                </View>
                            
                        </View>

                    </TouchableHighlight>
                    </View>
                    }
                    onEndReached={()=>
                    this.setState({isLoadingMore:true}, ()=>this.fetchMore())}
                    renderFooter={()=>{
                       //console.log('rendering footer for page '+this.state.page);
                        return (
                            this.state.isLoadingMore && 
                            <View style={{flex:1}}>
                            <ActivityIndicator size="small" />
                            </View>
                        );
                    }}
                    />
                </View>
            )
        
        }
    }
}

