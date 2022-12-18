import React from "react";
import { TouchableOpacity, Text, View } from "react-native";


const MyButton = ({ icon,icon1,onPress, style,title }) => {
    return (
        <TouchableOpacity style={style} activeOpacity={0.7}
            onPress={() => onPress && onPress()}>
                
                {icon}
                {title}
                {icon1}
      
        </TouchableOpacity>
    )
}
export default MyButton