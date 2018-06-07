import React from 'react';
import { View, StatusBar } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { createMaterialBottomTabNavigator  } from 'react-navigation-material-bottom-tabs';
import About from './components/About';
import Search from './components/Search';

const Tabs = createMaterialBottomTabNavigator ({
	Search: {
		screen: Search,
		navigationOptions: {
			tabBarIcon: ({ focused, tintColor }) => {
				return <Ionicons
					name="md-search"
					size={26}
					color={tintColor}
				/>
			}
		}
	},
	About: { screen: About }
},{
	labeled: true,
	initialRouteName: 'Search',
	barStyle : {
		backgroundColor: '#a2273c',
		borderTopWidth: 1,
		borderColor: '#a2273c'
	}
})

export default class App extends React.Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<StatusBar hidden={false} translucent={true} backgroundColor="#7a0619" animated={true} />
				<Tabs />
			</View>
		);
	}
}