import { Text, View, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator, Linking } from 'react-native'
import React, { Component } from 'react'

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import { color } from '../../helpers/color/Color_Constant';
import CustomButton from '../../reusable/CustomButton';
import { text } from '../../helpers/color/Text_Constant';
import Header from '../../reusable/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigate } from '../../helpers/color/navigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import alertFunction from '../../helpers/HelperFunction/AlertFunction';

const serviceStatus = [
  { status: text.received },
  { status: text.accepted },
  { status: text.rejected },
  { status: text.onTheWay },
  { status: text.inProgress },
  { status: text.completed },
]

export default class ProviderDashboard extends Component {

  state = {
    isLoading: true,
    status: 'Pending',
    receivedList: [],
    acceptedList: [],
    rejectedList: [],
    onTheWayList: [],
    inProgressList: [],
    completedList: [],
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ]
  }

  async componentDidMount() {
    // const unsubscribe = this.props.navigation.addListener('focus', () => {
    //   // The screen is focused
    //   // Call any action
    //   const userToken = await AsyncStorage.getItem('@userToken')
    //   const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
    //   const customer_name = userData.first_name + ' ' + userData.last_name
    //   this.getServiceByStatus('Pending')
    // });
    // // Return the function to unsubscribe from the event so it gets removed on unmount
    // return unsubscribe;
    const userToken = await AsyncStorage.getItem('@userToken')
    const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
    const customer_name = userData.first_name + ' ' + userData.last_name
    this.getServiceByStatus('Pending')
  }

  getServiceByStatus = async (status) => {
    if (!this.state.isLoading) {
      this.setState({ isLoading: true })
    }
    const userToken = await AsyncStorage.getItem('@userToken')
    const ordersData = []
    firestore()
      .collection('Users').doc(userToken).collection('my_orders').where('status', '==', status)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, '\n\n', documentSnapshot.data().role)

          if (querySnapshot.size == 0) {
            alertFunction.Alert('Service not found')
            console.log('if: ', querySnapshot.size)
          } else {
            ordersData.push({ ...documentSnapshot.data(), order_id: documentSnapshot.id })
            if (status == text.received) {
              this.setState({ receivedList: ordersData })
              console.log('aa======', this.state.receivedList)
            }
            else if (status == text.accepted) {
              this.setState({ acceptedList: ordersData })
              console.log('aa======', this.state.acceptedList)
            }
            else if (status == text.rejected) {
              this.setState({ rejectedList: ordersData })
              console.log('aa======', this.state.rejectedList)
            }
            else if (status == text.onTheWay) {
              this.setState({ onTheWayList: ordersData })
              console.log('aa======', this.state.onTheWayList)
            }
            else if (status == text.inProgress) {
              this.setState({ inProgressList: ordersData })
              console.log('aa======', this.state.inProgressList)
            }
            else if (status == text.completed) {
              this.setState({ completedList: ordersData })
              console.log('aa======', this.state.completedList)
            }
            else {
              // this.setState({ isLoading: false })
            }
          }
        })
      }).catch(err => {
        alertFunction.Alert(JSON.stringify(err))
      })
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 2000)
  }

  updateOrderByStatus = async (item, status) => {
    const userToken = await AsyncStorage.getItem('@userToken')
    firestore()
      .collection('Users').doc(userToken).collection('my_orders').doc(item.order_id)
      .update({
        status: status
      })
      .then(querySnapshot => {
        this.updateOrderFromCustomerSide(item, status)
      }).catch(err =>
        alertFunction.Alert('Something went wrong')
      )
  }

  updateOrderFromCustomerSide = async (item, status) => {
    const userToken = await AsyncStorage.getItem('@userToken')
    firestore()
      .collection('Users').doc(item.customer_id).collection('my_orders').doc(item.customer_service_id)
      .update({
        status: status
      })
      .then(querySnapshot => {
        alertFunction.Alert('Order Updated')
      }).catch(err =>
        alertFunction.Alert('Something went wrong')
      )
  }

  statistics = (num, text1, text2) => {
    return (
      <View style={{ width: '30%', height: 120, padding: 10, backgroundColor: 'white', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: 10, elevation: 5 }}>
        <Text style={{ color: color.secondaryColor, fontSize: 16, fontWeight: '900' }}>{num}</Text>
        <Text style={{}}>{text1}</Text>
        <Text style={{}}>{text2}</Text>
      </View>
    )
  }

  render() {
    const { status, index, route, receivedList, acceptedList, rejectedList, onTheWayList, inProgressList, completedList, isLoading } = this.state;
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            title={'Rahim Yar Khan'}
            leadingIcon='location'
            leadingButton={() => this.props.navigation.goBack()}
            trailingButton={() => this.props.navigation.navigate(navigate.ProviderNotification)}
          />
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}>

            <View style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 14 }}>
              {this.statistics(10000, 'Total', 'Earning')}
              {this.statistics(14, 'Total', 'Bookings')}
              {this.statistics(5, 'Total', 'Services')}
            </View>
            <View style={{ marginTop: 10 }}>
              <FlatList
                horizontal
                marginVertical={10}
                showsHorizontalScrollIndicator={false}
                data={serviceStatus}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) =>
                  <View style={{ marginLeft: index == 0 ? 14 : 5, marginRight: index == serviceStatus.length - 1 ? 14 : 5, marginBottom: 5, }}>
                    <CustomButton
                      text={item.status}
                      bgColor={status == item.status ? color.secondaryColor : color.primaryColor}
                      textColor={status == item.status ? color.primaryColor : color.secondaryColor}
                      paddingHorizontal={12}
                      paddingVertical={8}
                      borderRadius={100}
                      elevation={5}
                      onPress={() => {
                        this.setState({ status: item.status })
                        this.getServiceByStatus(item.status)
                      }}
                    />
                  </View>
                }
              />
            </View>

            {status == text.received &&
              <>
                {isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View>
                  :
                  <>
                    {receivedList.length ?
                      receivedList.map((item, index) => {
                        return <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.ProviderOrderDetails, {
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

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                              <CustomButton
                                text='Accept'
                                bgColor={color.secondaryColor}
                                textColor={color.primaryColor}
                                paddingHorizontal={10}
                                paddingVertical={6}
                                borderRadius={5}
                                onPress={() => this.updateOrderByStatus(item, text.accepted)}
                              />
                              <CustomButton
                                text='Reject'
                                bgColor={'red'}
                                textColor={color.primaryColor}
                                paddingHorizontal={10}
                                paddingVertical={6}
                                borderRadius={5}
                                onPress={() => { this.updateOrderByStatus(item, text.rejected) }}
                              />
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


              </>
            }

            {status == text.accepted &&
              <>
                {isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View>
                  :
                  <>
                    {acceptedList.length ?
                      acceptedList.map((item, index) => {
                        return <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.ProviderOrderDetails, {
                          item: item
                        })}
                          activeOpacity={0.9}
                          style={{ flexDirection: 'row', padding: 10, backgroundColor: color.primaryColor, marginHorizontal: 10, marginVertical: 10, borderRadius: 10, elevation: 5, flexWrap: 'wrap' }}>
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

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                              <CustomButton
                                text={'Mark ' + text.onTheWay}
                                bgColor={color.secondaryColor}
                                textColor={color.primaryColor}
                                paddingHorizontal={10}
                                paddingVertical={6}
                                borderRadius={5}
                                onPress={() => this.updateOrderByStatus(item, text.onTheWay)}
                              />

                              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
                                <TouchableOpacity onPress={() => { }}
                                  style={{ padding: 5, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                  <Feather name='phone-call' size={20} />

                                </TouchableOpacity> 
                                <TouchableOpacity onPress={() => {this.props.navigation.navigate }}
                                  style={{ padding: 5, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                  <Ionicons name='ios-chatbubble-ellipses-outline' size={25} />
                                </TouchableOpacity>
                              </View> */}
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


              </>
            }

            {status == text.rejected &&
              <>
                {isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View>
                  :
                  <>
                    {rejectedList.length ?
                      rejectedList.map((item, index) => {
                        return <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.ProviderOrderDetails, {
                          item: item
                        })}
                          activeOpacity={0.9}
                          style={{ flexDirection: 'row', padding: 10, backgroundColor: color.primaryColor, marginHorizontal: 10, marginVertical: 10, borderRadius: 10, elevation: 5, flexWrap: 'wrap' }}>
                          <View style={{ width: 80, flexDirection: 'column' }}>
                            <ImageBackground
                              source={require('../../assets/icons/1.png')}
                              resizeMode='contain'
                              style={{ width: 80, height: 80, borderRadius: 10 }}
                            >
                            </ImageBackground>
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


              </>
            }

            {status == text.onTheWay &&
              <>
                {isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View>
                  :
                  <>
                    {onTheWayList.length ?
                      onTheWayList.map((item, index) => {
                        return <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.ProviderOrderDetails, {
                          item: item
                        })}
                          activeOpacity={0.9}
                          style={{ flexDirection: 'row', padding: 10, backgroundColor: color.primaryColor, marginHorizontal: 10, marginVertical: 10, borderRadius: 10, elevation: 5, flexWrap: 'wrap' }}>
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

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                              <CustomButton
                                text={'Mark ' + text.inProgress}
                                bgColor={color.secondaryColor}
                                textColor={color.primaryColor}
                                paddingHorizontal={10}
                                paddingVertical={6}
                                borderRadius={5}
                                onPress={() => { this.updateOrderByStatus(item, text.inProgress) }}
                              />

                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
                                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.customer_phone}`) }}
                                  style={{ padding: 5, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                  <Feather name='phone-call' size={20} />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                  this.props.navigation.navigate(navigate.ProviderMessage, {
                                    customer_id: item.customer_id,
                                    customer_service_id: item.customer_service_id,
                                  })
                                }}
                                  style={{ padding: 5, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                  <Ionicons name='ios-chatbubble-ellipses-outline' size={25} />
                                </TouchableOpacity>
                              </View>
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
              </>
            }

            {status == text.inProgress &&
              <>
                {isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View>
                  :
                  <>
                    {inProgressList.length ?
                      inProgressList.map((item, index) => {
                        return <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.ProviderOrderDetails, {
                          item: item
                        })}
                          activeOpacity={0.9}
                          style={{ flexDirection: 'row', padding: 10, backgroundColor: color.primaryColor, marginHorizontal: 10, marginVertical: 10, borderRadius: 10, elevation: 5, flexWrap: 'wrap' }}>
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

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                              <CustomButton
                                text={'Mark ' + text.completed}
                                bgColor={color.secondaryColor}
                                textColor={color.primaryColor}
                                paddingHorizontal={10}
                                paddingVertical={6}
                                borderRadius={5}
                                onPress={() => { this.updateOrderByStatus(item, text.completed) }}
                              />

                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 60 }}>
                                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.customer_phone}`) }}
                                  style={{ padding: 5, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                  <Feather name='phone-call' size={20} />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                  this.props.navigation.navigate(navigate.ProviderMessage, {
                                    customer_id: item.customer_id,
                                    customer_service_id: item.customer_service_id,
                                  })
                                }}
                                  style={{ padding: 5, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                  <Ionicons name='ios-chatbubble-ellipses-outline' size={25} />
                                </TouchableOpacity>
                              </View>
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


              </>
            }

            {status == text.completed &&
              <>
                {isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View>
                  :
                  <>
                    {completedList.length ?
                      completedList.map((item, index) => {
                        return <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.ProviderOrderDetails, {
                          item: item
                        })}
                          activeOpacity={0.9}
                          style={{ flexDirection: 'row', padding: 10, backgroundColor: color.primaryColor, marginHorizontal: 10, marginVertical: 10, borderRadius: 10, elevation: 5, flexWrap: 'wrap' }}>
                          <View style={{ width: 80, flexDirection: 'column' }}>
                            <ImageBackground
                              source={require('../../assets/icons/1.png')}
                              resizeMode='contain'
                              style={{ width: 80, height: 80, borderRadius: 10 }}
                            >
                            </ImageBackground>
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


              </>
            }

          </ScrollView>
        </View>
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryDimColor,
  },
  text: {
    fontSize: 20,
    color: color.tertiaryColor,
  },
  preference: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: color.secondaryColor,
    padding: 10,
    marginVertical: 20
  }
})