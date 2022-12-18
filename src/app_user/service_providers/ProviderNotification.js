//import liraries
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { color } from '../../helpers/color/Color_Constant';
import { navigate } from '../../helpers/color/navigate';
import { text } from '../../helpers/color/Text_Constant';
import Header from '../../reusable/Header';

// create a component
class ProviderNotification extends Component {
    render() {
        return (
            <SafeAreaProvider>
                <View style={styles.container}>
                    <Header
                        title={'Notification'}
                        leadingIcon='arrow-back'
                        leadingButton={() => this.props.navigation.goBack()}
                        trailingButton={() => {}}
                    />
                    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}>
                        <View
                            style={{ flexDirection: 'row', padding: 10, backgroundColor: color.primaryColor, marginHorizontal: 10, borderRadius: 10, elevation: 5, flexWrap: 'wrap' }}>
                            <View style={{ width: 50, height: 50, flexDirection: 'column', marginRight: 5, borderRadius: 100 }}>
                                <Image
                                    source={require('../../assets/icons/1.png')}
                                    resizeMode='cover'
                                    style={{ borderRadius: 100, width: "100%", height: '100%' }}
                                // >
                                />
                            </View>
                            <View style={{ flexDirection: 'column', paddingRight: 3, flex: 1}}>
                                <Text style={{ fontSize: 14, color: color.tertiaryColor }}>Here you will receive new notification</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end', width: 70 }}>
                                <Text style={{ fontSize: 12, color: 'blue' }}>5 min ago</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaProvider>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primaryColor,
    },
});

//make this component available to the app
export default ProviderNotification;