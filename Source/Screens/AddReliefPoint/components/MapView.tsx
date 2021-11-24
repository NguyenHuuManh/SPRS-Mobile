import { isEmpty } from "lodash";
import React, { useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Relief from "../../../Assets/Images/locationRelief.svg";

interface Props {
    defaultLocation?: any;
}
export default (props: Props) => {
    const { defaultLocation } = props
    const [mapReady, setMapReady] = useState(false);

    const mapRef = useRef(null);

    if (!isEmpty(defaultLocation)) {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                showsUserLocation={true}
                region={defaultLocation}
                zoomEnabled
                ref={mapRef}
                onMapReady={() => { setMapReady(true) }}
            >
                {mapReady && (
                    <>
                        <Marker
                            coordinate={{
                                latitude: defaultLocation.latitude,
                                longitude: defaultLocation.longitude
                            }}
                        >
                            <Relief fill={'#F4A921'} width={30} height={30} />
                        </Marker>
                    </>
                )}
            </MapView>
        )
    } else {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
            />
        )
    }
}