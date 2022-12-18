import { Text, View, TouchableOpacity, Image, FlatList, ScrollView, StyleSheet, ActivityIndicator, ImageBackground, RefreshControl } from 'react-native'
import React, { PureComponent } from 'react'
import Header from '../../reusable/Header'
import firestore from '@react-native-firebase/firestore';
import { color } from '../../helpers/color/Color_Constant';
import alertFunction from '../../helpers/HelperFunction/AlertFunction';
import { navigate } from '../../helpers/color/navigate';

const newServices = []

export default class ServicesByCategory extends PureComponent {
  state = {
    services: [],
    isLoading: true,
    refresh: false,
  }

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', () => {
      this.setState({services: []})
      // The screen is focused
      // Call any action
      this.getProviderByRole()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;  
  }

  getProviderByRole = () => {
    this.setState({ isLoading: true, services: [] })
    firestore()
      .collection('Users').where('role', '==', 'provider')
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size == 0) {
          console.log('if: ', querySnapshot.size)
          setTimeout(()=> {
            this.setState({ isLoading: false })
          }, 2000)
        } else {
          querySnapshot.forEach(documentSnapshot => {
            // console.log('User ID: ', documentSnapshot.id, '\n\n', documentSnapshot.data().role)
            console.log('documentSnapshot.id: ', documentSnapshot.id)
            this.getServices(documentSnapshot.id)
          })
        }

      }).catch(err => {
        alertFunction.Alert('Error in firebase')
        setTimeout(()=> {
          this.setState({ isLoading: false })
        }, 2000)
      })
  }

  getServices = (id) => {
    console.log('service provider id: ', id)
    // this.state.services = []
    const serviceData = []
    firestore()
      .collection('Users').doc(id).collection('services').where('service_name', '==', this.props.route.params.category)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size == 0) {
          console.log('querySnapshot size: ', querySnapshot.size)
        } else {
          querySnapshot.forEach(documentSnapshot => {
            // console.log('\n\n\nUser ID: ', documentSnapshot.id, '\n\nService Data: ', documentSnapshot.data())
            console.log('\n\n\n\nSnapshot size: ', querySnapshot.size)
            this.state.services.push({ ...documentSnapshot.data(), service_id: documentSnapshot.id })

            // this.setState({ services: serviceData })
            // console.log('aa======', this.state.services)
          })
        }
      }).catch(err => {
        alertFunction.Alert('Something went wrong')
      })
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 2000)
  }

  onRefresh = () => {
    this.setState({ refresh: true })
    this.getProviderByRole()
    this.setState({ refresh: false })
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.ServiceDetail, {
        item: item
      })}
        activeOpacity={0.9}
        style={{ flexDirection: 'row', padding: 10, backgroundColor: color.primaryColor, marginHorizontal: 10, marginVertical: 10, borderRadius: 10, elevation: 5, flexWrap: 'wrap' }}>
        <View style={{ width: 100, height: 100, borderRadius: 10, flexDirection: 'column' }}>
          <Image
            source={item.service_imiage != '' ? item.service_imiage : require('../../assets/icons/1.png')}
            style={{ width: 100, height: 100, borderRadius: 10, resizeMode: 'cover' }}
          >
          </Image>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 10, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: color.tertiaryColor }}>{item.full_name}</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'grey' }}>{item.service_name}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    const { services, isLoading } = this.state
    const category = this.props.route.params.category
    // console.log('state data: ', JSON.stringify(services))
    return (
      <View style={{ ...styles.container }}>
        <Header
          title={'Services'}
          leadingIcon='arrow-back'
          leadingButton={() => this.props.navigation.goBack()}
          trailingButton={() => alert('Notification')}
        />
        {isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View>
          : <>
            {services.length ?
              <FlatList
                data={services}
                refreshControl={
                  <RefreshControl refreshing={this.state.refresh} onRefresh={this.onRefresh} />
                }
                keyExtractor={(item, index) => index}
                renderItem={this.renderItem}
              />
              :
              <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={{ marginHorizontal: 25, marginTop: 10, alignItems: 'center', justifyContent: 'center', elevation: 5, paddingVertical: 30, backgroundColor: '#fff' }}>
                  <Text style={{ fontSize: 30, fontWeight: 'normal' }}>Nothing to Show</Text>
                </View>
              </View>
            }
          </>
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