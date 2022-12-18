import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import MapView, { Polyline, Circle, Marker, PROVIDER_GOOGLE, ProviderPropType, } from 'react-native-maps';
import { check, request, checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions'
import GeoLocation from 'react-native-geolocation-service'
import GooglePlacesInput from '../service_providers/GogglePlacesAutoComplete';
import MapViewDirections from 'react-native-maps-directions';
import FBDBHelper from '../../helpers/HelperFunction/FBDBHelper';
const fbHelper = new FBDBHelper()
const LAT_DELTA = 0.0600, LNG_DELTA = 0.0600

export default class ProviderMapViewComponent extends Component {
    constructor() {
        super()
        this.state = {
            currentLat: 28.4212,
            currentLng: 70.2989,
            latitude: 0,
            longitude: 0,
            shops: [],
            coordinates: [
                {
                    latitude: 28.435399651224866,
                    longitude: 70.30763882559006,
                },
                {
                    latitude: 28.434081178561446,
                    longitude: 70.40776757159524,
                },
            ]

        }
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
    loadCurrentLocation() {
        this.checkForLocationPermission((isAllowed) => {
            if (isAllowed) {
                GeoLocation.getCurrentPosition((position) => {
                    this.setState({
                        currentLat: position.coords.latitude,
                        currentLng: position.coords.longitude,
                    })
                }, (error) => {
                    console.log(error)
                }, { enableHighAccuracy: true })
            } else {
                console.log("permission not allowed")
            }
        })
        this.startTracking()
    }

    Location = (lat, long) => {
        alert(JSON.stringify(lat, long))
        this.setState(
            {
                latitude: lat,
                longitude: long
            });
    }

    render() {
        const { currentLat, currentLng, shops } = this.state

        return (
            <View style={{ flex: 1, }}>
                {/* Search Goggle Places textInput */}
                {/* <GooglePlacesInput Location={this.Location} /> */}

                {/* MapView displays on screen with User Current Location */}
                <MapView
                    style={{ flex: 1 }}
                    region={{
                        latitude: currentLat,
                        longitude: currentLng,
                        latitudeDelta: LAT_DELTA,
                        longitudeDelta: LNG_DELTA,
                    }}
                    zoomControlEnabled={true}
                    loadingEnabled={true}
                    toolbarEnabled={true}
                    zoomEnabled={true}
                    rotateEnabled={true}
                    userLocationUpdateInterval={5}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    followsUserLocation={true}
                    showsUserLocation={true}
                    onMapReady={() => { this.loadCurrentLocation() }}
                >

                    {/* Map for Search Bar */}

                    <Marker draggable
                        description={"Search"}
                        coordinate={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: LAT_DELTA,
                            longitudeDelta: LNG_DELTA,
                        }}
                        pinColor={"green"}
                        onDragEnd={(e) => this.setState({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })}
                    />

                    {/* Show radius around currentLat and currentLng */}
                    <Circle
                        center={{
                            latitude: 28.6332,
                            longitude: 70.6574,
                            latitudeDelta: LAT_DELTA,
                            longitudeDelta: LNG_DELTA,
                        }}
                        radius={310}
                        fillColor={"rgba(115,0,14,0.3)"}
                    />
                    {/* <Marker title='User' pinColor='yellow' coordinate={this.state.coordinates[0]} /> */}
                    <Marker title='Driver' pinColor='red' coordinate={
                        {
                            latitude: 28.6332,
                            longitude: 70.6574,
                        }
                    } />
                    {/* <Polyline
                        coordinates=
                        {[
                            {
                                latitude: this.state.currentLat,
                                longitude: this.state.currentLng,
                            },
                            {
                                latitude: 28.6332,
                                longitude: 70.6574,
                            },
                        ]}
                        // {this.state.coordinates}
                        strokeColor="yellow" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={['#7F0000']}
                        strokeWidth={3}
                    /> */}
                    <MapViewDirections
                        origin=
                        {{
                            latitude: this.state.currentLat,
                            longitude: this.state.currentLng,
                        }}
                        //{this.state.coordinates[0]}
                        destination=
                        {{
                            latitude: 28.6332,
                            longitude: 70.6574,
                        }}
                        // {this.state.coordinates[1]}
                        apikey={"AIzaSyACQSYZrAwvfl12Fk9WuUf91TiWlq8rKls"} // insert your API Key here
                        strokeWidth={6}
                        onError={(e) => console.log(e)}
                        strokeColor="blue"
                    />
                </MapView>
            </View>
        )
    }
    startTracking() {
        this.checkForLocationPermission((isAllowed) => {
            if (isAllowed) {
                this.locationListner = GeoLocation.watchPosition((Position) => {
                    console.log("Get Rider Location", Position)
                    fbHelper.showLocToUser(1,
                        Position.coords.latitude,
                        Position.coords.latitude
                    ),
                        this.setState({
                            lat: Position.coords.latitude,
                            long: Position.coords.longitude,
                        })
                    console.log("latitude", this.state.lat)
                    console.log("longitude", this.state.long)
                }, (error) => {
                    console.log(error)
                }, { enableHighAccuracy: true })
            } else {
                console.log("permission not get")
            }
        })
    }


    stopTracking() {
        if (this.locationListner) {
            clearWatch(this.locationListner)
        }
    }
}
const styles = StyleSheet.create({
    back_Icon_View: {
        position: 'absolute',
        zIndex: 1
    },
    back_Icon_Touch: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 40,
        marginTop: 10,
        marginLeft: 10,
    },
    back_Icon_View1: {
        position: 'absolute',
        zIndex: 1,
        bottom: 300,
        right: 20
    },
    back_Icon_Touch1: {
        backgroundColor: '#E6E8EC',
        padding: 10,
        borderRadius: 40,
        marginTop: 10,
        marginLeft: 10,
    },
})