import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
//https://www.npmjs.com/package/react-native-places-inputs
const GooglePlacesInput = ({Location}) => {
  return (
    <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={1} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                onFail={error => console.log(error)}
                renderDescription={row => row.description} 
                onPress={(data, details = null) => { 
                    console.log("aaaaaaaaaaa:",details);

                    Geocoder.init("AIzaSyACQSYZrAwvfl12Fk9WuUf91TiWlq8rKls"); 
                    Geocoder.from(data.description)
                    
                        .then(json => {
                            var location = json.results[0].geometry.location;
                            console.log(location);
                             alert(location.lat + ", " + location.lng)
                             Location(location.lat, location.lng)
                        })
                        .catch(error => console.warn(error));
                    
                }}

                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyACQSYZrAwvfl12Fk9WuUf91TiWlq8rKls',
                    language: 'en', // language of the results
                    types: '(cities)', // default: 'geocode'
                    location: "28.4212, 70.2989",
                    radius: 10
                }}

                styles={{
                    container: {
                        flex: 0, zIndex: 5, position: "absolute", width: "100%", overflow: "scroll"
                    },
                    description: {
                        fontWeight: 'bold'
                    },
                    textInputContainer: {
                        width: '100%',
                        height: 50,
                        zIndex: 1,
                        
                    },
                    textInput: {
                        width: "100%",
                        height: 50,
                        borderBottomWidth: 1,
                    },
                    listView: {

                        backgroundColor: "white",
                        zIndex: 1,
                        // top:50,
                        position: "absolute",
                        overflow: "scroll"
                    },                 
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                        zIndex: 1,
                        position: "absolute"                    
                    }
                }}

                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    types: 'food'
                }}

                GooglePlacesDetailsQuery={{
                    fields: ["formated_address", "geometry"]
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              

                enablePoweredByContainer={false}
            />
  );
};

export default GooglePlacesInput;
