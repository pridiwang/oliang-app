import { StackNavigator, DrawerNavigator } from 'react-navigation';

import App from '../App';
import LoginScreen from '../screens/Login';
import CategoryScreen from '../screens/Category';
import PostsScreen from '../screens/Posts';
import DetailScreen from '../screens/PostDetail';
import PlayerScreen from '../screens/PostPlayer';
import AppUniverse from '../screens/AppUniverse';
import Profile from '../screens/Profile';
import Test from '../screens/Test';
import Splash from '../screens/Splash';
import AboutScreen from '../screens/About';
import Logout from '../screens/Logout';


export default MainNavigator = StackNavigator({
    Login: { screen: LoginScreen },
    Category: { screen: CategoryScreen },   
    Profile: { screen: Profile },
    Splash: { screen: Splash },

    
    Posts: { screen: PostsScreen },
    Detail: { screen: DetailScreen },
    Player: { screen: PlayerScreen },
    AppUni: { screen: AppUniverse },
    About: { screen: AboutScreen },
}, {
    headerMode: 'screen',
});

