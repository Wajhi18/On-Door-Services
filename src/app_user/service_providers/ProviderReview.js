import { Text, View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { color } from '../../helpers/color/Color_Constant'
import Review from '../../reusable/customer/Review'
import Header from '../../reusable/Header'
import firestore from '@react-native-firebase/firestore';
import alertFunction from '../../helpers/HelperFunction/AlertFunction'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../../helpers/color/navigate'

export default class ProviderReview extends Component {
    state = {
        reviewsList: []
    }

    componentDidMount() {
        this.getReviews()
    }

    getReviews = async() => {
        const userToken = await AsyncStorage.getItem('@userToken')
        const reviewData = []
        firestore()
            .collection('Users').doc(userToken).collection('reviews')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log('\n\n\nUser ID: ', documentSnapshot.id, '\n\nService Data: ', documentSnapshot.data())
                    if (querySnapshot.size == 0) {
                        alertFunction.Alert('Reviews not found')
                        console.log('if: ', querySnapshot.size)
                        return
                    } else {
                        reviewData.push({ ...documentSnapshot.data(), key: documentSnapshot.id })
                        this.setState({ reviewsList: reviewData })
                        console.log('aa======', this.state.reviewsList)
                    }
                })
            }).catch(err =>
                alertFunction.Alert('Error in firebase')
            )
    }


    renderItem = ({ item, index }) => {
        return <Review item={item} />
    }
    render() {
        const {reviewsList} = this.state
        return (
            <View style={{ ...styles.container }}>
                <Header
                    title={'Reviews'}
                    leadingIcon='arrow-back'
                    leadingButton={() => this.props.navigation.goBack()}
                    trailingButton={() =>this.props.navigation.navigate(navigate.ProviderNotification)}
                />
                {!reviewsList.length ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View>
                    :
                    <FlatList
                        data={reviewsList}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderItem}
                    />
                }
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