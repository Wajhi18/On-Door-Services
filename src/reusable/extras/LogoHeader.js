import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Header_Style } from '../extras/styles';
const LogoHeader = ({ theme, title, posStyle, imgSource, onPress1, onPress2, onPress3, onPress4, iconSource1, iconSource2, iconSource3, iconSource4, cartItem }) => {
    return (
        <View style={{ ...Header_Style.Header_Container }}>
            <TouchableOpacity activeOpacity={0.7} style={{padding:3}}
                onPress={() => onPress1 && onPress1()}>
                    <Text>Back</Text>
                {/* <Image source={iconSource1} style={{ ...Header_Style.iconStyle, tintColor: theme.iconsCol }} /> */}
            </TouchableOpacity>
            <Text style={{ ...Header_Style.textStyle, ...posStyle, color: 'blue' }}>
                {title}
            </Text>
            <Image style={{ ...Header_Style.imgStyle, backgroundColor: 'red'}} source={imgSource} />

            <TouchableOpacity  activeOpacity={0.7}
                style={{ ...Header_Style.customIcon2, }} onPress={() => onPress2 && onPress2()}>
                <Image source={iconSource2} style={{ ...Header_Style.iconStyle, tintColor: 'yellow' }} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}
                style={{ ...Header_Style.customIcon3 }}
                onPress={() => onPress3 && onPress3()}>
                <Image source={iconSource3} style={{ ...Header_Style.iconStyle, marginTop: 5, tintColor: 'yellow' }} />
            </TouchableOpacity>


            <TouchableOpacity  activeOpacity={0.7}
                onPress={() => onPress4 && onPress4()}>
                <Image source={iconSource4} style={{ ...Header_Style.iconStyle, marginTop: 10, tintColor: 'yellow' }} />
            </TouchableOpacity>

        </View>
    )

}
export default LogoHeader