import { Text, View, Image } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { navigate } from '../helpers/color/navigate'

export default class SplashScreen extends Component {
    async componentDidMount() {
        const userRole = await AsyncStorage.getItem('@userRole')

        const userToken = await AsyncStorage.getItem('@userToken')
        const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
        // alert('userToken: ' + userToken + '\nuserData: ' + userRole)
        setTimeout(() => {
            if (userRole == "provider") {
                this.props.navigation.replace(navigate.ProviderBottomRoutes)
            } else if (userRole == 'customer') {
                this.props.navigation.replace(navigate.CustomerBottomRoutes)
            } else {
                this.props.navigation.replace(navigate.Preference)
            }

        }, 3000);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{ width: 100, height: 100, }}
                    source={require('../assets/logo.png')}
                    resizeMode='contain'
                />
            </View>
        )
    }
}