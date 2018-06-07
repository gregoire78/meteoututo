import React from 'react';
import {View, TextInput, Button, Keyboard, Platform, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import style from '../style';
import {createStackNavigator} from 'react-navigation';
import List from './List';
import { Constants, Location, Permissions } from 'expo';

class Search extends React.Component {
    
    static navigationOptions = {
        title: "Rechercher une ville"
    }

    constructor (props) {
        super(props)
        this.state = {
            city: 'Montpellier',
            location: null,
            errorMessage: null,
        }
        this.setCity = this.setCity.bind(this)
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            //this._getLocationAsync();
        }
    }
    
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        } else {
            let location = await Location.getCurrentPositionAsync({}).catch(()=>{console.log("error get location")});
            this.setState({ location });
        }
    }

    setCity (city) {
        this.setState({city})
    }

    submit () {
        Keyboard.dismiss();
        this.props.navigation.navigate('Result', {city: this.state.city})
    }

    render () {
        let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
        return (
            <View style={style.container} >
                <TextInput
                    underlineColorAndroid='transparent'
                    onChangeText={this.setCity}
                    onSubmitEditing={() => this.submit()}
                    style={style.input}
                    value={this.state.city}
                />
                <Button onPress={() => this.submit()} title="Rechercher une ville" color={style.color} />
                <Ionicons.Button
                    onPress={() => this._getLocationAsync()}
					name="md-locate"
					size={26}
				>
                </Ionicons.Button>
                <Text>{text}</Text>
            </View>
        )
    }
}

const navigationOptions = {
    headerStyle: style.header,
    headerTitleStyle: style.headerTitle,
}

export default createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions
    },
    Result: {
        screen: List,
        navigationOptions
    }
}, {
    initialRouteName: 'Search'
})