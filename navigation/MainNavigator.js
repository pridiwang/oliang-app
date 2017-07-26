import {StackNavigator,DrawerNavigator,TabNavigator} from 'react-navigation';

import App from '../App';
import LoginScreen from '../screens/Login';
import CategoryScreen from '../screens/Category';
import PostsScreen from '../screens/Posts';
import DetailScreen from '../screens/PostDetail';
import PlayerScreen from '../screens/PostPlayer';
import AppUniverse from '../screens/AppUniverse';

export default MainNavigator = StackNavigator({
    Login: {screen: LoginScreen},
    Category: {screen: CategoryScreen},
    
    Posts: {screen: PostsScreen},
    Detail: {screen: DetailScreen},
    Player: {screen: PlayerScreen},    
    AppUni: {screen: AppUniverse},    
},{
    headerMode:'screen',
});
