import { faSearchLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { GoogleMapsPlacesAutocomplete } from 'react-native-google-maps-places-autocomplete';
import { width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import style from "./style";
interface Props {
    onPress?: any;
    renderRightButton?: any;
}
export default (props: Props) => {
    const { onPress, renderRightButton } = props
    const [blur, setBlur] = useState(true)
    return (
        <View style={[MainStyle.boxShadow, style.container]}>
            <View
                style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingTop: 15,
                }}>
                <FontAwesomeIcon icon={faSearchLocation} color="#A0A6BE" size={24} />
            </View>
            <GooglePlacesAutocomplete
                placeholder="search"
                onPress={onPress}
                enableHighAccuracyLocation
                query={{
                    key: 'AIzaSyDlqprU1uYvSEEQIEotGG8_mL3QFfVB7vY',
                    language: 'en',
                }}
                listViewDisplayed='auto'
                styles={{ zIndex: 1000 }}
                isRowScrollable={true}
                renderRightButton={renderRightButton}

            />
            {/* <GoogleMapsPlacesAutocomplete
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}

                    getDefaultValue={() => ''}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyDlqprU1uYvSEEQIEotGG8_mL3QFfVB7vY',
                        language: 'en', // language of the results
                        // types: '(cities)' // default: 'geocode'
                    }}

                    styles={{
                        textInputContainer: {
                            width: '100%'
                        },
                        description: {
                            fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        }
                    }}

                    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GoogleMapsPlacesSearch' // Which API to use: GoogleReverseGeocoding or GoogleMapsPlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GoogleMapsPlacesSearchQuery={{
                        // available options for GoogleMapsPlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        type: 'cafe'
                    }}

                    GoogleMapsPlacesDetailsQuery={{
                        // available options for GoogleMapsPlacesDetails API : https://developers.google.com/places/web-service/details
                        fields: 'formatted_address',
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    //   predefinedPlaces={[homePlace, workPlace]}

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                //   renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                //   renderRightButton={() => <Text>Custom text after the input</Text>}
                /> */}
        </View >
    )
}