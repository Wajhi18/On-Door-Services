import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator, Linking } from 'react-native'
import React, { Component } from 'react'
import Header from '../../reusable/Header'
import { color } from '../../helpers/color/Color_Constant';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import { navigate } from '../../helpers/color/navigate';
import { text } from '../../helpers/color/Text_Constant';

export default class ProviderOrderDetails extends Component {
    customView = (title, subTitle) => {
        return (
            <View style={{ marginTop: 20, marginHorizontal: 14, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                <Text style={{ fontSize: 16, color: color.tertiaryColor, fontWeight: 'bold' }}>{title}</Text>
                <View style={{ height: 5 }} />
                <Text style={{ fontSize: 14, color: color.tertiaryColor }}>{subTitle}</Text>
                <View style={{ height: 5 }} />
            </View>
        )
    }
    render() {
        const item = this.props.route.params.item
        console.log(JSON.stringify(item))
        return (
            <View style={{ ...styles.container }}>
                <Header
                    title={'Order Details'}
                    leadingIcon='arrow-back'
                    leadingButton={() => this.props.navigation.goBack()}
                    trailingButton={() => this.props.navigation.navigate(navigate.ProviderNotification)}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ marginBottom: 70 }}>
                        <View style={{ height: 15 }} />
                        <View style={{ width: 100, height: 100, borderRadius: 100, alignSelf: 'center', flexDirection: 'column' }}>
                            <Image
                                source={require('../../assets/icons/1.png')}
                                style={{ width: 100, height: 100, borderRadius: 100, resizeMode: 'cover' }}
                            >
                            </Image>
                        </View>
                        <View style={{ height: 50 }} />

                        {this.customView('Customer Name', item.customer_name)}
                        {this.customView('Address', item.customer_address)}
                        {this.customView('Booking For', item.booking_type)}
                        {this.customView('Date', item.booking_date)}
                        {this.customView('Time', item.booking_time)}
                    </View>


                </ScrollView>

                <View style={{ flexDirection: 'column', position: 'absolute', zIndex: 1, top: 80, right: 20 }}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => Linking.openURL(`tel:${item.customer_phone}`)}
                        style={{ width: 40, height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', elevation: 5 }}>
                        <Feather name='phone-call' size={20} />
                    </TouchableOpacity>
                    <View style={{ height: 10 }} />
                    {/* {item.status == text.accepted && */}
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {this.props.navigation.navigate(navigate.ProviderMessage, {
                            customer_id: item.customer_id,
                            customer_service_id: item.customer_service_id
                        })}}
                            style={{ width: 40, height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', elevation: 5 }}>
                            <Ionicons name='ios-chatbubble-ellipses-outline' size={25} />
                        </TouchableOpacity>
                    {/* } */}
                    <View style={{ height: 10 }} />
                    {/* {item.status == text.onTheWay &&
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.ProviderMapViewComponent)} activeOpacity={0.7} style={{ width: 40, height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', elevation: 5 }}>
                            <Ionicons name='location' size={20} />
                        </TouchableOpacity>
                    } */}
                </View>

                <TouchableOpacity activeOpacity={0.7} style={{ padding: 5, width: '80%', borderRadius: 10, marginHorizontal: 40, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: color.secondaryColor, elevation: 5, position: 'absolute', zIndex: 1, bottom: 10 }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Mark as complete</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primaryDimColor
    }
})