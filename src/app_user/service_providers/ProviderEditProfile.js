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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Lock from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar'
import { color } from '../../helpers/color/Color_Constant';
import alertFunction from '../../helpers/HelperFunction/AlertFunction';
import { navigate } from '../../helpers/color/navigate';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SelectDropdown from 'react-native-select-dropdown';
import Header from '../../reusable/Header';
import CustomTextInput from '../../reusable/CustomTextInput';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagesConstant from '../../helpers/images/ImagesConstant';
import storage from '@react-native-firebase/storage';

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

export default class ProviderEditProfile extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNo: '',
            image: '',
            password: '',
            confirmPassword: '',
            showPass: true,
            confirmShow: true,
            Text: '',
            selectedService: '',
            isLoading: true,
        };
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passRef = React.createRef();
        this.confRef = React.createRef();
        this.phoneRef = React.createRef();
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            const image = await AsyncStorage.getItem('@key:providerImage')
            if (image) {
                this.setState({ image: image })
            }
        });
        this.getUserData()
    }

    getUserData = async () => {
        const userToken = await AsyncStorage.getItem('@userToken')
        const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
        const first_name = userData.first_name
        const last_name = userData.last_name
        const userEmail = userData.email
        const phone_no = userData.phone
        const password = userData.password
        console.log('user password from storage: ', password)

        firestore()
            .collection('Users').where('email', '==', userEmail).where('password', '==', password.toString())
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size == 0) {
                    this.setState({ firstName: '', lastName: '', email: '', phoneNo: '', isLoading: false })
                    console.log('if: ', querySnapshot.size)
                } else {
                    querySnapshot.forEach(documentSnapshot => {
                        console.log('phone number form database: ', documentSnapshot.data().phone)
                        this.setState({ userID: userToken, firstName: documentSnapshot.data().first_name, lastName: documentSnapshot.data().last_name, email: documentSnapshot.data().email, phoneNo: documentSnapshot.data().phone.substring(3), isLoading: false })
                        documentSnapshot.data().image !='' && this.setState({image: documentSnapshot.data().image})
                        console.log('User ID: ', documentSnapshot.id, '\n\n', documentSnapshot.data().role)
                        console.log('Total users: ', querySnapshot.size);
                    })
                }
            }).catch(err => {
                alertFunction.Alert('No record found')
                this.setState({ email: '', password: '', isLoading: false })
            })
    }

    updateInformation = async () => {
        const filename = this.state.image.substring(this.state.image.lastIndexOf('/') + 1)
        await AsyncStorage.setItem('@key:providerImage', this.state.image)
        const task = storage()
            .ref(filename)
            .putFile(this.state.image);
        console.log(JSON.stringify(task))

        firestore().collection('Users').doc(this.state.userID).update({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            phone: this.state.phoneNo,
            image: this.state.image,
        }).then(() => {
            alertFunction.Alert('User Information updated')
            this.setState({ password: '', confPassword: '', isLoading: false })
        })
    }
    isValidEmail = (num) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(num);
    }

    handleValidation = () => {
        this.setState({ isLoading: true })
        const { email, firstName, lastName, phoneNo } = this.state;
        if (firstName == '' || lastName == '' || email == '' || phoneNo == '') {
            alertFunction.Alert('All fields are required')
            this.setState({ isLoading: false })
            return;
        }
        else if (this.isValidEmail(email) && firstName != '' && lastName != '' && this.phoneRef.current.isValidNumber(phoneNo.trim())) {
            // this.setState({ isValid: true });
            this.updateInformation()
            // this.props.navigation.navigate('BottomRoutes');
            // Vibration.vibrate(100);
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

    pickImage = () => {
        launchImageLibrary(options, async (path) => {
            if (path.assets) {
                console.log(path)
                console.log(path.assets[0].uri)
                console.log(path.assets[0].uri.substring(path.assets[0].uri.lastIndexOf('/') + 1))
                this.setState({ image: path.assets[0].uri })
            }
        })
    }

    render() {
        return (
            <View style={{ ...styles.container }}>
                <Header
                    title={'Edit Profile'}
                    leadingIcon='arrow-back'
                    leadingButton={() => this.props.navigation.goBack()}
                    trailingButton={() => this.props.navigation.navigate(navigate.ProviderNotification)}
                />
                {this.state.isLoading ? <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}><ActivityIndicator color='black' /></View>
                    :
                    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => this.pickImage()}
                            style={{ width: 130, height: 130, borderRadius: 100, backgroundColor: '#EEEEEE', alignSelf: 'center', marginVertical: 40, }}>
                            {
                                this.state.image ? <Image style={{ width: 130, height: 130, borderRadius: 100, }}
                                    source={{ uri: this.state.image }}
                                    resizeMode='cover'
                                />
                                    :
                                    <Image style={{ width: 130, height: 130, borderRadius: 100, }}
                                        source={ImagesConstant.placeHolder}
                                        resizeMode='cover'
                                    />
                            }
                            <View style={{ position: 'absolute', zIndex: 1, right: 10, bottom: 15 }}>
                                <FontAwesome5 name='camera' size={20} color='grey' />
                            </View>
                        </TouchableOpacity>
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

                        <TextInput autoCapitalize='none' editable={false}
                            style={{ width: '80%', height: 55, paddingStart: 15, color: 'black', borderWidth: 1, borderColor: 'black', borderRadius: 100, backgroundColor: 'white', marginTop: 30 }}
                            placeholder="Email"
                            placeholderTextColor="grey"
                            keyboardType='email-address'
                            onChangeText={txt => this.setState({ email: txt.toLowerCase() })}
                            value={this.state.email}
                        // onSubmitEditing={() => this.passRef.focus()}
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


                        <TouchableOpacity disabled={this.state.isLoading} onPress={() => this.handleValidation()}
                            style={{ paddingVertical: 20, width: '80%', marginVertical: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: color.secondaryColor, borderRadius: 100 }}
                            activeOpacity={0.8}
                        >
                            {this.state.isLoading ? <ActivityIndicator color={'white'} /> :
                                <Text style={{ color: color.primaryColor, fontSize: 16, fontWeight: 'bold' }}>Update Info</Text>
                            }
                        </TouchableOpacity>
                    </ScrollView>
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primaryColor,
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