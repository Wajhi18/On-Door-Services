import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Routes from './src/navigation/Routes';
import { color } from './src/helpers/color/Color_Constant';

export default class App extends Component {
  render() {
    return (
      <SafeAreaProvider>
        <StatusBar backgroundColor={color.secondaryColor} />
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </SafeAreaProvider>
    )
  }
}