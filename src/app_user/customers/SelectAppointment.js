import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    ScrollView,
    Alert,
} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import moment from 'moment'

import firestore from '@react-native-firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import Snackbar from 'react-native-snackbar'
import Header from '../../reusable/Header'
import alertFunction from '../../helpers/HelperFunction/AlertFunction';
import { color } from '../../helpers/color/Color_Constant';
import { widthPercentageToDP as w, heightPercentageToDP as h } from 'react-native-responsive-screen';
import AddAddressModel from '../../reusable/modals/AddAddressModel';
import ContactInformation from '../../reusable/modals/ContactInformation';
import SelectLocation from '../../reusable/modals/SelectLocation';

import { check, request, checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions'
import GeoLocation from 'react-native-geolocation-service'

export default class SelectAppointment extends Component {

    async componentDidMount() {
        // alert(this.props.route.params.provider_id)
        // const userToken = await AsyncStorage.getItem('@userToken')
        // alert(userToken)

        // const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
        // alert(JSON.stringify(userData))
    }

    state = {
        authName: '',
        date: '',
        time: '',
        button: '',
        button2: '',
        button3: '',
        check: '',
        isLoading: false,
        isAddressModalOpen: false,
        currentLat: '',
        currentLng: '',
    };

    PostDataToProviderFirebase = async (providerService, customer_service_id) => {
        const userToken = await AsyncStorage.getItem('@userToken')
        const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
        const customer_name = userData.first_name + ' ' + userData.last_name
        firestore()
            .collection('Users')
            .doc(providerService.my_id).collection('my_orders')
            .add({
                service_provider_name: providerService.full_name,
                service_provider_id: providerService.my_id,
                provider_service_id: providerService.service_id,
                price: providerService.price,
                customer_name: customer_name,
                customer_id: userToken,
                customer_service_id: customer_service_id,
                customer_phone: userData.phone,
                customer_address: '',
                booking_date: this.state.date,
                booking_time: this.state.time,
                dest_lat: '',
                dest_long: '',
                booking_type: providerService.service_name,
                status: 'Pending',
            })
            .then((querySnapshot) => {
                console.log('Order added in in Provider Database!');
                this.PostDataToAdminFirebase(providerService)
            });
    }

    PostDataToCustomerFirebase = async (providerService) => {
        const userToken = await AsyncStorage.getItem('@userToken')
        const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
        const customer_name = userData.first_name + ' ' + userData.last_name
        firestore()
            .collection('Users')
            .doc(userToken).collection('my_orders')
            .add({
                service_provider_name: providerService.full_name,
                service_provider_id: providerService.my_id,
                provider_service_id: providerService.service_id,
                price: providerService.price,
                customer_name: customer_name,
                customer_id: userToken,
                service_provider_phone: providerService.phone,
                customer_address: '',
                booking_date: this.state.date,
                booking_time: this.state.time,
                dest_lat: '',
                dest_long: '',
                booking_type: providerService.service_name,
                status: 'Pending',
            })
            .then((querySnapshot) => {
                this.PostDataToProviderFirebase(providerService, querySnapshot.id)
                console.log('Doctor Appointment added!');
            });
    }

    PostDataToAdminFirebase = async (providerService, customer_service_id) => {
        const userToken = await AsyncStorage.getItem('@userToken')
        const userData = JSON.parse(await AsyncStorage.getItem('@userData'))
        const customer_name = userData.first_name + ' ' + userData.last_name
        firestore()
            .collection('AllOrders')
            .add({
                service_provider_name: providerService.full_name,
                service_provider_id: providerService.my_id,
                provider_service_id: providerService.service_id,
                price: providerService.price,
                customer_name: customer_name,
                customer_id: userToken,
                service_provider_phone: providerService.phone,
                customer_phone: userData.phone,
                customer_address: '',
                booking_date: this.state.date,
                booking_time: this.state.time,
                dest_lat: '',
                dest_long: '',
                booking_type: providerService.service_name,
                status: 'Pending',
            })
            .then(() => {
                console.log('Appointment added!');
                this.setState({ date: '', time: '', isLoading: false })
                alertFunction.Alert('Appoinment made successfully')
            });
    }

    checkAppointmentValidation = (providerService) => {
        firestore()
            .collection('Users')
            .doc(providerService.my_id)
            .collection('my_orders').where('time', '==', this.state.time).where('date', '==', this.state.date)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.size == 0) {
                    this.PostDataToCustomerFirebase(providerService)
                } else {
                    alertFunction.Alert('This time slot is already booked')
                    this.setState({ isLoading: false })
                }

                // querySnapshot.forEach(documentSnapshot => {
                //     console.log('Firstore Date: ', documentSnapshot.data().date)
                //     // console.log("DATE -=-=-=-=-=-=-=-=-="+Moment(documentSnapshot.data().date.seconds * 1000).format("YYYY-MM-DD")+"=-=-"+this.state.date.toISOString().substring(0,10))
                //     this.setState({ check: documentSnapshot.data().date })

                // })
            }).catch(err =>
                alertFunction.Alert('Something went wrong')
            )
    }

    appointmentValidation = async (providerService) => {
        this.setState({ isLoading: true })
        if (this.state.date != '' && this.state.time != '') {
            await this.checkAppointmentValidation(providerService)
            // this.setState({ isAddressModalOpen: true })
        }
        else if (this.state.date == '' && this.state.time == '') {
            this.setState({ isLoading: false })
            alertFunction.Alert('Please select time and date')
        }
        else if (this.state.date != '' && this.state.time == '') {
            alertFunction.Alert('Please select time')
            this.setState({ isLoading: false })

        }
        else if (this.state.date == '' && this.state.time != '') {
            alertFunction.Alert('Please select date')
            this.setState({ isLoading: false })
        }
        else {
            alertFunction.Alert('Please select all fields')
            this.setState({ isLoading: false })
        }
    }

    selectedTimeValidation = (selectedTime) => {
        let today = new Date();
        let currentDate = today
        const newDate = moment(currentDate).format('YYYY-MM-DD')
        // alert("newDate: "+ newDate+ '\nselected date: '+ this.state.date)
        let hours = today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        const currentTime = hours + ':' + minutes
        if (newDate == this.state.date && selectedTime < currentTime) {
            alertFunction.Alert('Please select valid date and time')
            this.setState({ time: '', date: '' })
        }
        // alert('selectedTime : '+ selectedTime+ '\ncurrentTime : '+ currentTime)
    }


    render() {
        const item = this.props.route.params.item
        const { date, time, isAddressModalOpen } = this.state
        console.log('Check Date: ', this.state.check)
        console.log('Date: ', date)
        console.log('Time: ', time)
        return (
            <View
                style={styles.linearGradient}
            >
                <Header
                    title={'Booking'}
                    leadingIcon='arrow-back'
                    leadingButton={() => this.props.navigation.goBack()}
                    trailingButton={() => alert('Notification')}
                />

                <ScrollView contentContainerStyle={{ flexGrow: 1, }} showsVerticalScrollIndicator={false}>
                    <View style={styles.detailsContainer}>
                        {/* // calander */}
                        <View style={styles.topDateBox2}>
                            <View style={{ flex: 1 }}>
                                <CalendarStrip

                                    minDate={new Date()}
                                    onDateSelected={date => this.setState({ date: date.toISOString().substring(0, 10) })}
                                    // customDatesStyles={customDatesStylesFunc()}


                                    scrollable
                                    style={{ height: 100, paddingVertical: 10, elevation: 5 }}
                                    calendarColor={'white'}
                                    calendarHeaderStyle={{ color: 'black' }}
                                    dateNumberStyle={{ color: 'black' }}
                                    dateNameStyle={{ color: 'black' }}
                                    iconContainer={{ flex: 0.1 }}
                                    highlightDateContainerStyle={{ backgroundColor: date == "" ? 'white' : color.secondaryColor }}
                                    highlightDateNumberStyle={{ color: date == "" ? 'black' : 'white' }}
                                    highlightDateNameStyle={{ color: date == "" ? 'black' : 'white' }}
                                />
                            </View>
                        </View>
                        <View style={[styles.TimeSLot, { marginTop: 10 }]}>
                            <View style={styles.lefts}>
                                {/* BUTTON1 */}
                                {this.state.time === '8:00 AM' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '' });
                                        }}
                                        style={styles.Timebox2}>
                                        <Text style={styles.timezone2}>8:00 AM</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '8:00 AM' }, () => this.selectedTimeValidation('8:00'));
                                        }}
                                        style={styles.Timebox}>
                                        <Text style={styles.timezone}>8:00 AM</Text>
                                    </TouchableOpacity>
                                )}
                                {/* BUTTON1 */}
                                {/* BUTTON1 */}
                                {this.state.time === '10:00 AM' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '' });
                                        }}
                                        style={styles.Timebox2}>
                                        <Text style={styles.timezone2}>10:00 AM</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '10:00 AM' }, () => this.selectedTimeValidation('10:00'));
                                        }}
                                        style={styles.Timebox}>
                                        <Text style={styles.timezone}>10:00 AM</Text>
                                    </TouchableOpacity>
                                )}
                                {/* BUTTON1 */}
                                {/* BUTTON1 */}
                                {this.state.time === '12:00 PM' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '' });
                                        }}
                                        style={styles.Timebox2}>
                                        <Text style={styles.timezone2}>12:00 PM</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '12:00 PM' }, () => this.selectedTimeValidation('12:00'));
                                        }}
                                        style={styles.Timebox}>
                                        <Text style={styles.timezone}>12:00 PM</Text>
                                    </TouchableOpacity>
                                )}
                                {/* BUTTON1 */}
                                {/* BUTTON1 */}
                                {this.state.time === '2:00 PM' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '' });
                                        }}
                                        style={styles.Timebox2}>
                                        <Text style={styles.timezone2}>2:00 PM</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '2:00 PM' }, () => this.selectedTimeValidation('2:00'));
                                        }}
                                        style={styles.Timebox}>
                                        <Text style={styles.timezone}>2:00 PM</Text>
                                    </TouchableOpacity>
                                )}
                                {/* BUTTON1 */}
                                {/* BUTTON1 */}
                                {this.state.time === '4:00 PM' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '' });
                                        }}
                                        style={styles.Timebox2}>
                                        <Text style={styles.timezone2}>4:00 PM</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '4:00 PM' }, () => this.selectedTimeValidation('4:00'));
                                        }}
                                        style={styles.Timebox}>
                                        <Text style={styles.timezone}>4:00 PM</Text>
                                    </TouchableOpacity>
                                )}
                                {/* BUTTON1 */}
                            </View>
                            <View style={styles.Rights}>
                                {/* BUTTON1 */}
                                {this.state.time === '9:00 AM' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '' });
                                        }}
                                        style={styles.Timebox2}>
                                        <Text style={styles.timezone2}>9:00 AM</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '9:00 AM' }, () => this.selectedTimeValidation('9:00'));
                                        }}
                                        style={styles.Timebox}>
                                        <Text style={styles.timezone}>9:00 AM</Text>
                                    </TouchableOpacity>
                                )}
                                {/* BUTTON1 */}
                                {/* BUTTON1 */}
                                {this.state.time === '11:00 AM' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '' });
                                        }}
                                        style={styles.Timebox2}>
                                        <Text style={styles.timezone2}>11:00 AM</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '11:00 AM' }, () => this.selectedTimeValidation('11:00'));
                                        }}
                                        style={styles.Timebox}>
                                        <Text style={styles.timezone}>11:00 AM</Text>
                                    </TouchableOpacity>
                                )}
                                {/* BUTTON1 */}
                                {/* BUTTON1 */}
                                {this.state.time === '1:00 PM' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '' });
                                        }}
                                        style={styles.Timebox2}>
                                        <Text style={styles.timezone2}>1:00 PM</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '1:00 PM' }, () => this.selectedTimeValidation('1:00'));
                                        }}
                                        style={styles.Timebox}>
                                        <Text style={styles.timezone}>1:00 PM</Text>
                                    </TouchableOpacity>
                                )}
                                {/* BUTTON1 */}
                                {/* BUTTON1 */}
                                {this.state.time === '3:00 PM' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '' });
                                        }}
                                        style={styles.Timebox2}>
                                        <Text style={styles.timezone2}>3:00 PM</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '3:00 PM' }, () => this.selectedTimeValidation('3:00'));
                                        }}
                                        style={styles.Timebox}>
                                        <Text style={styles.timezone}>3:00 PM</Text>
                                    </TouchableOpacity>
                                )}
                                {/* BUTTON1 */}
                                {/* BUTTON1 */}
                                {this.state.time === '5:00 PM' ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '' });
                                        }}
                                        style={styles.Timebox2}>
                                        <Text style={styles.timezone2}>5:00 PM</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ time: '5:00 PM' }, () => this.selectedTimeValidation('5:00'));
                                        }}
                                        style={styles.Timebox}>
                                        <Text style={styles.timezone}>5:00 PM</Text>
                                    </TouchableOpacity>
                                )}
                                {/* BUTTON1 */}
                            </View>
                        </View>
                        {/* slot end */}
                        <View style={{ height: 80 }} />

                        <TouchableOpacity disabled={this.state.isLoading} activeOpacity={0.7}
                            onPress={() => this.appointmentValidation(item)}
                            style={styles.button}>
                            {this.state.isLoading ? <ActivityIndicator color={'white'} /> :
                                <Text style={{ fontSize: 18, color: 'white' }}>Book Now</Text>
                            }
                        </TouchableOpacity>

                        <SelectLocation
                            isVisible={isAddressModalOpen}
                            setVisible={(value) => this.setState({ isAddressModalOpen: value })}
                            bookOrder={()=> this.loadCurrentLocation(item)}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
    async checkForLocationPermission(onResult) {
        const locPerms = [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
        ]

        try {
            let result = await checkMultiple(locPerms)
            let gCount = locPerms.filter(p => result[p] == "granted").length
            if (gCount == locPerms.length) {
                onResult(true)
            } else {
                let result2 = await requestMultiple(locPerms)
                let rCount = locPerms.filter(p => result2[p] == "granted").length
                onResult(rCount == locPerms.length)
            }
        } catch (error) {
            console.log(error)
            onResult(false)
        }
    }

    loadCurrentLocation(item) {
        this.checkForLocationPermission((isAllowed) => {
            if (isAllowed) {
                GeoLocation.getCurrentPosition((position) => {
                    this.setState({
                        currentLat: position.coords.latitude,
                        currentLng: position.coords.longitude,
                    })
                    this.appointmentValidation(item)
                    this.setState({isAddressModalOpen: false})
                    // alert(JSON.stringify(position.coords))
                }, (error) => {
                    console.log(error)
                }, { enableHighAccuracy: true })
            } else {
                console.log("permission not allowed")
            }
        })
        
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        backgroundColor: color.primaryDimColor
    },
    Container: {
        width: '100%',
        height: h('110%'),
        // backgroundColor: '#f2f2f2',
        alignItems: 'center',
        backgroundColor: color.primaryDimColor
    },
    header: {
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: '#07193f',
        // justifyContent: 'center',
        paddingHorizontal: 5,
        // zIndex: 0,
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: 'red',
        backgroundColor: color.primaryDimColor,
        paddingBottom: 10,

    },
    topDateBox: {
        width: '100%',
        height: h('7%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: h('2%'),
        paddingRight: h('2%'),
    },
    topDateBox2: {
        width: '100%',
        height: h('10%'),
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    DateBox: {
        width: '13.5%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: h('0.5%'),
    },
    DateBox3: {
        backgroundColor: '#003C75',
        width: '13.5%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: h('0.5%'),
    },
    dateText: {
        color: '#0007',
        fontSize: h('2%'),
    },
    dateText4: {
        color: '#ffff',
        fontSize: h('2%'),
    },

    dateText2: {
        color: '#000',
        fontSize: h('4%'),
    },
    dateText3: {
        color: '#fff',
        fontSize: h('4%'),
    },
    TimeSLot: {
        width: '100%',
        height: h('43%'),

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftbox: {
        fontSize: h('2.2%'),
        color: '#0007',
    },
    lefts: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Rights: {
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Timebox: {
        backgroundColor: 'white',
        width: '90%',
        height: h('7%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: h('1%'),
        marginTop: h('1%'),
        elevation: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    timezone: {
        color: '#0007',
        fontSize: h('2.2%'),
    },
    Timebox2: {
        backgroundColor: color.secondaryColor,
        width: '90%',
        height: h('7%'),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: h('1%'),
        marginTop: h('1%'),
        elevation: 5,
    },
    timezone2: {
        color: '#ffff',
        fontSize: h('2.2%'),
    },
    TopHeaderbox: {
        width: '100%',
        height: h('7%'),
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: h('2%'),
        justifyContent: 'space-between',
        top: 20
    },
    IconContainer: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    icons: {
        width: '50%',
        height: '70%',
        resizeMode: 'contain',
    },
    button: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 12,
        backgroundColor: color.secondaryColor,
        borderRadius: 10,
        elevation: 5,
        position: 'absolute',
        zIndex: 1,
        bottom: 20,
    }
});
