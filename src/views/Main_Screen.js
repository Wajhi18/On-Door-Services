import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from '../helpers/color/Color_Constant';

export default class Main_Screen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const user = this.props.route.params.user
    const marginTop = this.props.route?.params?.marginTop
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View>
            <Image
              resizeMode='contain'
              style={styles.img}
              source={require('../assets/icons/main.jpg')}
            />
          </View>
          <Animatable.View animation="bounceIn" style={[styles.animation,{ marginTop: marginTop? marginTop : 180}]}>
            {/* <Image
            style={{
              height: 200,
              width: '100%',
              position: 'absolute',
              marginTop: 220,
            }}
            source={require('../../assets/image/image.png')}
          /> */}
          </Animatable.View>
          <Animatable.View animation="bounceIn" style={styles.container3}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.props.navigation.replace('Login_Screen')}
              style={styles.btn}>
              <Text style={styles.SignUptxt}>Sign In</Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate('SignUp_Screen')}
                style={styles.btn}>
                <Text style={styles.SignUptxt}>Register</Text>
              </TouchableOpacity>

              {user == 'customer' &&
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.props.navigation.navigate('SignUp_Screen')}
                  style={styles.btn}>
                  <Text style={styles.SignUptxt}>Continue as guest</Text>
                </TouchableOpacity>
              }
            </View>
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
    marginTop: '95%',
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
});
