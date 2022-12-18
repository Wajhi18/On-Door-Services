import React, { Component, useState, useCallback, useEffect, useLayoutEffect, } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Header from '../../reusable/Header';

var userID = ""
var customer_service_id = ""
var customer_id = ""
const ProviderMessage = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  // const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userImage, setUserImage] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const image = await AsyncStorage.getItem('@key:providerImage')
      setUserImage(image)
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(async () => {
    const userToken = await AsyncStorage.getItem('@userToken')
    userID = userToken
    customer_id = route.params.customer_id
    customer_service_id = route.params.customer_service_id
    // const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
    // const customer_name = userData.first_name + ' ' + userData.last_name

    setTimeout(() => {
      // const subscriber = 
      firestore()
        .collection('Users')
        .doc(customer_id).collection('my_orders').doc(customer_service_id).collection('chat').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
              // {
              //   _id: doc.data().user,
              //   avatar: userImage,
              // }
            }))
          )
        });
      // return () => subscriber();
    }, 1000);

    setMessages([
    ]);
  }, []);



  // useLayoutEffect(() => {
  // 	const unsubscribe = 
  // 	return unsubscribe;
  // }, []);




  const onSend = useCallback((messages = []) => {

    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user } = messages[0];

    firestore().collection('Users').doc(customer_id).collection('my_orders').doc(customer_service_id).collection('chat').add({
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  return (
    <View style={{ marginBottom: 20, flex: 1 }}>
      <Header
        title='Chat'
        leadingIcon='arrow-back'
        leadingButton={() => navigation.goBack()}
        trailingButton={() => alert('Notification')}
      />

      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        alwaysShowSend
        showUserAvatar
        user={{
          _id: userID,
          avatar: userImage,
        }}
      />
    </View>
  );
}
export default ProviderMessage


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    backgroundColor: '#07193f',
    // justifyContent: 'center',
    paddingHorizontal: 5,
    // zIndex: 0,
  },

})
