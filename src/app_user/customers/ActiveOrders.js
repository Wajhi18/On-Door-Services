import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator, useWindowDimensions, RefreshControl } from 'react-native'
import React, { PureComponent } from 'react'
import Header from '../../reusable/Header'
import { color } from '../../helpers/color/Color_Constant';
import Review from '../../reusable/customer/Review';
import { navigate } from '../../helpers/color/navigate'
import firestore from '@react-native-firebase/firestore';
import alertFunction from '../../helpers/HelperFunction/AlertFunction';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ActiveOrders extends PureComponent {
  state = {
    ordersList: [],
    isLoading: true,
    refresh: false
  }

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      this.getOrders()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;    
  }

  getOrders = async() => {
    this.setState({isLoading: true, ordersList: []})
    const userToken = await AsyncStorage.getItem('@userToken')
    console.log('service provider id: ', userToken)
    const serviceData = []
    firestore()
      .collection('Users').doc(userToken).collection('my_orders').where('status', '==', 'Accepted')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size == 0) {
          setTimeout(() => {
            this.setState({ isLoading: false })
          }, 2000)
          console.log('querySnapshot size: ', querySnapshot.size)
        } else {
          querySnapshot.forEach(documentSnapshot => {
            // console.log('\n\n\nUser ID: ', documentSnapshot.id, '\n\nService Data: ', documentSnapshot.data())
            console.log('\n\n\n\nSnapshot size: ', querySnapshot.size)
            this.state.ordersList.push({ ...documentSnapshot.data(), customer_service_id: documentSnapshot.id })
            
            // this.setState({ services: serviceData })
            // console.log('aa======', this.state.services)
          })
          setTimeout(() => {
            this.setState({ isLoading: false })
          }, 2000)
        }
      }).catch(err => {
        alertFunction.Alert('Something went wrong')
        setTimeout(() => {
          this.setState({ isLoading: false })
        }, 2000)
      })
  }

  onRefresh = () => {
    this.setState({ refresh: true })
    this.getOrders()
    this.setState({ refresh: false })
  }

  render() {

    const { ordersList, isLoading } = this.state
    return (
      <View style={{ ...styles.container }}>
        <Header
          title={'Active Orders'}
          leadingIcon='arrow-back'
          leadingButton={() => this.props.navigation.goBack()}
          trailingButton={() => alert('Notification')}
        />


        <ScrollView contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={this.state.refresh} onRefresh={this.onRefresh} />
          }
        >
          {isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View>
            :
            <>
              {ordersList.length ?
                ordersList.map((item, index) => {
                  return <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.CustomerOrderDetails, {
                    item: item
                  })}
                    activeOpacity={0.9}
                    style={{ flexDirection: 'row', padding: 10, backgroundColor: color.primaryColor, marginHorizontal: 14, marginVertical: 10, borderRadius: 10, elevation: 5, flexWrap: 'wrap' }}>
                    <View style={{ width: 80, flexDirection: 'column' }}>
                      <ImageBackground
                        source={require('../../assets/icons/1.png')}
                        resizeMode='contain'
                        style={{ width: 80, height: 80, borderRadius: 10 }}
                      >
                      </ImageBackground>
                      <View style={{ backgroundColor: color.primaryColor, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <Text style={{ color: color.tertiaryColor, fontSize: 13 }}>{item.booking_time}</Text>
                        <Text style={{ color: color.tertiaryColor, fontSize: 13 }}>{item.booking_date}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'column', paddingLeft: 10, flex: 1, }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '65%' }}>
                          <Text style={{ fontSize: 14, fontWeight: 'bold', color: color.tertiaryColor }}>{item.customer_name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 9, color: 'red' }}>Status </Text>
                          <Text style={{ fontSize: 9, color: 'grey' }}>{item.status}</Text>
                        </View>
                      </View>
                      <Text style={{ fontSize: 12, color: color.tertiaryColor }}>{item.booking_type}</Text>


                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ fontSize: 12, color: color.tertiaryColor }}>Price</Text>
                        <Text style={{ fontSize: 12, color: color.tertiaryColor }}>{item.price}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                })
                :
                <View style={{ marginHorizontal: 25, marginTop: 10, alignItems: 'center', justifyContent: 'center', elevation: 5, paddingVertical: 30, backgroundColor: '#fff' }}>
                  <Text style={{ fontSize: 30, fontWeight: 'normal' }}>Nothing to Show</Text>
                </View>
              }
            </>
          }


        </ScrollView>
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