import { Text, View, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Modal from 'react-native-modal'
import { color } from '../../helpers/color/Color_Constant'
import firestore from '@react-native-firebase/firestore'
import Eye from 'react-native-vector-icons/Ionicons';
import alertFunction from '../../helpers/HelperFunction/AlertFunction'

export default class ChangePasswordModal extends Component {
    state = {
        password: '',
        confPassword: '',
        isLoading: false,
        hidePassword: true,
        hideConfirmPassword: true,
    }

    updatePassword = (userID) => {
        firestore().collection('Users').doc(userID).update({
            password: this.state.password
        }).then(() => {
            alertFunction.Alert('Password updated')
            this.setState({ password: '', confPassword: '', isLoading: false })
            this.props.setVisible(false)
        })
    }

    checkValidation = (userID) => {
        const { password, confPassword } = this.state
        this.setState({ isLoading: true })
        if (password == '' || confPassword == '') {
            this.setState({ isLoading: false })
            alertFunction.Alert('All fields are required')
        } else if (password.length < 8) {
            this.setState({ isLoading: false })
            alertFunction.Alert('Password must be 8 character long')
        } else if (confPassword.length < 8) {
            this.setState({ isLoading: false })
            alertFunction.Alert('Confirm password must be 8 character long')
        } else if (password.length >= 8 && confPassword.length >= 8 && password == confPassword) {
            this.updatePassword(userID)
        } else if (password != confPassword) {
            alertFunction.Alert('Password not matched')
        }
    }
    render() {
        const { password, confPassword, isLoading, hidePassword, hideConfirmPassword } = this.state
        const { isVisible, setVisible, userID } = this.props
        return (
            <Modal
                isVisible={isVisible}
                onBackButtonPress={() => setVisible(false)}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 20 }}>
                    <View style={{ alignItems: 'center', marginVertical: 20, }}>
                        <Text style={{ fontSize: 24, fontWeight: 'normal', color: color.tertiaryColor, marginBottom: 20 }}>Change Password</Text>
                    </View>
                    <View style={{...styles.textbox3}}>
                        <TextInput
                            style={{ paddingStart: 20, color: 'black', flex: 1 }}
                            placeholder="Password"
                            placeholderTextColor="grey"
                            keyboardType="default"
                            value={password}
                            secureTextEntry={hidePassword}
                            onChangeText={txt => this.setState({ password: txt })}
                            onSubmitEditing={() => this.confRef.focus()}
                        />
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() =>
                                this.setState({ hidePassword: !hidePassword })
                            }>
                            <Eye
                                style={styles.EyeIcon}
                                name={
                                    hidePassword == true
                                        ? 'eye-off-outline'
                                        : 'eye-outline'
                                }
                                size={20}
                                color="grey"
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.textbox3}}>

                        <TextInput ref={ele => this.confRef = ele}
                            style={{ paddingStart: 20, color: 'black', flex: 1 }}
                            placeholder="Confirm Password"
                            placeholderTextColor="grey"
                            keyboardType="default"
                            value={confPassword}
                            secureTextEntry={hideConfirmPassword}
                            onChangeText={txt => this.setState({ confPassword: txt })}
                            onSubmitEditing={() => this.checkValidation(userID)}
                        />
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                            onPress={() =>
                                this.setState({ hideConfirmPassword: !hideConfirmPassword })
                            }>
                            <Eye
                                style={styles.EyeIcon}
                                name={
                                    hideConfirmPassword == true
                                        ? 'eye-off-outline'
                                        : 'eye-outline'
                                }
                                size={20}
                                color="grey"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} disabled={isLoading} onPress={() => this.checkValidation(userID)}
                        style={{ width: 180, height: 45,  backgroundColor: color.secondaryColor, borderRadius: 20, marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                        {isLoading ? <ActivityIndicator color={'white'} /> :
                            <Text style={{ color: color.primaryColor, fontSize: 16, fontWeight: 'bold' }}>Update Password</Text>
                        }
                    </TouchableOpacity>
                </View>
            </Modal >
        )
    }
}
const styles = StyleSheet.create({
    textbox3: {
        width: '80%',
        height: 48,
        borderRadius: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 10,
        flexDirection: 'row',
    },
    EyeIcon: {
        paddingEnd: 20,
    },
})