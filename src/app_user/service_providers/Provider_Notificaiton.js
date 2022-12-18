import { Text, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { color } from '../../helpers/color/Color_Constant'

export default class ProviderNotificaiton extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor: color.primaryColor}}>
          <ProviderNotificaiton/>
          <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'red'}}>
            <Text>data</Text>
          </ScrollView>
      </View>
    )
  }
}