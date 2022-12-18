import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import Header from '../../reusable/Header'
import { color } from '../../helpers/color/Color_Constant';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { navigate } from '../../helpers/color/navigate';
import { text } from '../../helpers/color/Text_Constant';
import { Switch } from 'react-native-paper';
import ChangePasswordModal from '../../reusable/modals/ChangePasswordModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncStorge from '../../helpers/HelperFunction/AsyncStorageFunction';
import AddServices from './AddServices';
import { StackActions } from '@react-navigation/native';
import ImagesConstant from '../../helpers/images/ImagesConstant';

const ProviderProfile = ({ navigation }) => {
  const [isNotificationON, setNotificationON] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userID, setUserID] = useState('')
  const [userRole, setUserRole] = useState('')
  const [userImage, setUserImage] = useState('')
  const [isServiceModalOpen, setServiceModalOpen] = useState(false)
  const [isOpenChangePassModal, setOpenChangePassModal] = useState(false)

  const getUserData = async () => {
    const userToken = await AsyncStorage.getItem('@userToken')
    setUserID(userToken)
    const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
    const userName = userData.first_name + ' ' + userData.last_name
    const userEmail = userData.email
    userData.image !='' && setUserImage(userData.image)
    setUserRole(userData.role)
    setUserName(userName)
    setUserEmail(userEmail)
  }

  useEffect(() => {
    getUserData()
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const image = await AsyncStorage.getItem('@key:providerImage')
      setUserImage(image)
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const customView = ({ title, description, icon, onPressed }) => (
    <TouchableOpacity onPress={() => onPressed == 'passwordModal' ? setOpenChangePassModal(true) : navigation.navigate(navigate.ProviderEditProfile)}
      activeOpacity={0.7}
      style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 14, paddingVertical: 20, paddingHorizontal: 15, backgroundColor: 'white', borderRadius: 8, elevation: 5 }}>
      <View style={{ borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name="person" color={color} size={20} />
        <View style={{ marginLeft: 15 }}>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{title}</Text>
          <View style={{ height: 5 }} />
          <Text style={{ color: 'grey', fontWeight: 'normal' }}>{description}</Text>
        </View>
      </View>
      <FontAwesome name={icon} color={color} size={26} />
    </TouchableOpacity>
  )
  return (
    <View style={{ ...styles.container }}>
      <Header
        title={'Profile'}
        leadingIcon='arrow-back'
        leadingButton={() => navigation.goBack()}
        trailingButton={() => navigation.navigate(navigate.ProviderNotification)}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 14 }}>
          <View style={{ borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {userImage ? <Image
              source={{ uri: userImage }}
              style={{ width: 80, height: 80, borderRadius: 100, resizeMode: 'cover' }}
            />
              :
              <Image
                source={ImagesConstant.placeHolder}
                style={{ width: 80, height: 80, borderRadius: 100, resizeMode: 'cover' }}
              />
            }
            <View style={{ marginLeft: 10 }}>
              <Text style={{ color: 'black' }}>{userName}</Text>
              <Text style={{ color: 'black' }}>{userEmail}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(navigate.AddServices)}
            activeOpacity={0.7} style={{ height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: color.secondaryColor }}>
            <FontAwesome5 name='plus' size={20} color='white' />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10, marginHorizontal: 14 }}>
          <Text style={{ color: 'grey' }}>General</Text>
        </View>

        {customView({ title: 'Account Information', description: 'Check you account information', icon: 'angle-right' })}

        {customView({ title: 'Password', description: 'Change your password', icon: 'angle-right', onPressed: 'passwordModal' })}

        <View style={{ marginTop: 10, marginHorizontal: 14 }}>
          <Text style={{ color: 'grey' }}>Notification</Text>
        </View>

        <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 14, paddingVertical: 20, paddingHorizontal: 15, backgroundColor: 'white', borderRadius: 8, elevation: 5 }}>
          <View style={{ borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="notifications" color={color} size={20} />
            <View style={{ marginLeft: 15 }}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Notification</Text>
              <View style={{ height: 5 }} />
              <Text style={{ color: 'grey', fontWeight: 'normal' }}>You will receive daily update</Text>
            </View>
          </View>
          <Switch value={isNotificationON} onValueChange={(value) => setNotificationON(value)} />
        </View>

        <View style={{ marginTop: 10, marginHorizontal: 14 }}>
          <Text style={{ color: 'grey' }}>Customer Support</Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 14, paddingVertical: 20, paddingHorizontal: 15, backgroundColor: 'white', borderRadius: 8, elevation: 5 }}>
          <View style={{ borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome name="support" color={color} size={20} />
            <View style={{ marginLeft: 15 }}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Support</Text>
              <View style={{ height: 5 }} />
              <Text style={{ color: 'grey', fontWeight: 'normal' }}>Contact Admin for customer support</Text>
            </View>
          </View>
          <FontAwesome name="angle-right" color={color} size={20} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => asyncStorge.removeCreditialFromAsyncStorage().then(() => navigation.dispatch(
          StackActions.replace(navigate.Preference, {
            user: userRole,
          })
        )
        )}
          activeOpacity={0.7} style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 14, paddingVertical: 20, paddingHorizontal: 15, backgroundColor: 'white', borderRadius: 8, elevation: 5 }}>
          <View style={{ borderRadius: 100, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="logout" color={color} size={20} />
            <View style={{ marginLeft: 15 }}>
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Log Out</Text>
              <View style={{ height: 5 }} />
              <Text style={{ color: 'grey', fontWeight: 'normal' }}>LogOut from app</Text>
            </View>
          </View>
          <FontAwesome name="angle-right" color={color} size={20} />
        </TouchableOpacity>

        <ChangePasswordModal
          isVisible={isOpenChangePassModal}
          setVisible={(value) => setOpenChangePassModal(value)}
          userID={userID}
        />

      </ScrollView>
    </View>
  )
}
export default ProviderProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryDimColor
  }
})