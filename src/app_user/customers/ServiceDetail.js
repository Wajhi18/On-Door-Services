import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import Header from '../../reusable/Header'
import { color } from '../../helpers/color/Color_Constant';
import Review from '../../reusable/customer/Review';
import { navigate } from '../../helpers/color/navigate'
import firestore from '@react-native-firebase/firestore';
import alertFunction from '../../helpers/HelperFunction/AlertFunction';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';

export default class ServiceDetail extends Component {
  state = {
    reviewList: [],
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
            alertFunction.Alert('Service not found')
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
    const reviewsData = []
    firestore()
      .collection('Users').doc(id).collection('reviews')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log('\n\n\nUser ID: ', documentSnapshot.id, '\n\nService Data: ', documentSnapshot.data())
          if (querySnapshot.size == 0) {
            alertFunction.Alert('Service not found')
            console.log('if: ', querySnapshot.size)
            return
          } else {
            reviewsData.push({ ...documentSnapshot.data(), key: documentSnapshot.id })
            this.setState({ reviewList: reviewsData })
            console.log('aa======', this.state.reviewList)
          }
        })
      }).catch(err =>
        alertFunction.Alert('Error in firebase')
      )
  }

  render() {
    const item = this.props.route.params.item
    const { reviewList } = this.state
    return (
      <View style={{ ...styles.container }}>
        <Header
          title={'Details'}
          leadingIcon='arrow-back'
          leadingButton={() => this.props.navigation.goBack()}
          trailingButton={() => alert('Notification')}
        />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ height: 5 }} />
          <ImageBackground
            source={item.service_imiage != '' ? item.service_imiage : require('../../assets/icons/1.png')}
            resizeMode='contain'
            style={{ width: '100%', height: 200 }}
          >
          </ImageBackground>

          <View style={{ margin: 14 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: color.tertiaryColor }}>{item.full_name}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey' }}>{item.service_name}</Text>
          </View>

          {/* description */}
          <View style={{ marginHorizontal: 14, marginVertical: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: 'normal', color: color.tertiaryColor, textAlign: 'justify' }}>{item.description}</Text>
          </View>

          {/* job price rating */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 14, marginVertical: 10 }}>
            <View>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey' }}>Jobs</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>50</Text>
            </View>

            <View>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey' }}>Price</Text>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>{item.price}</Text>
            </View>

            <View>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey' }}>Rating</Text>
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>{item.rating}</Text>
            </View>
          </View>

          <View style={{ marginVertical: 10, marginHorizontal: 14 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Reviews</Text>
          </View>
          {!reviewList.length ? <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View> :
            <>
              {
                reviewList.map((item, index) => {
                  return <View key={index}><Review item={item} index={index} /></View>
                })
              }

              <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate(navigate.ReviewPage)}
                style={{ padding: 5, width: '80%', borderRadius: 10, marginBottom: 80, marginTop: 20, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white', elevation: 5, borderWidth: 1, borderColor: 'lightgrey' }}>
                <Text style={{ fontSize: 16, color: color.secondaryColor }}>View all reviews</Text>
              </TouchableOpacity>
            </>
          }

          <View style={{ flexDirection: 'column', position: 'absolute', zIndex: 1, top: 20, right: 20 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => { }}
              style={{ width: 40, height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', elevation: 5 }}>
              <Feather name='phone-call' size={20} />
            </TouchableOpacity>
            <View style={{ height: 10 }} />
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate(navigate.CustomerMessages, {
              item: item
            })}
              style={{ width: 40, height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', elevation: 5 }}>
              <Ionicons name='ios-chatbubble-ellipses-outline' size={25} />
            </TouchableOpacity>
            <View style={{ height: 10 }} />
            <TouchableOpacity activeOpacity={0.7} style={{ width: 40, height: 40, borderRadius: 100, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', elevation: 5 }}>
              <Ionicons name='location' size={20} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate(navigate.SelectAppointment, {
          item: item,
        })}
          style={{ padding: 5, width: '80%', borderRadius: 10, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: color.secondaryColor, elevation: 5, position: 'absolute', zIndex: 1, bottom: 10 }}>
          <Text style={{ fontSize: 16, color: 'white' }}>Book Now</Text>
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