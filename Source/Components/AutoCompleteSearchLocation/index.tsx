import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { width } from "../../Helper/responsive";
import { MainStyle } from "../../Style/main_style";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import style from "./style";
export default (props) => {
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
                {...props}
                placeholder="search"
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, "data");
                    console.log(details, "details")
                }}
                query={{
                    key: 'AIzaSyDlqprU1uYvSEEQIEotGG8_mL3QFfVB7vY',
                    language: 'en',
                }}
                listViewDisplayed={false}
                styles={{ zIndex: 1000 }}
                isRowScrollable={true}
                keyboardShouldPersistTaps="always"
            />
        </View >
    )
}