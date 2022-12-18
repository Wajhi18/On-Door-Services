import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import User from 'react-native-vector-icons/AntDesign';
import Eye from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Lock from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import Snackbar from 'react-native-snackbar'

import firestore from '@react-native-firebase/firestore';
import { color } from '../helpers/color/Color_Constant';

export default class Reset_Password extends Component {
  state = {
    Pass: '',
    showPass: true,
    password: '',
    ConfirmPass: '',
    confirmShow: true,
    confirm: '',
    // to store password
    passwordErrorMessage: '', // password error message
    confirmPassword: '', // to store password
    confirmPasswordErrorMessage: '', // password error message
    loading: false,
  };

  updateFirestorData = () => {
    const authID = this.props.route.params.authID
    firestore()
      .collection('Users')
      .doc(authID)
      .update({
        password: this.state.Pass,
      })
      .then(() => {
        console.log('User updated!');
        // this.showAlert()
        this.setState({ Pass: '' })
        this.setState({ ConfirmPass: '' })
        this.props.navigation.replace('Login_Screen')
      });
  }

  showAlert = () => {
    Snackbar.show({
      text: 'Password updated Successfully',
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'OK',
        textColor: 'green',
        onPress: () => { /* Do something. */ },
      },
    })
  }

  Validation = () => {
    const { Pass, ConfirmPass } = this.state;
    if (Pass == '' || ConfirmPass == '') {
      Snackbar.show({
        text: 'All fields are required',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'OK',
          textColor: 'green',
          onPress: () => { /* Do something. */ },
        },
      })
      return;
    }
    else if (Pass != '' && ConfirmPass != '' && Pass.length >= 8 && ConfirmPass.length >= 8 && Pass == ConfirmPass) {

      this.updateFirestorData()

    } else if (Pass != ConfirmPass) {
      Snackbar.show({
        text: 'Password not match',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'green',
          onPress: () => { /* Do something. */ },
        },
      })
      return;
    }
    else if (Pass.length < 8 || ConfirmPass < 8) {
      Snackbar.show({
        text: 'password lenght must be 8 charater long',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'OK',
          textColor: 'green',
          onPress: () => { /* Do something. */ },
        },
      })
      return;
    }
  }

  formValidation = async () => {
    this.setState({ loading: true });
    let errorFlag = false;

    // input validation
    if (this.state.password.length == 0) {
      errorFlag = true;
      this.setState({ passwordErrorMessage: 'Password is required feild' });
    } else if (
      this.state.password.length < 8 ||
      this.state.password.length > 20
    ) {
      errorFlag = true;
      this.setState({
        passwordErrorMessage: 'Password should be min 8 char and max 20 char',
      });
    } else if (this.state.password !== this.state.confirmPassword) {
      errorFlag = true;
      this.setState({
        passwordErrorMessage: 'Passwoad and confirm password should be same.',
      });
    }

    if (this.state.confirmPassword.length == 0) {
      errorFlag = true;
      this.setState({
        confirmPasswordErrorMessage: 'Confirm Password is required feild',
      });
    } else if (
      this.state.confirmPassword.length < 8 ||
      this.state.confirmPassword.length > 20
    ) {
      errorFlag = true;
      this.setState({
        confirmPasswordErrorMessage:
          'Password should be min 8 char and max 20 char',
      });
    }

    if (errorFlag) {
      console.log('errorFlag');

      /** Call Your API */
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>

            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                style={{ padding: 5 }}>
                <AntDesign name='arrowleft' size={25} color='black' />
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 10, }}>
              <Text style={{ fontSize: 30, color: 'black' }}>Reset Password</Text>
            </View>

          </View>
          <Image
            style={styles.img}
            source={require('../assets/icons/login.jpg')}
          />

          <View style={styles.container3}>
            <Animatable.View
              Animation="bounceOut"
              style={styles.textboxcontainer}>
              <View style={styles.textbox3}>
                <Lock
                  style={styles.iconstyle}
                  name="lock-outline"
                  size={20}
                  color="white"
                />
                <TextInput
                  style={{ paddingStart: 20, flex: 1, color: '#fff' }}
                  placeholder=" Password"
                  placeholderTextColor="white"
                  keyboardType="name-phone-pad"
                  value={this.state.Pass}
                  secureTextEntry={this.state.showPass}
                  onChangeText={txt => this.setState({ Pass: txt })}
                  onSubmitEditing={() => this.newRef.focus()}
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
                    color="white"
                  />
                </TouchableOpacity>

              </View>

              <View style={styles.textbox3}>
                <Lock
                  style={styles.iconstyle}
                  name="lock-outline"
                  size={20}
                  color="white"
                />
                <TextInput ref={ele => this.newRef = ele}
                  style={{ paddingStart: 20, flex: 1, color: '#fff' }}
                  placeholder="New Password"
                  placeholderTextColor="white"
                  keyboardType="name-phone-pad"
                  value={this.state.ConfirmPass}
                  secureTextEntry={this.state.confirmShow}
                  onChangeText={txt => this.setState({ ConfirmPass: txt })}
                  onSubmitEditing={() => this.Validation()}
                />
                <TouchableOpacity
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                  onPress={() =>
                    this.setState({ confirmShow: !this.state.confirmShow })
                  }>
                  <Eye
                    style={styles.EyeIcon}
                    name={
                      this.state.confirmShow == true
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              {this.state.confirmPasswordErrorMessage.length > 0 && (
                <Text style={styles.textDanger}>
                  {this.state.confirmPasswordErrorMessage}
                </Text>
              )}
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.Validation()}
                style={styles.btn}>
                <Text style={styles.SignUptxt}>Save</Text>
              </TouchableOpacity>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '32%',
                }}></View>
            </Animatable.View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
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
    marginTop: 10,
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
    marginTop: 20,
  },

  textbox3: {
    marginHorizontal: 15,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#1A2A4D',
    paddingStart: 20,
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

  lasttxtcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
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
    marginTop: 50,
  },

  SignUptxt: {
    fontSize: 18,
    color: '#07193F',
  },
  textDanger: {
    color: '#dc3545',
  },
});
