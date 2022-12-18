import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Keyboard,
} from 'react-native';
import Modal from "react-native-modal";
import MyButton from '../extras/MyButton';
import InputField from '../extras/InputField';
import LogoHeader from '../extras/LogoHeader';
import {Product_Details_Screen, Update_Password} from '../extras/styles';

import * as Animatable from 'react-native-animatable';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import PhoneInput from 'react-native-phone-number-input';
import {UIActivityIndicator} from 'react-native-indicators';
import Snackbar from 'react-native-snackbar';
import { color } from '../../helpers/color/Color_Constant';

export default class AddAddressModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: '',
      first_name: '',
      last_name: '',
      address: '',
      address2: '',
      city: '',
      postal_code: '',
      isLoading: false,
      height: new Animated.Value(60),
      opacity: new Animated.Value(1),
      show: true,
      countries: [],
      phoneNumber: '',
    };
    this.textInputRef1 = React.createRef();
    this.textInputRef2 = React.createRef();
    this.textInputRef3 = React.createRef();
    this.textInputRef4 = React.createRef();
    this.textInputRef5 = React.createRef();
    this.textInputRef6 = React.createRef();
    this.textInputRef7 = React.createRef();
    this.phoneInput = React.createRef(null);
  }
  componentDidMount() {
    this.keyboardDidShowSubscription = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            Animated.parallel([
                Animated.timing(this.state.height, {
                    toValue: 0,
                    useNativeDriver: false
                }),
                Animated.timing(this.state.opacity, {
                    toValue: 0,
                    useNativeDriver: false
                })
            ]).start(() => {

            })
        },
    );
    this.keyboardDidHideSubscription = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            Animated.parallel([
                Animated.timing(this.state.height, {
                    toValue: 60,
                    useNativeDriver: false
                }),
                Animated.timing(this.state.opacity, {
                    toValue: 1,
                    useNativeDriver: false
                })
            ]).start(() => {

            })
        },
    );
}
  render() {
    const {phoneNumber} = this.state;
    const {isVisible, setVisible} = this.props
    // const icon = () => {
    //   return (
    //     <Image
    //       source={
    //         this.state.show == true
    //           ? require('../../../assets/images/down.png')
    //           : require('../../../assets/images/up.png')
    //       }
    //       style={{width: 12, height: 12}}
    //     />
    //   );
    // };
    return (
      
      <Modal
        style={{...styleSheet.modalBG, backgroundColor: 'white'}}
        isVisible={isVisible}
        onBackButtonPress={()=> setVisible(false)}
        onBackdropPress={()=> {setVisible(false)}}
        coverScreen={true}
        onSwipeCancel={()=> setVisible(true)}
        ref={ref => (this.addAddressRef = ref)}
        hasBackdrop={true}
        backdropOpacity={0.3}>
        <Animatable.View
          animation={'fadeIn'}
          duration={1000}
          style={{
            backgroundColor: 'white',
          }}>
          <LogoHeader
            onPress1={() => this.cancelModal()}
            // iconSource1={Imagelinks.GOBACK_IMAGE}
            title='CONTACT_INFO'
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              ...Product_Details_Screen.ProductDetails_ScrollView,
            }}>
            <View style={Update_Password.Signup_textView}>
              <InputField
                Texthint='FIRST_NAME'
                keyboardType={'default'}
                bgStyle={{
                  ...Update_Password.InputFieldView2,
                  borderColor: 'grey',
                }}
                onChange={txt => this.setState({first_name: txt})}
                onSubmit={() => this.textInputRef1.current.focus()}
              />
              <InputField
                TextInputRef={this.textInputRef1}
                keyboardType={'default'}
                Texthint='LAST_NAME'
                bgStyle={{
                  ...Update_Password.InputFieldView2,
                  borderColor: 'grey',
                }}
                onChange={txt => this.setState({last_name: txt})}
                onSubmit={() => this.textInputRef2.current.focus()}
              />
              <TouchableOpacity style={{marginHorizontal: 15, marginTop: 25}}>
                <SelectDropdown
                  defaultButtonText='COUNTRY'
                  buttonStyle={{
                    width: '100%',
                    elevation: 2,
                    borderRadius: 6,
                    alignItems: 'center',
                    backgroundColor: '#f2f2f2',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                  }}
                  rowTextStyle={{color: 'black'}}
                  dropdownStyle={{
                    backgroundColor: 'white',
                    borderColor: 'grey',
                    borderWidth: 1,
                  }}
                  dropdownIconPosition={'right'}
                  buttonTextStyle={{
                    position: 'absolute',
                    right: 0,
                    color: 'black',
                    fontSize: 14,
                  }}
                  // renderDropdownIcon={() => icon()}
                  disableAutoScroll
                  data={this.state.countries}
                  onSelect={(selectedItem, index) => {
                    this.setState({
                      show: !this.state.show,
                      country: selectedItem,
                    });
                    console.log(this.state.country);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
              </TouchableOpacity>
              <InputField
                TextInputRef={this.textInputRef2}
                keyboardType={'default'}
                Texthint='ADDRESS'
                bgStyle={{
                  ...Update_Password.InputFieldView2,
                  borderColor: 'grey',
                }}
                onChange={txt => this.setState({address: txt})}
                onSubmit={() => this.textInputRef3.current.focus()}
              />

              <InputField
                TextInputRef={this.textInputRef3}
                keyboardType={'default'}
                Texthint='APPARTMENT'
                bgStyle={{
                  ...Update_Password.InputFieldView2,
                  borderColor: 'black',
                }}
                onChange={txt => this.setState({address2: txt})}
                onSubmit={() => this.textInputRef4.current.focus()}
              />
              <InputField
                TextInputRef={this.textInputRef4}
                keyboardType={'default'}
                Texthint='CITY'
                bgStyle={{
                  ...Update_Password.InputFieldView2,
                  borderColor: 'grey',
                }}
                onChange={txt => this.setState({city: txt})}
                onSubmit={() => this.textInputRef5.current.focus()}
              />
              <InputField
                TextInputRef={this.textInputRef5}
                keyboardType={'phone-pad'}
                Texthint='POSTAL_CODE'
                bgStyle={{
                  ...Update_Password.InputFieldView2,
                  borderColor: 'grey',
                }}
                onChange={txt => this.setState({postal_code: txt})}
                onSubmit={() => console.log('')}
              />
              <View style={{marginHorizontal: 15, marginTop: 25}}>
                <PhoneInput
                  defaultValue={phoneNumber}
                  ref={this.phoneInput}
                  defaultCode="PK"
                  layout="first"
                  withShadow={false}
                  autoFocus={false}
                  containerStyle={styleSheet.phoneNumberView}
                  textContainerStyle={{
                    paddingVertical: 0,
                    backgroundColor: '#f2f2f2',
                  }}
                  onChangeFormattedText={text => {
                    this.setState({
                      phoneNumber: text,
                    });
                  }}
                />
              </View>
            </View>

            <View
              style={{
                ...Product_Details_Screen.cart_btn_Container,
                marginTop: 50,
              }}>
              <MyButton
                onPress={() => this.validation()}
                style={{
                  ...Product_Details_Screen.cart_buyNow,
                  backgroundColor: color.secondaryColor,
                }}
                title={
                  this.state.isLoading ? (
                    <UIActivityIndicator size={32} color={'white'} />
                  ) : (
                    <Text
                      style={{
                        ...Product_Details_Screen.btn1_Text,
                        color: 'white',
                      }}>
                      ADD_BTN
                    </Text>
                  )
                }
              />
            </View>
          </ScrollView>
        </Animatable.View>
      </Modal>
    );
  }
  validation = () => {
    
    const {first_name, last_name, address, address2, city, postal_code, phoneNumber, country,} = this.state;
    this.setState({
      isLoading: true,
    });
    const checkValid = this.phoneInput.current?.isValidNumber(
      phoneNumber.trim(),
    );
    if (first_name &&last_name &&address &&city &&postal_code&&phoneNumber&&country) {
      if (checkValid) {
        const SaveAddress={
          fname:first_name.trim(),
          lname:last_name.trim(),
          address1:address.trim(),
          address2:address2.trim(),
          country:country.trim(),
          city:city.trim(),
          postalcode:postal_code.trim(),
          phone:phoneNumber.trim(),
          id:Math.random().toString(36).slice(2)
      }
      this.saveAddress(SaveAddress)

      } else {
        this.setState({
          isLoading: false,
        });
        Snackbar.show({
          text: 'Invalid Number',
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
    } else {
      this.setState({
        isLoading: false,
      });
      Snackbar.show({
        text: 'All fields are required',
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

  saveAddress = async (newAddress) => {
    try {
        var address =[];
        address = await AsyncStorage.getItem('@key:address');
        address = address ? JSON.parse(address) : null;
        if (address != null) {
            await AsyncStorage.setItem('@key:address', JSON.stringify([...address, newAddress]))
        }
        else {
            await AsyncStorage.setItem('@key:address', JSON.stringify([newAddress]))
        }
        this.ItemsCheckout(newAddress);
        console.log("Show addresses:", address)
    }catch (error) {
        console.log("Save Address Error:",error)
    }
}
  async ItemsCheckout(newAddress) {
    this.props.itemscheckout(newAddress); 
    this.setState({
      isLoading: false,
    },()=>this.addAddressRef.close());
  }
  cancelModal = async () => {
    this.addAddressRef.close();
  };
  showModel = () => {
    this.addAddressRef.open();
  };

}
const styleSheet = StyleSheet.create({
  modalBG: {
    height: 400,
  },
  phoneNumberView: {
    elevation: 2,
    width: '100%',
    height: 50,
    borderRadius: 6,
    backgroundColor: 'white',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width: '100%',
    padding: 8,
    backgroundColor: '#00B8D4',
  },

  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
});
