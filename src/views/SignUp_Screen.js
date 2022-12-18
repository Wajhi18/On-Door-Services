import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Eye from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Lock from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar'
import { color } from '../helpers/color/Color_Constant';
import CustomTextInput from '../reusable/CustomTextInput';
import alertFunction from '../helpers/HelperFunction/AlertFunction';
import { navigate } from '../helpers/color/navigate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import PhoneInput from 'react-native-phone-number-input';
import asyncStorge from '../helpers/HelperFunction/AsyncStorageFunction';

const options = [
  'House Keeping',
  'HVACR',
  'Cook',
  'Tailoring',
  'Plumber',
  'Electrician',
  'Barber',
  'Beautician',
  'Elderly Care',
  'Mason',
  'Carpenter',
  'Movers',
  'Painter',
  'Driver',
  'Photographer',
  'Tutor',
];

export default class SignUp_Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      password: '',
      confirmPassword: '',
      showPass: true,
      confirmShow: true,
      Text: '',
      selectedService: '',
      isLoading: false,
    };
    this.firstNameRef = React.createRef();
    this.lastNameRef = React.createRef();
    this.emailRef = React.createRef();
    this.passRef = React.createRef();
    this.confRef = React.createRef();
    this.phoneRef = React.createRef();
  }

  // componentDidMount() {
  //   const usersCollection = firestore().collection('FISaCZ2Fa8U93Jdboy4b')
  //   console.log("USERSSS",usersCollection)

  // }

  getDataAfterRegister = (user) => {
    firestore()
      .collection('Users').where('email', '==', this.state.email).where('password', '==', this.state.password.toString())
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size == 0) {
          alertFunction.Alert('please enter valid credentials')
          this.setState({ email: '', password: '', isLoading: false })
          console.log('if: ', querySnapshot.size)
        } else {
          querySnapshot.forEach(documentSnapshot => {
            console.log('User ID: ', documentSnapshot.id, '\n\n', documentSnapshot.data().role)

            if (documentSnapshot.data().role == user) {
              asyncStorge.setCreditialToAsyncStorage(documentSnapshot.id, JSON.stringify(documentSnapshot.data()), documentSnapshot.data().role)
              this.setState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', isLoading: false })
              user == 'provider' ? this.props.navigation.replace(navigate.ProviderBottomRoutes) : this.props.navigation.replace(navigate.CustomerBottomRoutes)
              alertFunction.Alert(('Account successfuly created'))
            }
            else {
              const value = "You are not registerd as " + user
              alertFunction.Alert(value)
              this.setState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', isLoading: false })
            }
            console.log('Total users: ', querySnapshot.size);
          })
        }
      }).catch(err => {
        alertFunction.Alert('No record found')
        this.setState({ email: '', password: '', isLoading: false })
      })
  }

  PostDataToFirebase = (user) => {
    firestore()
      .collection('Users')
      .add({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        phone: this.state.phoneNo,
        password: this.state.password,
        image: '',
        role: user
      })
      .then((documentSnapshot) => {
        console.log(documentSnapshot.id)
        this.getDataAfterRegister(user)
      })
      .catch((error) => {
        alertFunction.Alert('firebase error')
        this.setState({ isLoading: false })
      })

  }

  checkEmailValidation = () => {
    const user = this.props.route.params.user
    firestore()
      .collection('Users').where('email', '==', this.state.email)
      .get()
      .then(querySnapshot => {

        if (querySnapshot.size == 0) {
          this.PostDataToFirebase(user)
        } else {
          alertFunction.Alert('Email already exist')
          this.setState({ isLoading: false })
        }
      }).catch(err => {
        alertFunction.Alert('No record found')
        this.setState({ isLoading: false })
      }
      )
  }

  isValidEmail = (num) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(num);
  }

  signUpValidation = () => {
    this.setState({ isLoading: true })
    const { email, password, confirmPassword, firstName, lastName, phoneNo } = this.state;
    if (firstName == '' || lastName == '' || email == '' || phoneNo == '' || password == '' || confirmPassword == '') {
      alertFunction.Alert('All fields are required')
      this.setState({ isLoading: false })
      return;
    }
    else if (this.isValidEmail(email) && firstName != '' && lastName != '' && this.phoneRef.current.isValidNumber(phoneNo.trim()) && password.length >= 8 && confirmPassword.length >= 8 && password == confirmPassword) {
      // this.setState({ isValid: true });
      this.checkEmailValidation()
      // this.props.navigation.navigate('BottomRoutes');
      // Vibration.vibrate(100);
    } else if (password != confirmPassword) {
      alertFunction.Alert('Password not match')
      this.setState({ isLoading: false })
      return;
    }
    else if (password.length < 8 || confirmPassword.length < 8) {
      alertFunction.Alert('password lenght must be of 8 charater long')
      this.setState({ isLoading: false })
      return;
    }
    else if (!this.isValidEmail(email)) {
      alertFunction.Alert('Not a valid email')
      this.setState({ isLoading: false })
      return;
    }
    else if (this.phoneRef.current.isValidNumber(phoneNo.trim()) == false) {
      this.setState({ isLoading: false })
      alertFunction.Alert('Phone number is invalid, try again')
    }
  }

  render() {
    const user = this.props.route.params?.user
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.2, width: '100%', backgroundColor: color.secondaryColor, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}
            style={{ padding: 5, backgroundColor: 'white', borderRadius: 100, position: 'absolute', top: 10, left: 20 }}>
            <AntDesign name='arrowleft' size={25} color='black' />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, color: color.primaryColor, fontWeight: 'bold' }}>On-Door Services</Text>
        </View>

        <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: 'white', width: '100%', flex: 0.8, paddingBottom: 20 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', }}>
            <View style={{ alignItems: 'center', marginVertical: '20%', }}>
              <Text style={[styles.text, { fontSize: 24, fontWeight: 'normal', color: color.tertiaryColor, marginBottom: 20 }]}>Sign Up</Text>
            </View>
            <CustomTextInput
              width='80%'
              height={55}
              placeholder='First Name'
              value={this.state.firstName}
              borderRadius={100}
              onChangeText={(value) => this.setState({ firstName: value })}
            />
            <View style={{ height: 30 }} />

            <CustomTextInput
              width='80%'
              height={55}
              placeholder='Last Name'
              value={this.state.lastName}
              borderRadius={100}
              onChangeText={(value) => this.setState({ lastName: value })}
            />

            <TextInput autoCapitalize='none'
              style={{ width: '80%', height: 55, paddingStart: 15, color: 'black', borderWidth: 1, borderColor: 'black', borderRadius: 100, backgroundColor: 'white', marginTop: 30 }}
              placeholder="Email"
              placeholderTextColor="grey"
              keyboardType='email-address'
              onChangeText={txt => this.setState({ email: txt.toLowerCase() })}
              value={this.state.email}
              onSubmitEditing={() => this.passRef.focus()}
            />

            <View style={{ height: 30 }} />

            <PhoneInput
              ref={this.phoneRef}
              defaultValue={this.state.phoneNo}
              defaultCode="PK"
              layout="first"
              withShadow={false}
              autoFocus={false}
              containerStyle={{ height: 55, borderRadius: 6, backgroundColor: 'white', borderWidth: 1, borderColor: 'black', borderRadius: 100 }}
              textContainerStyle={{
                paddingVertical: 0, backgroundColor: '#ffffff', borderRadius: 100
              }}
              onChangeFormattedText={text => {
                this.setState({
                  phoneNo: text,
                });
              }}
            />

            <View style={[styles.textbox3, { marginTop: 30 }]}>
              <TextInput ref={ele => this.passRef = ele}
                style={{ paddingStart: 20, color: 'black', flex: 1 }}
                placeholder="Password"
                placeholderTextColor="grey"
                keyboardType="name-phone-pad"
                value={this.state.password}
                secureTextEntry={this.state.showPass}
                onChangeText={txt => this.setState({ password: txt })}
                onSubmitEditing={() => this.confRef.focus()}
              />
              <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={() =>
                  this.setState({ showPass: !this.state.showPass })
                }>
                <Eye
                  style={styles.EyeIcon}
                  name={
                    this.state.showPass == true
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={20}
                  color="grey"
                />
              </TouchableOpacity>
            </View>

            <View style={[styles.textbox3, { marginTop: 30 }]}>
              <TextInput ref={ele => this.confRef = ele}
                style={{ paddingStart: 20, color: 'black', flex: 1 }}
                placeholder="Confirm Password"
                placeholderTextColor="grey"
                keyboardType="default"
                value={this.state.confirmPassword}
                secureTextEntry={this.state.confirmShow}
                onChangeText={txt => this.setState({ confirmPassword: txt })}
                onSubmitEditing={() => this.signUpValidation()}
              />
              <TouchableOpacity
                style={{ alignItems: 'center', justifyContent: 'center' }}
                onPress={() =>
                  this.setState({ confirmShow: !this.state.confirmShow })
                }>
                <Eye
                  style={styles.EyeIcon}
                  name={
                    this.state.showPass == true
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={20}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            {user == 'provider' &&
              <View style={{ width: '80%', marginTop: 30 }}>
                <SelectDropdown
                  data={options}
                  defaultValueByIndex={0}
                  onSelect={(selectedItem, index) => {
                    this.setState({ selectedService: selectedItem })
                  }}
                  defaultButtonText={'Select Service'}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                  buttonStyle={styles.dropdown1BtnStyle}
                  buttonTextStyle={styles.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={'#11567C'}
                        size={10}
                      />
                    );
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styles.dropdown1DropdownStyle}
                  rowStyle={styles.dropdown1RowStyle}
                  rowTextStyle={styles.dropdown1RowTxtStyle}
                />
              </View>
            }
            <TouchableOpacity disabled={this.state.isLoading} onPress={() => this.signUpValidation()}
              style={{ paddingVertical: 20, width: '80%', marginVertical: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: color.secondaryColor, borderRadius: 100 }}
              activeOpacity={0.8}
            >
              {this.state.isLoading ? <ActivityIndicator color={'white'} /> :
                <Text style={{ color: color.primaryColor, fontSize: 16, fontWeight: 'bold' }}>Sign Up</Text>
              }
            </TouchableOpacity>
          </ScrollView>
        </View>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondaryColor,
  },
  container3: {
    backgroundColor: '#07193F',
    height: '100%',
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    marginTop: '10%',
  },
  header: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    // justifyContent: 'center',
    paddingHorizontal: 5,
    // zIndex: 0,
  },
  starttext: {
    color: '#07193F',
    fontSize: 30,
    marginTop: 20,
    marginHorizontal: 25,
  },
  bodytext: {
    fontSize: 16,
    color: '#07193F',
    paddingTop: 10,
    marginHorizontal: 25,
  },

  textboxcontainer: {
    marginTop: 50,
    marginHorizontal: 25,
  },
  textbox: {
    marginHorizontal: 15,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#1A2A4D',
    paddingStart: 20,
    flexDirection: 'row',
  },

  textbox3: {
    width: '80%',
    height: 55,
    borderRadius: 100,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    flexDirection: 'row',
  },
  btn: {
    marginHorizontal: 15,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'white',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  SignUptxt: {
    fontSize: 18,
    color: '#07193F',
  },
  lasttxtcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
  alreadyText: {
    color: 'white',
    fontSize: 16,
  },
  SignInText: {
    color: 'white',
    fontSize: 16,
  },
  iconstyle: {
    marginTop: 10,
    marginStart: 3,
  },
  EyeIcon: {
    paddingEnd: 20,
  },
  img: {
    height: 300,
    width: '100%',
    marginTop: 10,
  },
  ForgetText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  textDanger: {
    color: '#dc3545',
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  dropdown1BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 14,
  },
  dropdown1DropdownStyle: { backgroundColor: '#fff' },
  dropdown1RowStyle: { backgroundColor: '#fff', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 14,
  },
});
