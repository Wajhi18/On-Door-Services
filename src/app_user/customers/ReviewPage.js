import { Text, View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import { color } from '../../helpers/color/Color_Constant'
import Review from '../../reusable/customer/Review'
import Header from '../../reusable/Header'
import firestore from '@react-native-firebase/firestore';
import alertFunction from '../../helpers/HelperFunction/AlertFunction'

export default class ReviewPage extends Component {
    state = {
        reviewsList: []
    }

    componentDidMount() {
        this.getProviderByRole()
    }

    getProviderByRole = (user) => {
        firestore()
            .collection('Users').where('role', '==', 'provider')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, '\n\n', documentSnapshot.data().role)

                    if (querySnapshot.size == 0) {
                        alertFunction.Alert('Reviews not found')
                        console.log('if: ', querySnapshot.size)
                    } else {

                        if (documentSnapshot.data().role == 'provider') {
                            this.getReviews(documentSnapshot.id)
                        }
                        else {
                            alertFunction.Alert('You are registerd as a customer please login as a customer')
                        }
                    }
                })
            }).catch(err =>
                alertFunction.Alert('Error in firebase')
            )
    }

    getReviews = (id) => {
        const reviewData = []
        firestore()
            .collection('Users').doc(id).collection('reviews')
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
                    trailingButton={() => alert('Notification')}
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