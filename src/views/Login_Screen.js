import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  BackHandler
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Eye from 'react-native-vector-icons/Ionicons';
import Lock from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from '../helpers/color/Color_Constant';
import { navigate } from '../helpers/color/navigate';
import alertFunction from '../helpers/HelperFunction/AlertFunction';
import asyncStorge from '../helpers/HelperFunction/AsyncStorageFunction';
import databaseService from '../core/database/DatabaseServices';
import { StackActions } from '@react-navigation/native';

export default class Login_Screen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      showPass: true,
      password: '',
      emailError: '',
      isValid: false,
      passwordErrorMessage: '', // password error message
      confirmPassword: '', // to store password
      confirmPasswordErrorMessage: '', // password error message
      isLoading: false,
      authUserID: '',
      authUserName: '',
    };
    this.passRef = React.createRef();
  }
  storeData = async (user, token) => {
    try {

      await AsyncStorage.setItem('@IDSession', jsonID)
      console.log('SessionID Stored: ', JSON.parse(jsonID))

      await AsyncStorage.setItem('@NameSession', jsonName)
      console.log('SessionName Stored: ', jsonName)

      await AsyncStorage.setItem('@emailSession', jsonEmail)
      console.log('SessionEmail Stored: ', JSON.parse(jsonEmail))

      await AsyncStorage.setItem('@passwordSession', jsonPassword)
      console.log('SessionPassword Stored: ', JSON.parse(jsonPassword))

      this.setState({ email: '', password: '' })

      this.props.navigation.replace('BottomRoutes')

    } catch (e) {
      alertFunction.Alert('Error in AsyncStorage')
    }
  }


  getFirestorData = (user) => {
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
              this.setState({ email: '', password: '', isLoading: false })
              user == 'provider' ? this.props.navigation.dispatch(StackActions.replace(navigate.ProviderBottomRoutes)) : this.props.navigation.dispatch(StackActions.replace(navigate.CustomerBottomRoutes))
              alertFunction.Alert(('successfuly logged in'))
              this.props.navigation.dispatch(StackActions.replace(navigate.ProviderBottomRoutes))
            }
            else {
              const value = "You are not registerd as " + user
              alertFunction.Alert(value)
              this.setState({ email: '', password: '', isLoading: false })
            }
            console.log('Total users: ', querySnapshot.size);
          })
        }
      }).catch(err => {
        alertFunction.Alert('No record found')
        this.setState({ email: '', password: '', isLoading: false })
      })
  }

  isValidEmail = (num) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(num);
  }

  handleValidation = (user) => {
    this.setState({ isLoading: true })
    const { email, password } = this.state;
    if (email == '' || password == '') {
      alertFunction.Alert('All fields are required')
      this.setState({ isLoading: false })
      return;
    }
    else if (!this.isValidEmail(email)) {
      alertFunction.Alert('Email not valid')
      this.setState({ isLoading: false })
      return;
    }
    else if (this.isValidEmail(email) && password.length >= 8) {
      // const response = databaseService.getFirestorData(email, password)
      this.getFirestorData(user)
    }
    else if (password.length < 8) {
      alertFunction.Alert('password lenght must be 8 charater long')
      this.setState({ isLoading: false })
      return;
    }
    else {
      alertFunction.Alert('All fields are required')
      this.setState({ isLoading: false })
    }

  };

  handleBackButton = () => {
    this.props.navigation.goBack()
    return true;
  }

  render() {
    const user = this.props.route.params?.user
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1, flexGrow: 1 }}>

          <View style={{ flex: 0.2, width: '100%', backgroundColor: color.secondaryColor, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.handleBackButton()}
              style={{ padding: 5, backgroundColor: 'white', borderRadius: 100, position: 'absolute', top: 10, left: 20 }}>
              <AntDesign name='arrowleft' size={25} color='black' />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, color: color.primaryColor, fontWeight: 'bold' }}>On-Door Services</Text>
          </View>

          <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: 'white', width: '100%', flex: 0.8, alignItems: 'center', paddingBottom: 20 }}>
            <View style={{ alignItems: 'center', marginVertical: '20%', }}>
              <Text style={[styles.text, { fontSize: 24, fontWeight: 'normal', color: color.tertiaryColor, marginBottom: 20 }]}>Sign In</Text>
            </View>

            <TextInput autoCapitalize='none'
              style={{ width: '80%', height: 55, paddingStart: 15, color: 'black', borderWidth: 1, borderColor: 'black', borderRadius: 100, backgroundColor: 'white' }}
              placeholder="Email"
              placeholderTextColor="grey"
              keyboardType='email-address'
              onChangeText={txt => this.setState({ email: txt.toLowerCase() })}
              value={this.state.email}
              onSubmitEditing={() => this.passRef.focus()}
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
                onSubmitEditing={() => this.handleValidation(user)}
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

            <TouchableOpacity onPress={() => this.props.navigation.navigate(navigate.Forget_Password, {
              user: user
            })}
              style={{ padding: 5, marginVertical: 20, alignSelf: 'flex-start', marginLeft: '10%' }}
              activeOpacity={0.8}
            >
              <Text style={{ color: color.tertiaryColor, fontSize: 14, fontWeight: 'bold' }}>Forget Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={this.state.isLoading} onPress={() => { this.handleValidation(user) }}
              style={{ paddingVertical: 20, width: '80%', marginVertical: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: color.secondaryColor, borderRadius: 100 }}
              activeOpacity={0.8}
            >
              {this.state.isLoading ? <ActivityIndicator color={'white'} /> :
                <Text style={{ color: color.primaryColor, fontSize: 16, fontWeight: 'bold' }}>Sign In</Text>
              }
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
              <Text style={{ color: 'black' }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.replace(navigate.SignUp_Screen, {
                user: user
              })}
                style={{ padding: 5 }}
                activeOpacity={0.8}
              >
                <Text style={{ color: 'blue', fontSize: 14, fontWeight: 'bold' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
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
});
