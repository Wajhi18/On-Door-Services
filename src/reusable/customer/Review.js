import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { color } from '../../helpers/color/Color_Constant'
import { Rating, AirbnbRating } from 'react-native-ratings';

export default class Review extends Component {
    render() {
        const { item, index } = this.props
        return (
            <View key={index}
                style={{ flexDirection: 'row', padding: 10, backgroundColor: color.primaryColor, marginHorizontal: 14, marginVertical: 10, borderRadius: 10, elevation: 5, flexWrap: 'wrap', borderWidth: 1, borderColor: 'lightgrey' }}>
                <View style={{ width: 60, height: 60, borderRadius: 100, flexDirection: 'column', elevation: 5 }}>
                    <Image
                        source={require('../../assets/icons/1.png')}
                        style={{ width: 60, height: 60, borderRadius: 100, resizeMode: 'cover' }}
                    >
                    </Image>
                </View>
                <View style={{ flexDirection: 'column', paddingLeft: 10, flex: 1, }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '65%' }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: color.tertiaryColor }}>{item.customer_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                            <Rating
                            isDisabled={true}
                                type='star'
                                ratingCount={5}
                                imageSize={15}
                                showRating={false}
                                // onFinishRating={this.ratingCompleted}
                            />
                            {/* <Text style={{ fontSize: 15, color: 'yellow' }}>{item.star}</Text> */}
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1, marginTop: 10 }}>
                        <Text style={{ fontSize: 14, color: color.tertiaryColor }}>{item.comment}</Text>
                    </View>
                </View>
            </View>
        )
    }
}