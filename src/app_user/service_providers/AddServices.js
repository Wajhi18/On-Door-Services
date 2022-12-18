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
import AsyncStorage from "@react-native-async-storage/async-storage"

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Eye from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Lock from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar'
import { color } from '../../helpers/color/Color_Constant';
import CustomTextInput from '../../reusable/CustomTextInput';
import alertFunction from '../../helpers/HelperFunction/AlertFunction';
import { navigate } from '../../helpers/color/navigate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import PhoneInput from 'react-native-phone-number-input';
import Modal from 'react-native-modal';
import Header from '../../reusable/Header';

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

export default class AddServices extends Component {
    state = {
        description: '',
        price: '',
        serviceName: '',
        isLoading: false,
    }

    addServicesInFirebase = async() => {
        const userToken = await AsyncStorage.getItem('@userToken')
        const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
        const userRole = JSON.stringify(userData.role)
        const full_name = JSON.stringify(userData.first_name) + JSON.stringify(userData.last_name)
        firestore()
      .collection('Users').doc(userToken).collection('services')
      .add({
        description: this.state.description,
        full_name: full_name,
        price: this.state.price,
        serviceName: this.state.serviceName,
        phone: JSON.stringify(userData.phone),
        my_id: JSON.stringify(userToken),
        rating: '',
      })
      .then(() => {
        this.setState({ description: '', price: '', serviceName: '', isLoading: false })
        console.log('User added!');
        alertFunction.Alert('Service Added')
        // this.props.navigation.replace(navigate.Login_Screen, {
        //   user: user
        // })
      }).catch((error) => {
        alertFunction.Alert('firebase error')
        this.setState({isLoading: false})
      })
    }

    checkValidation = () => {
        this.setState({isLoading: true})
        const { description, serviceName, price, } = this.state;
        if (description == '' || serviceName == '' || price == '') {
          alertFunction.Alert('All fields are required')
          this.setState({isLoading: false})
          return;
        }
        else if (description != '' || serviceName != '' || price != '') {
          // this.setState({ isValid: true });
          this.addServicesInFirebase()
          // this.props.navigation.navigate('BottomRoutes');
          // Vibration.vibrate(100);
        } else {

        }
      }

    render() {
        const { description, price, serviceName, isLoading } = this.state
        const { isVisible, setVisible } = this.props
        return (
            <View
                style={{ flex: 1, backgroundColor: 'white', }}
            >
                <Header
                    title={'Add Service'}
                    leadingIcon='arrow-back'
                    leadingButton={() => this.props.navigation.goBack()}
                    trailingButton={() => this.props.navigation.navigate(navigate.ProviderNotification)}
                />
                <View style={{ flexGrow: 1, justifyContent: 'center', backgroundColor: 'white', paddingBottom: 50, paddingTop: 20 }}>
                    <View style={{ alignItems: 'center', marginVertical: 20, }}>
                        <Text style={{ fontSize: 24, fontWeight: 'normal', color: color.tertiaryColor, marginBottom: 20 }}>Add Service</Text>
                    </View>
                    {/* <ScrollView contentContainerStyle={{ flexGrow: 1, }}> */}
                    <View style={{ width: '80%', alignSelf: 'center' }}>
                        <SelectDropdown
                            data={options}
                            defaultValueByIndex={0}
                            onSelect={(selectedItem, index) => {
                                this.setState({ serviceName: selectedItem })
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
                    <View style={{ height: 30 }} />
                    <TextInput autoCapitalize='none' multiline={true}
                        style={{ alignSelf: 'center', width: '80%', height: 150, paddingStart: 15, color: 'black', borderWidth: 1, borderColor: 'black', borderRadius: 20, backgroundColor: 'white' }}
                        placeholder='Description'
                        placeholderTextColor="grey"
                        keyboardType='default'
                        onChangeText={txt => this.setState({ description: txt })}
                        value={description}
                    />
                    <View style={{ height: 30 }} />

                    <TextInput autoCapitalize='none'
                        style={{ alignSelf: 'center', width: '80%', height: 55, paddingStart: 15, color: 'black', borderWidth: 1, borderColor: 'black', borderRadius: 20, backgroundColor: 'white' }}
                        placeholder='Price'
                        placeholderTextColor="grey"
                        keyboardType='default'
                        onChangeText={txt => this.setState({ price: txt })}
                        value={price}
                    />

                    <TouchableOpacity activeOpacity={0.7} disabled={isLoading} onPress={() => this.checkValidation()}
                        style={{ alignSelf: 'center', width: 180, height: 45, backgroundColor: color.secondaryColor, borderRadius: 20, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                        {isLoading ? <ActivityIndicator color={'white'} /> :
                            <Text style={{ color: color.primaryColor, fontSize: 16, fontWeight: 'bold' }}>Add</Text>
                        }
                    </TouchableOpacity>
                    {/* </ScrollView> */}
                </View>
            </View>
        )
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