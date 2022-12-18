import React, { Component, useState, useCallback, useEffect, useLayoutEffect, } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../../reusable/Header';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

var userID = ""

const CustomerMessages = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    // const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [userToken, setUserToken] = useState()
    const [userData, setUserData] = useState()
    const [customer_name, setCustomer_name] = useState()
    const [userImage, setUserImage] = useState('')

    const getData = async () => {
        try {
            const jsonName = await AsyncStorage.getItem('@NameSession')
            const jsonID = await AsyncStorage.getItem('@IDSession')
            const jsonEmail = await AsyncStorage.getItem('@emailSession')
            const jsonPassword = await AsyncStorage.getItem('@passwordSession')

            if (jsonEmail && jsonPassword && jsonID) {
                setUserEmail(jsonEmail);
                userID = JSON.parse(jsonID)
                //setUserID(jsonID); 
                setUserName(jsonName);

            }

        } catch (e) {
            // error reading value
        }
    }

    const getUserData = async () => {
        const userToken = await AsyncStorage.getItem('@userToken')
        const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
        const customer_name = userData.first_name + ' ' + userData.last_name

        setUserToken(userToken)
        setUserData(userData)
        setCustomer_name(customer_name)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const image = await AsyncStorage.getItem('@key:userImage')
            setUserImage(image)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useEffect(async () => {
        // getUserData()
        const userToken = await AsyncStorage.getItem('@userToken')
        userID = userToken
        const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
        const customer_name = userData.first_name + ' ' + userData.last_name
        const customer_service_id = route.params.customer_service_id
        setTimeout(() => {
            firestore()
                .collection('Users')
                .doc(userToken).collection('my_orders').doc(customer_service_id).collection('chat').orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
                    snapshot.docs.map((item) => console.log('\n\n\n\n\n\ns=========', item.data()))
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            _id: doc.data()._id,
                            createdAt: doc.data().createdAt.toDate(),
                            text: doc.data().text,
                            user: doc.data().user
                            // {
                            //     _id: doc.data().user,
                            //     avatar: userImage,
                            // }
                        }))
                    )
                }
                );
        }, 1000);
        setMessages([
        ]);
    }, []);



    // useLayoutEffect(() => {
    // 	const unsubscribe = 
    // 	return unsubscribe;
    // }, []);




    const onSend = useCallback(async (messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        const { _id, createdAt, text, user } = messages[0];

        const userToken = await AsyncStorage.getItem('@userToken')
        const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
        const customer_name = userData.first_name + ' ' + userData.last_name
        const customer_service_id = route.params.customer_service_id
        firestore().collection('Users').doc(userToken).collection('my_orders').doc(customer_service_id).collection('chat').add({
            _id,
            createdAt,
            text,
            user
        });
    }, []);



    return (
        <View style={{ flexGrow: 1, marginBottom: 20 }}>

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
                showUserAvatar
                alwaysShowSend
                user={{
                    _id: userID,
                    avatar: userImage,
                }}
            />
        </View>
    );
}
export default CustomerMessages

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