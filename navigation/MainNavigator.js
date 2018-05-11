import {Platform } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import App from '../App';
import LoginScreen from '../screens/Login';

import CategoryScreen from '../screens/Category';
import PostsScreen from '../screens/Posts';
import AllPosts from '../screens/AllPosts';
import DetailScreen from '../screens/PostDetail';
import PlayerScreen from '../screens/PostPlayer';
import AppUniverse from '../screens/AppUniverse';
import Profile from '../screens/Profile';
import Test from '../screens/Test';
import Splash from '../screens/Splash';
import AboutScreen from '../screens/About';
import Logout from '../screens/Logout';
import PostNew from '../screens/PostNew';
import PostCamera from '../screens/PostCamera';
import WebScreen from '../screens/Web';
//import Noti from '../screens/Noti';

export default MainNavigator = StackNavigator({
    
    
    Splash: { screen: Splash },    
    PostNew: { screen: PostNew },
    PostCamera: { screen: PostCamera },
    
    Login: { screen: LoginScreen,headerStyle:{marginTop: Platform.OS ==='ios' ? 0 :-30 }, },
    
    Category: { screen: CategoryScreen },  
    Posts: { screen: PostsScreen },
    AllPosts: { screen: AllPosts },
    Detail: { screen: DetailScreen },
    Player: { screen: PlayerScreen },
    AppUni: { screen: AppUniverse },
    About: { screen: AboutScreen },
    Web: { screen: WebScreen },
    PostPlayer : {screen: PlayerScreen},
    
    
}, {
    headerMode: 'screen',
});

