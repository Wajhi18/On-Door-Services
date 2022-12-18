import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar'
import { color } from '../helpers/color/Color_Constant';

export default class Forget_Password extends Component {
  constructor() {
    super();
    this.state = {
      emailError: '',
      email: '',
      authID: ''
    };
  }

  getFirestorData = () => {
    firestore()
      .collection('Users').where('email', '==', this.state.email)
      .get()
      .then(querySnapshot => {

        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().name)
          this.setState({ authID: documentSnapshot.id })
          // this.setState({ authUserName: documentSnapshot.data().name })
        })

        if (querySnapshot.size != 0) {
          console.log('Total users: ', querySnapshot.size);
          this.props.navigation.navigate('Reset_Password', {
            authID: this.state.authID
          })
        } else {
          Snackbar.show({
            text: 'Email not Registered',
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              text: 'OK',
              textColor: 'green',
              onPress: () => { /* Do something. */ },
            },
          })
          console.log('if: ', querySnapshot.size)

        }
      }).catch(err =>
        Snackbar.show({
          text: 'Record not found',
          duration: Snackbar.LENGTH_INDEFINITE,
          action: {
            text: 'OK',
            textColor: 'green',
            onPress: () => { /* Do something. */ },
          },
        })
      )
  }

  isValidEmail = (num) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(num);
  }

  emailValidator() {
    const email = this.state.email
    if (email == '') {
      Snackbar.show({
        text: 'Please enter email',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'UNDO',
          textColor: 'green',
          onPress: () => { /* Do something. */ },
        },
      })
    }
    else if (this.state.email != '' && this.isValidEmail(email)) {
      this.getFirestorData()

    }
    else {
      Snackbar.show({
        text: 'Please enter correct email',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'OK',
          textColor: 'green',
          onPress: () => { /* Do something. */ },
        },
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>

          <View>
            <View style={styles.header}>

              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                  style={{ padding: 5 }}>
                  <AntDesign name='arrowleft' size={25} color='black' />
                </TouchableOpacity>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 10, }}>
                <Text style={{ fontSize: 30, color: 'black' }}>Forget Password</Text>
              </View>

            </View>
            <Image
              style={styles.img}
              source={require('../assets/icons/main.jpg')}
            />
          </View>
          <Animatable.View
            animation="bounceIn"
            style={styles.animation}></Animatable.View>
          <Animatable.View animation="bounceIn" style={styles.container3}>
            <View style={styles.textbox}>
              <Fontisto
                style={styles.iconstyle}
                name="email"
                size={20}
                color="white"
              />
              <TextInput
                autoCapitalize='none'
                style={{ paddingStart: 15, color: '#fff', flex: 1 }}
                placeholder="Email"
                placeholderTextColor="grey"
                keyboardType='email-address'
                onChangeText={txt => this.setState({ email: txt })}
                value={this.state.email}
                onSubmitEditing={() => this.emailValidator()}
              />
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.emailValidator()}
                style={styles.btn}>
                <Text style={styles.SignUptxt}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: '17%' }}></View>
          </Animatable.View>
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
  header: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    // justifyContent: 'center',
    paddingHorizontal: 5,
    // zIndex: 0,
  },
  img: {
    height: 300,
    width: '100%',
    position: 'absolute',
    marginTop: 100,
  },
  animation: {
    marginTop: 180,
  },
  container3: {
    backgroundColor: '#07193F',
    height: '100%',
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    marginTop: '70%',
  },

  btn: {
    marginHorizontal: 75,
    height: 45,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },

  SignUptxt: {
    fontSize: 18,
    color: '#07193F',
  },
  textboxcontainer: {
    marginTop: 50,
    marginHorizontal: 25,
  },
  textbox: {
    marginTop: 90,
    marginHorizontal: 15,
    height: 45,
    borderRadius: 30,
    backgroundColor: '#1A2A4D',
    marginLeft: '5%',
    flexDirection: 'row',
  },
  iconstyle: {
    marginTop: 10,
    marginStart: 20,
  },
  starttext: {
    color: '#07193F',
    fontSize: 30,
    marginTop: '5%',
    marginHorizontal: 25,
  },
});
