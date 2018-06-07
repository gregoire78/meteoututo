import React from 'react';
import {View, TextInput, Button, Keyboard} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import style from '../style';
import {createStackNavigator} from 'react-navigation';
import List from './List';

class Search extends React.Component {
    
    static navigationOptions = {
        title: "Rechercher une ville"
    }

    constructor (props) {
        super(props)
        this.state = {
            city: 'Montpellier'
        }
        this.setCity = this.setCity.bind(this)
    }

    setCity (city) {
        this.setState({city})
    }

    submit () {
        Keyboard.dismiss();
        this.props.navigation.navigate('Result', {city: this.state.city})
    }

    render () {
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