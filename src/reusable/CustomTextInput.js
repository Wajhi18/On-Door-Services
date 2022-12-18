import { View, TextInput } from 'react-native'
import React, { Component } from 'react'

export default class CustomTextInput extends Component {
  render() {
    const { width, height, placeholder, value, secure, bgColor, keyboardType, borderRadius, onChangeText } = this.props
    return (
        <TextInput autoCapitalize='none'
          style={{ width: width, height: height, paddingStart: 15, color: 'black', borderWidth: 1, borderColor: 'black', borderRadius: borderRadius, backgroundColor: bgColor? bgColor : 'white' }}
          placeholder={placeholder}
          placeholderTextColor="grey"
          secureTextEntry={secure? secure : false}
          keyboardType={keyboardType? keyboardType : 'default'}
          onChangeText={txt => onChangeText && onChangeText(txt)}
          value={value}
        />
    )
  }
}