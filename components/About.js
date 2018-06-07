import React from 'react';
import {View, Text, Button, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from '../style';

export default class About extends React.Component {

    static navigationOptions = {
        tabBarIcon: ({ tintColor, focused }) => {
            return <Ionicons
                name="md-contact"
                size={26}
                style={{ color: tintColor }}
            />
        },
        tabBarLabel: "À propos"
    }

    search () {
        this.props.navigation.navigate('Search');
    }

    render () {
        return (
            <View style={[style.container, {paddingTop: StatusBar.currentHeight}]}>
                <Text style={style.title}>A propos de l'application</Text>
                <Text>lorem ipsum</Text>
                <Button color={style.color} onPress={() => this.search()} title="Rechercher" />
            </View>
        )
    }
}