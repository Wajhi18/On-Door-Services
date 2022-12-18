import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  Keyboard,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import MyButton from '../extras/MyButton';
import {Product_Details_Screen, GetStarted_Screen, Update_Password} from '../extras/styles';
import LogoHeader from '../extras/LogoHeader';
import * as Animatable from 'react-native-animatable';
import {SkypeIndicator, UIActivityIndicator} from 'react-native-indicators';
import AddAddressModel from '../modals/AddAddressModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Divider} from 'react-native-paper';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';
class ContactInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      height: new Animated.Value(60),
      opacity: new Animated.Value(1),
      checkoutID: '',
      showIndex: false,
      addresses: [],
      itemSelected: '',
      selectedAddress: '',
      checkoutDetail:null,
    };
  }
  componentDidMount() {
    // this.ShowAddresses();
    // this.GetCheckout();
    // this.clear = this.props.navigation.addListener('focus', async () => {
    //   // this.ShowAddresses();
    // });
  }
  componentWillUnmount() {
    clearInterval(this.clear);
  }

  render() {
    const {isVisible, setVisible} = this.props;
    return (
      <Animatable.View
        animation={'fadeIn'}
        duration={1000}
        >
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/* {this.state.checkoutDetail ? (
            <CheckOutScreen
              onRef={ref => (this.child = ref)}
              checkoutDetail={this.state.checkoutDetail && this.state.checkoutDetail}
              navigation={this.props.navigation}
              openModel={() => this.showAddressRef.open()}
            />
          ) : (
            <View
              style={{
                marginHorizontal: 10,
                elevation: 1,
                marginTop: 20,
                justifyContent: 'center',
                backgroundColor: '#f8f8f8',
                borderWidth: 0.15,
              }}>
              <View
                style={{
                  backgroundColor: '#f4f4f4',
                  elevation: 0.4,
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  DELIVERY_ADDRESS
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 20,
                }}>
                <Text style={{maxWidth: 150}}>
                  DELIVERY_MSG
                </Text>
                <TouchableOpacity
                  onPress={() => this.showAddressRef.open()}
                  style={{
                    backgroundColor: 'rgba(135,206,250,0.35)',
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    elevation: 1,
                    borderRadius: 3,
                  }}>
                  <Text>ADD_ADDRESS</Text>
                </TouchableOpacity>
              </View>
            </View>
          )} */}

          <AddAddressModel
            ref={ref => (this.addAddressRef = ref)}
            itemscheckout={newAddress => alert('Get checkout method called')}
          />
          <Modal
            style={{...styleSheet.modalBG,height:410, backgroundColor: 'white'}}
            isOpen={isVisible}
            backButtonClose={()=> setVisible(false)}
            backdropPressToClose={()=> setVisible(false)}
            swipeToClose={false}
            coverScreen={true}
            ref={ref => (this.showAddressRef = ref)}
            backdrop={true}
            position="bottom"
            backdropOpacity={0.3}>
            <View
              style={{
                paddingVertical: 15,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#000',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                Choose Delivery Address
              </Text>
            </View>
            <Divider style={{width: '100%', height: 2, marginTop: 5}} />
            {this.state.isLoading && (
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  top: '40%',
                }}>
                <UIActivityIndicator size={32} color={'black'} />
              </View>
            )}
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              {this.state.addresses
                ? this.state.addresses.map((item, index) => {
                    return (
                      <View key={index}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 5,
                          }}>
                          <View style={{flexDirection:'row',alignItems:'center',}}>
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={() => this.selectAddress(item, index)}
                              style={{
                                height: 35,
                                width: 35,
                                marginTop: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 17,
                                borderWidth: 0.3,
                              }}>
                              {this.state.itemSelected == index &&
                                this.state.showIndex && (
                                  <Icon
                                    name={'check-circle'}
                                    size={35}
                                    color='green'
                                  />
                                )}
                            </TouchableOpacity>
                            <View style={{paddingBottom: 15, marginTop: 10,marginStart:15}}>
                              <Text style={{fontWeight: 'bold', fontSize: 14}}>
                                {item.city}
                              </Text>
                              <Text>
                                {item.address1} {item.address2}
                              </Text>
                              <Text>{item.country}</Text>
                              <Text>{item.phone}</Text>
                            </View>
                          </View>

                          <TouchableOpacity activeOpacity={0.7}
                            style={{paddingHorizontal: 15, paddingVertical: 15}}
                            onPress={() =>
                              this.createThreeButtonAlert(item, index)
                            }>
                            <Image source={Imagelinks.DELETE} />
                          </TouchableOpacity>
                        </View>

                        <Divider
                          style={{
                            width: '100%',
                            height: 1,
                            backgroundColor: '#cecece',
                          }}
                        />
                      </View>
                    );
                  })
                : null}
            </ScrollView>
            <View style={GetStarted_Screen.btnContainer}>
              <MyButton
                onPress={() => this.addAddressRef.showModel()}
                style={{
                  ...GetStarted_Screen.btnView1,
                  marginBottom: 10,
                  backgroundColor: 'blue',
                }}
                title={
                  <Text
                    style={{
                      ...GetStarted_Screen.btnText,
                      color: 'white',
                    }}>
                    ADD_ADDRESS
                  </Text>
                }
              />

              <MyButton
                onPress={() => alert('validation method called')}
                style={{
                  ...GetStarted_Screen.btnView1,
                  marginBottom: 10,
                  backgroundColor: 'blue',
                }}
                title={
                  <Text
                    style={{
                      ...GetStarted_Screen.btnText,
                      color: 'white',
                    }}>
                    Comfirm
                  </Text>
                }
              />
            </View>
          </Modal>
        </ScrollView>
      </Animatable.View>
    );
  }
  createThreeButtonAlert = (item, index) =>{
    Alert.alert('Delete', 'Are you sure you want to delete?', [
      {
        text: 'Confirm',
        onPress: () => this.deleteItem(item, index),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('ok Pressed'),
      },
    ])
  }
  deleteItem = async (item, index) => {
    const {addresses}=this.state;
         const search = addresses.indexOf(x => x.id == item.id)
        if(search){
      let Array = addresses.filter((val, index) => {
      if (val.id !== item.id) {
        return val;
      }
    });
    this.setState({
      addresses: Array,
      showIndex: false,
    },//()=>this.ShowAddresses()
    );
    try {
      await AsyncStorage.setItem('@key:address', JSON.stringify(Array));
    } catch (error) {
      console.log(error);
         }
      }
  };

  validation = async () => {
    const {fname, lname, address1, address2, country, city, postalcode, phone} =
      this.state.selectedAddress;
    if (this.state.selectedAddress && this.state.showIndex) {
      this.setState({
        isLoading: true,
      });
      const query = `mutation checkoutShippingAddressUpdateV2 {
        checkoutShippingAddressUpdateV2(shippingAddress: {
          firstName:"${fname}",
          lastName: "${lname}",
          address1: "${address1}",
          address2: "${address2}",
          country: "${country}",
          zip: "${postalcode}",
          city:"${city}",
          phone:"${phone}",
        },checkoutId:${this.state.checkoutID}) {
          userErrors {
            field
            message
          }
          checkout {
            id
            shippingAddress {
              firstName
              lastName
              address1
              address2
              country
              zip
              phone
            }
          }
        }
      }
    `;

      // fetch(UrlLinks.SHOP_URL, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'X-Shopify-Storefront-Access-Token': UrlLinks.ACCESS_TOKEN,
      //   },
      //   body: JSON.stringify({query: query}),
      // })
      //   .then(response => response.json())
      //   .then(async data => {
      //     console.log('::::Address:::::', JSON.stringify(data));
      //     const checkout = {
      //       checkoutId: data.data.checkoutShippingAddressUpdateV2.checkout.id,
      //       selectedAddress: this.state.selectedAddress,
      //     };
      //     this.setState({
      //       checkoutDetail: checkout,
      //     });
      //     try {
      //       await AsyncStorage.setItem(
      //         '@key:checkout',
      //         JSON.stringify(checkout),
      //       );
      //     } catch (error) {
      //       console.log(error);
      //     }
      //     this.child.componentDidMount();
      //     setTimeout(() => {
      //       this.setState(
      //         {
      //           isLoading: false,
      //         },
      //         () => {
      //           this.setState(
      //             {
      //               isLoading: false,
      //             },
      //             () => this.showAddressRef.close(),
      //           );
      //         },
      //       );
      //     }, 1500);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     this.setState({
      //       isLoading: false,
      //     });
      //     Snackbar.show({
      //       text: 'No Internet Connection',
      //       duration: Snackbar.LENGTH_SHORT,
      //       action: {
      //         text: 'OK',
      //         textColor: 'green',
      //         onPress: () => {
      //           / Do something. /;
      //         },
      //       },
      //     });
      //   });
    } else {
      this.setState({
        isLoading: false,
      });
      Snackbar.show({
        text: 'Add or Select address to save for next time',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: 'OK',
          textColor: 'green',
          onPress: () => {
            / Do something. /;
          },
        },
      });
    }
  };

  async getCheckout(newAddress) {
    if (this.state.addresses) {
      this.setState({
        isLoading: true,
        addresses: [...this.state.addresses, newAddress],
      });
    } else {
      this.setState({
        isLoading: true,
        addresses: [newAddress],
      });
    }
    this.ShowAddresses()
    Snackbar.show({
      text: 'New Address has been added to your account',
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'OK',
        textColor: 'green',
        onPress: () => {
          / Do something. /;
        },
      },
    });
  }

  ShowAddresses = async () => {
    if((this.state.addresses.length<1)){
       AsyncStorage.removeItem('@key:checkout').catch((e)=>console.log(e))
    }
    var Item = await AsyncStorage.getItem('@key:checkout');
    var value = (Item = Item ? JSON.parse(Item) : null);
    let addresses = await AsyncStorage.getItem('@key:address');
    addresses = addresses ? JSON.parse(addresses) : null;
    console.log('New Addresses:::', JSON.stringify(addresses));
    this.setState(
      {
        checkoutDetail: value,
        addresses: addresses,
      },
      () =>
        setTimeout(() => {
          this.setState({
            isLoading: false,
          });
        }, 1000),
    );
  };
  async GetCheckout() {
    try {
      const jsonCheckout = await AsyncStorage.getItem('@checkout_ID');
      jsonCheckout != null ? JSON.parse(jsonCheckout) : null;
      this.setState({
        checkoutID: jsonCheckout,
      });
      console.log('checkOut id:', jsonCheckout);
    } catch (e) {
      // error reading value
    }
  }

  selectAddress = (item, index) => {
    this.setState({
      itemSelected: index,
      selectedAddress: item,
      showIndex: true,
    });
  };
}

const styleSheet = StyleSheet.create({
  modalBG: {
    borderTopStartRadius: 15,
    borderTopRightRadius: 15,
  },
});
export default ContactInformation;
