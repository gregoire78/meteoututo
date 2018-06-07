import React from 'react';
import {Text, ActivityIndicator, ListView} from 'react-native';
import style from '../style';
import axios from 'axios';
import WeatherRow from './Weather/Row';

export default class List extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: `Météo / ${navigation.state.params.city}`
        }
    }

    constructor (props) {
        super(props)
        this.state = {
            city: this.props.navigation.state.params.city,
            report: null
        }
        this.fetchWeather();
    }

    fetchWeather () {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&units=metric&cnt=10&appid=f513805255c080947d4115bc85cf923e`)
        .then(response => {
            this.setState({report: response.data})
        })
    }

    render () {
        if(this.state.report === null) {
            return (
                <ActivityIndicator color={style.color} size="large" />
            )
        } else {
            console.log(this.state.report.list)
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            return (
                <ListView 
                    dataSource={ds.cloneWithRows(this.state.report.list)}
                    renderRow={(row, j, k) => <WeatherRow day={row} index={parseInt(k)} />} 
                />
            )
        }
    }
}