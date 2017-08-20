import {StackNavigator,DrawerNavigator} from 'react-navigation';

import App from '../App';
import LoginScreen from '../screens/Login';
import CategoryScreen from '../screens/Category';
import PostsScreen from '../screens/Posts';
import DetailScreen from '../screens/PostDetail';
import PlayerScreen from '../screens/PostPlayer';
import AppUniverse from '../screens/AppUniverse';
import Profile from '../screens/Profile';
import Test from '../screens/Test';


export default MainNavigator = StackNavigator({
   
    Category: {screen: CategoryScreen},
    Profile: {screen: Profile},
    Login: {screen: LoginScreen}, 
    Posts: {screen: PostsScreen},
    Detail: {screen: DetailScreen},
    Player: {screen: PlayerScreen},    
    AppUni: {screen: AppUniverse},    
},{
    headerMode:'screen',
});
