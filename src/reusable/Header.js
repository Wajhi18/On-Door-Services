import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'


import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { color } from '../helpers/color/Color_Constant';

export default class Header extends Component {
    render() {
        const {title, leadingIcon, leadingButton, trailingButton} = this.props
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5, paddingVertical: 10, backgroundColor: color.secondaryColor }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={leadingButton && leadingButton} style={{ marginRight: 15, paddingHorizontal: 5, paddingVertical: 8, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name={leadingIcon} size={25} color={color.primaryColor} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color:color.primaryColor }}>{title}</Text>
                </View>
                {/* <TouchableOpacity onPress={trailingButton && trailingButton} style={{ paddingHorizontal: 7, paddingVertical: 5, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name='notifications' size={20} color={color.primaryColor} />
                </TouchableOpacity> */}

            </View>
        )
    }
}