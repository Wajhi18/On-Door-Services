import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { color } from '../helpers/color/Color_Constant'
import { navigate } from '../helpers/color/navigate'

export default class Preference extends Component {
    render() {
        
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flex: 1, flexGrow: 1 }}>
                    <View style={{ flex: 0.2, width: '100%', backgroundColor: color.secondaryColor, justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 18, color: color.primaryColor, fontWeight: 'bold' }}>On-Door Services</Text>
                    </View>

                    <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: 'white', width: '100%', flex: 0.8, alignItems: 'center' }}>
                        <View style={{ alignItems: 'center', marginVertical: '20%', }}>
                            <Text style={[styles.text, { fontWeight: "bold", color: color.secondaryColor, marginBottom: 20 }]}>Welocome</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.Login_Screen, {
                            user: 'customer',
                            marginTop: 150,
                        })}
                            style={styles.preference}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.textStyle, { color: color.primaryColor, fontSize: 22 }]}>Customer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.Login_Screen, {
                                user: 'provider'
                            })}
                            style={styles.preference}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.textStyle, { color: color.primaryColor, fontSize: 22 }]}>Provider</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.secondaryColor,
    },
    text: {
        fontSize: 20,
        color: color.tertiaryColor,
    },
    preference: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: color.secondaryColor,
        padding: 15,
        marginVertical: 20,
        marginHorizontal: 20,
    }
})