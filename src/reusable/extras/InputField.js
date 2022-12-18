import React, { useState, useRef } from 'react'
import { View, TextInput } from 'react-native'

const InputField = ({ bgStyle, onChange, icon,icon2,Texthint, TextInputRef, onSubmit,keyboardType,secureTextEntry}) => {
    const [value, setValue] = useState('');
    return (
        <View style={{ ...bgStyle, flexDirection: 'row', alignItems: 'center' }}>
            {icon}
            <TextInput
                style={{ paddingStart: 10, flex: 1 ,color:'#000'}}
                ref={TextInputRef}
                secureTextEntry={secureTextEntry}
                value={value}
                placeholderTextColor={'gray'}
                keyboardType={keyboardType}
                placeholder={Texthint}
                onChangeText={(txt) => handleonTextChange(txt)}
                onSubmitEditing={() => onSubmit()}
            />
            {icon2}
        </View>
    )
    function handleonTextChange(txt) {
        setValue(txt)
        onChange && onChange(txt)
    }
}

export default InputField;
