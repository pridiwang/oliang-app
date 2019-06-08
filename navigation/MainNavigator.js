import {Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

//import App from '../App';
import LoginScreen from '../screens/Login';

import CategoryScreen from '../screens/Category';
import PostsScreen from '../screens/Posts';
import AllPosts from '../screens/AllPosts';
import DetailScreen from '../screens/PostDetail';
import PlayerScreen from '../screens/PostPlayer';
//import AppUniverse from '../screens/AppUniverse';
import Profile from '../screens/Profile';
import Test from '../screens/Test';
import Splash from '../screens/Splash';
import AboutScreen from '../screens/About';
import Logout from '../screens/Logout';
import PostNew from '../screens/PostNew';
import PostCamera from '../screens/PostCamera';
import WebScreen from '../screens/Web';
//import Noti from '../screens/Noti';

//PostNew: { screen: PostNew },

export default MainNavigator = createStackNavigator({
    Splash: { screen: Splash },   
    PostCamera: { screen: PostCamera },
    Login: { screen: LoginScreen,headerStyle:{marginTop: Platform.OS ==='ios' ? 0 :-30 }, },
    Category: { 
        screen: CategoryScreen ,
        navigationOptions:{header:null}
    },  
    Posts:      {screen: PostsScreen },
    AllPosts:   {screen: AllPosts },
    Detail:     {screen: DetailScreen },
    Player:     {screen: PlayerScreen },
    About:      {screen: AboutScreen },
    Web:        {screen: WebScreen },
    PostPlayer: {screen: PlayerScreen},
    Profile:    {screen: Profile},
    Logout:     { screen: Logout},
}, {
    headerMode: 'screen', 
});

