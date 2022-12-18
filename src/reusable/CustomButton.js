import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { color } from '../helpers/color/Color_Constant'

export default class CustomButton extends Component {
  render() {
    const { text, fontSize, loading, disabled, onPress, paddingHorizontal, paddingVertical, bgColor, textColor, borderColor, borderWidth, borderRadius, elevation } = this.props
    return (
      <TouchableOpacity disabled={disabled}
        activeOpacity={0.7}
        onPress={onPress && onPress}
        style={{ paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical, backgroundColor: bgColor, borderWidth: borderWidth, borderColor: borderColor, justifyContent: 'center', alignItems: 'center', borderRadius: borderRadius, elevation: elevation? elevation : 0 }}>
        {loading ?
          <ActivityIndicator color='white'/>
          :
          <Text style={{ color: textColor, fontSize: fontSize }}>{text}</Text>}
      </TouchableOpacity>
    )
  }
}