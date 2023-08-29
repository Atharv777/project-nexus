import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

export default function Map({ centerCoordinates, zoom }) {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const [center, setCenter] = useState(null)

    useEffect(() => {
        if (centerCoordinates) {
            setCenter(centerCoordinates)
        }
        else {
            navigator.geolocation.getCurrentPosition((pos) => {
                setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
                console.log(center)
            })
        }
    }, [isLoaded, centerCoordinates])



    return (
        isLoaded && center && <GoogleMap zoom={zoom ? zoom : 18} center={center} mapContainerClassName="w-full h-full rounded-20">
            <Marker position={center} />
        </GoogleMap>
    )
}
